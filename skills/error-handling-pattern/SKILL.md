---
name: error-handling-pattern
description: Menyusun penanganan error yang konsisten di seluruh aplikasi — mencakup error classes, middleware, try-catch, dan user-facing error messages. Gunakan saat membuat arsitektur error handling atau merapikan error handling yang sudah ada.
---

# Error Handling Pattern

## Overview

Skill ini memandu penanganan error yang konsisten, terstruktur, dan aman. Mencakup pembuatan custom error classes, error mapper, middleware global, serta best practice untuk pesan error yang ditampilkan ke user dan yang di-log ke developer.

## When to Use

- Membuat arsitektur error handling dari awal.
- Merapikan error handling yang berserakan (console.log di mana-mana).
- Menstandarisasi response error dari API.
- Menentukan batas antara error yang boleh dilihat user vs internal-only.

## Prinsip Utama

1. **Never leak internal errors to users.** Stack trace, nama database, atau detail library jangan sampai keluar.
2. **Be specific internally, be generic externally.** Developer butuh detail; user butuh instruksi jelas.
3. **Fail fast, handle once.** Jangan menangkap error lalu di-throw ulang tanpa konteks.
4. **Always log.** Error harus tercatat dengan traceId untuk debugging.

## Langkah-Langkah

### 1. Buat Custom Error Hierarchy
Buat `src/errors/index.ts`:

```typescript
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = "Unauthorized") {
    super(message, 401);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} tidak ditemukan`, 404);
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409);
  }
}

export class InternalServerError extends AppError {
  constructor(message: string = "Internal server error") {
    super(message, 500, false);
  }
}
```

### 2. Buat Error Mapper
```typescript
// src/errors/mapper.ts
import { AppError, InternalServerError } from "./index.js";

export function toAppError(error: unknown): AppError {
  if (error instanceof AppError) return error;
  console.error("Unexpected error:", error);
  return new InternalServerError();
}
```

### 3. Global Error Handler Middleware
```typescript
// src/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import { AppError, InternalServerError } from "../errors/index.js";
import { toAppError } from "../errors/mapper.js";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const appError = err instanceof AppError ? err : toAppError(err);

  // Log semua error 500+ untuk observability
  if (!appError.isOperational) {
    console.error(`[ERROR ${appError.statusCode}]`, err);
  }

  res.status(appError.statusCode).json({
    error: {
      message: appError.message,
      // Detail internal hanya di development
      ...(process.env.NODE_ENV === "development" && {
        stack: appError.stack,
        name: appError.name,
      }),
    },
  });
}
```

### 4. Try-Catch Pattern di Service Layer
Selalu bungkus operasi I/O dengan try-catch. Jangan biarkan error dari library pihak ketiga meledak.

```typescript
// src/services/users.service.ts
import { prisma } from "../lib/prisma.js";
import { NotFoundError } from "../errors/index.js";

export async function getUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundError("User");
    return user;
  } catch (err) {
    // Jika sudah AppError, lempar lagi
    if (err instanceof NotFoundError) throw err;
    // Jika error Prisma, map ke AppError
    throw new DatabaseError("Gagal mengambil data user");
  }
}

export class DatabaseError extends AppError {
  constructor(message: string) {
    super(message, 500, false);
  }
}
```

### 5. Error Response Format Standard
Semua response error dari API harus mengikuti format ini:

```json
{
  "error": {
    "message": "Pesan error yang user-friendly"
  }
}
```

Untuk validation error (400):
```json
{
  "error": {
    "message": "Validasi gagal",
    "details": {
      "email": ["Email tidak valid"],
      "password": ["Password minimal 8 karakter"]
    }
  }
}
```

### 6. User-Facing vs Internal Error

| Tipe Error | Dikirim ke Client? | Di-Log? | Contoh Pesan |
|---|---|---|---|
| Operational (400, 401, 404, 409) | Ya | Ya (level info/warn) | "Email sudah terdaftar" |
| Programming / Runtime (500) | Generik saja | Ya (level error) | "Terjadi kesalahan pada server" |
| Validation (400) | Ya + details | Ya | Field-level error |
| Database timeout | Tidak | Ya | "Terjadi kesalahan pada server" |

### 7. Logging
Gunakan logger terstruktur. Jika belum ada, minimal gunakan `console.error` dengan metadata:

```typescript
console.error({
  level: "error",
  message: appError.message,
  statusCode: appError.statusCode,
  stack: appError.stack,
  timestamp: new Date().toISOString(),
});
```

## Common Rationalizations

| Alasan | Fakta |
|---|---|
| "Throw Error generik saja" | Developer tidak tahu context error, sulit debug. Custom error mempercepat diagnosis. |
| "Kirim stack trace ke client, biar developer bisa debug" | Stack trace adalah informasi sensitif. Gunakan log server untuk debug. |
| "Catch error di setiap baris" | Tangkap error pada boundary layer (controller/service), bukan di setiap fungsi. |

## Red Flags

- `console.log` untuk error tanpa stack trace.
- Error 500 dikirim dengan pesan internal asli ke client.
- `any` digunakan untuk parameter error di middleware.
- Tidak ada error handler global.
- `try-catch` kosong (catch block tanpa handling).

## Verification

- [ ] Semua route yang melempar error di-handle oleh global error handler.
- [ ] Response error mengikuti format standard JSON.
- [ ] Error 500 tidak mengandung stack trace atau detail internal di production.
- [ ] Validation error memuat field-level details.
- [ ] Custom error classes mencakup 400, 401, 403, 404, 409, 422, 500.
- [ ] Middleware error handler diterapkan setelah semua route.
