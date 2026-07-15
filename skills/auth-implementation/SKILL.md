---
name: auth-implementation
description: Implementasi autentikasi yang aman (JWT atau Session-based) dengan hashing password, middleware proteksi route, dan refresh token. Gunakan saat menambahkan sistem login/register ke aplikasi.
---

# Auth Implementation

## Overview

Skill ini memandu implementasi sistem autentikasi production-ready: registrasi, login, proteksi route, refresh token, dan logout. Mencakup dua pendekatan — JWT (stateless) dan Session (stateful) — dengan preferensi JWT untuk API modern.

## When to Use

- Menambahkan sistem login/register ke aplikasi baru.
- Mengamankan endpoint API dengan middleware autentikasi.
- Mengimplementasikan refresh token rotation.
- Migrasi dari auth sederhana ke sistem yang lebih aman.

## Prasyarat

- Backend Express/Fastify/Hono sudah berjalan.
- Database + ORM (Prisma) sudah dikonfigurasi.
- Library: `bcrypt` (hashing), `jsonwebtoken` atau `jose` (JWT), `zod` (validasi).

## Langkah-Langkah

### 1. Install Dependencies
```bash
npm install bcrypt jsonwebtoken zod
npm install -D @types/bcrypt @types/jsonwebtoken
```

### 2. Schema Database (Prisma)
```prisma
model User {
  id           String   @id @default(cuid())
  email        String   @unique
  passwordHash String
  name         String?
  refreshTokens RefreshToken[]
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model RefreshToken {
  id        String   @id @default(cuid())
  token     String   @unique
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  expiresAt DateTime
  createdAt DateTime @default(now())
}
```

### 3. Environment Variables
```bash
JWT_ACCESS_SECRET=ganti-dengan-secret-panjang-minimal-32-karakter
JWT_REFRESH_SECRET=ganti-dengan-secret-berbeda-juga-panjang
JWT_ACCESS_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d
BCRYPT_ROUNDS=12
```

**PENTING:** Jangan hardcode secret. Gunakan env var. Generate secret dengan:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 4. Zod Schemas
```typescript
// src/schemas/auth.schema.ts
import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z
    .string()
    .min(8, "Password minimal 8 karakter")
    .regex(/[A-Z]/, "Password harus mengandung huruf besar")
    .regex(/[0-9]/, "Password harus mengandung angka"),
  name: z.string().min(1).optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
```

### 5. Auth Service
```typescript
// src/services/auth.service.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";

const ROUNDS = Number(process.env.BCRYPT_ROUNDS ?? 12);

export async function register(email: string, password: string, name?: string) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new AuthError("Email sudah terdaftar", 409);

  const passwordHash = await bcrypt.hash(password, ROUNDS);
  const user = await prisma.user.create({
    data: { email, passwordHash, name },
    select: { id: true, email: true, name: true },
  });
  return user;
}

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new AuthError("Email atau password salah", 401);

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new AuthError("Email atau password salah", 401);

  const accessToken = signAccessToken(user.id);
  const refreshToken = await createRefreshToken(user.id);

  return {
    user: { id: user.id, email: user.email, name: user.name },
    accessToken,
    refreshToken,
  };
}

function signAccessToken(userId: string) {
  return jwt.sign(
    { sub: userId },
    process.env.JWT_ACCESS_SECRET!,
    { expiresIn: process.env.JWT_ACCESS_EXPIRES ?? "15m" }
  );
}

async function createRefreshToken(userId: string) {
  const token = jwt.sign(
    { sub: userId },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES ?? "7d" }
  );
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await prisma.refreshToken.create({ data: { token, userId, expiresAt } });
  return token;
}
```

### 6. Auth Middleware
```typescript
// src/middlewares/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId?: string;
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token tidak ditemukan" });
  }

  try {
    const payload = jwt.verify(header.slice(7), process.env.JWT_ACCESS_SECRET!) as { sub: string };
    req.userId = payload.sub;
    next();
  } catch {
    return res.status(401).json({ error: "Token tidak valid atau kedaluwarsa" });
  }
}
```

### 7. Auth Routes
```typescript
// src/routes/auth.routes.ts
import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
import * as authService from "../services/auth.service.js";

const router = Router();

router.post("/register", validate(registerSchema), async (req, res, next) => {
  try {
    const user = await authService.register(req.body.email, req.body.password, req.body.name);
    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
});

router.post("/login", validate(loginSchema), async (req, res, next) => {
  try {
    const result = await authService.login(req.body.email, req.body.password);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
```

### 8. Proteksi Route
```typescript
// Contoh: route yang butuh login
router.get("/me", requireAuth, async (req: AuthRequest, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    select: { id: true, email: true, name: true },
  });
  res.json({ user });
});
```

### 9. Aturan Keamanan Wajib

| Aturan | Detail |
|---|---|
| Password hashing | Selalu `bcrypt` dengan rounds ≥ 12. JANGAN simpan plain text. |
| Error message | Login gagal: selalu "Email atau password salah" (jangan bocorkan mana yang salah). |
| Token di response body | Access token di body JSON. Refresh token idealnya di httpOnly cookie. |
| Rate limiting | Pasang rate limiter di endpoint `/login` dan `/register` (max 5 req/menit). |
| HTTPS only | Token hanya dikirim via HTTPS di production. |

## Common Rationalizations

| Alasan | Fakta |
|---|---|
| "Bcrypt rounds 4 saja, lebih cepat" | Rounds rendah = mudah di-brute force. Minimal 12. |
| "Access token 7 hari, biar user tidak login ulang" | Access token harus pendek (15m). Gunakan refresh token untuk session panjang. |
| "Simpan JWT di localStorage" | Rentan XSS. Prefer httpOnly cookie untuk refresh token. |

## Red Flags

- Password disimpan tanpa hashing.
- Secret JWT di-hardcode di source code.
- Tidak ada expiry pada token.
- Error message yang membocorkan apakah email terdaftar.
- Endpoint auth tanpa rate limiting.

## Verification

- [ ] Register berhasil membuat user dengan password ter-hash di database.
- [ ] Login dengan password salah mengembalikan 401 (bukan 500).
- [ ] Access token expired ditolak oleh middleware.
- [ ] Route terproteksi mengembalikan 401 tanpa token.
- [ ] Refresh token bisa digunakan untuk mendapatkan access token baru.
- [ ] Logout menginvalidasi refresh token di database.
- [ ] `JWT_ACCESS_SECRET` dan `JWT_REFRESH_SECRET` berbeda dan berasal dari env var.
