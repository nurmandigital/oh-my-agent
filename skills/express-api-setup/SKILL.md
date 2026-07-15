---
name: express-api-setup
description: Setup proyek Express.js dengan TypeScript, Prisma ORM, Zod validation, dan struktur folder production-ready. Gunakan saat memulai backend API baru atau menambahkan layer Express ke monorepo.
---

# Express API Setup

## Overview

Skill ini memandu setup backend API Express.js lengkap dengan TypeScript, Prisma ORM, Zod untuk validasi request, dan middleware standar (error handling, CORS, logging).

## When to Use

- Membuat backend API baru dari nol.
- Menambahkan Express.js ke monorepo yang sudah ada.
- Setup Prisma + database connection.
- Menambahkan layer validasi Zod ke route yang sudah ada.

## Prasyarat

- Node.js versi 18+.
- Database yang sudah tersedia (PostgreSQL disarankan, MySQL/SQLite juga didukung).

## Langkah-Langkah

### 1. Inisialisasi Proyek
```bash
mkdir my-api && cd my-api
npm init -y
npm install express cors dotenv helmet morgan
npm install -D typescript tsx @types/express @types/cors @types/node @types/morgan
npx tsc --init
```

### 2. Konfigurasi TypeScript (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "noImplicitAny": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### 3. Setup Prisma
```bash
npm install prisma @prisma/client
npx prisma init
```

Edit `prisma/schema.prisma`:
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"  // ganti ke mysql/sqlite jika perlu
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

Jalankan migrasi:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 4. Setup Zod Validation
```bash
npm install zod
```

Buat helper validasi di `src/middlewares/validate.ts`:
```typescript
import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validate = (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: result.error.flatten().fieldErrors,
      });
    }
    req.body = result.data;
    next();
  };
```

### 5. Struktur Folder Rekomendasi
```text
src/
├── index.ts              # Entry point (app.listen)
├── app.ts                # Express app setup (middleware + routes)
├── config/
│   └── env.ts            # Validasi env vars dengan Zod
├── routes/
│   ├── index.ts          # Route aggregator
│   └── users.routes.ts
├── controllers/
│   └── users.controller.ts
├── services/
│   └── users.service.ts  # Business logic
├── middlewares/
│   ├── validate.ts
│   ├── errorHandler.ts
│   └── auth.ts
├── schemas/
│   └── users.schema.ts   # Zod schemas
├── lib/
│   └── prisma.ts         # Prisma client singleton
└── types/
    └── express.d.ts      # Extend Express Request type
```

### 6. Entry Point (`src/index.ts`)
```typescript
import "dotenv/config";
import app from "./app.js";

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

### 7. Error Handler Middleware
```typescript
// src/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err);
  res.status(500).json({
    error: "Internal Server Error",
    // JANGAN kirim err.message ke client di production
    ...(process.env.NODE_ENV === "development" && { detail: err.message }),
  });
};
```

### 8. Scripts di `package.json`
```json
{
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "db:migrate": "prisma migrate dev",
    "db:studio": "prisma studio",
    "db:generate": "prisma generate"
  }
}
```

### 9. Environment Variables (`.env`)
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
PORT=3000
NODE_ENV=development
JWT_SECRET=ganti-dengan-secret-yang-kuat
```

Pastikan `.env` ada di `.gitignore`.

## Common Rationalizations

| Alasan | Fakta |
|---|---|
| "Validasi di controller saja, tidak perlu middleware" | Middleware Zod memisahkan validasi dari business logic — lebih bersih dan reusable. |
| "Prisma client di-import di mana-mana" | Gunakan singleton di `lib/prisma.ts` untuk menghindari multiple connection. |
| "Skip TypeScript, lebih cepat" | TypeScript mencegah bug runtime di API — non-negotiable untuk production. |

## Red Flags

- Hardcode credentials di source code.
- Tidak ada error handling middleware global.
- Prisma client diinisialisasi di setiap request.
- Route tanpa validasi input.

## Verification

- [ ] `npm run dev` berjalan tanpa error.
- [ ] `GET /health` (atau endpoint root) merespons 200.
- [ ] Prisma migrate berhasil (`npx prisma migrate dev`).
- [ ] Zod validation menolak payload invalid dengan status 400.
- [ ] Error handler mengembalikan JSON, bukan HTML stack trace.
- [ ] `.env` ada di `.gitignore`.
- [ ] `strict: true` aktif di `tsconfig.json`.
