---
name: database-migration
description: Pola migrasi database yang aman dengan Prisma (atau sejenisnya) — membuat, menjalankan, dan merollback migrasi tanpa merusak data production. Gunakan saat menambahkan tabel baru, mengubah skema, atau merenovasi struktur database.
---

# Database Migration

## Overview

Skill ini memandu proses migrasi database yang aman: merencanakan perubahan skema, membuat file migrasi, menjalankan di development, memverifikasi di staging, dan menerapkan ke production dengan strategi rollback.

## When to Use

- Menambahkan tabel, kolom, atau relasi baru.
- Mengubah tipe data kolom.
- Menghapus kolom atau tabel (dengan hati-hati).
- Merenovasi skema database secara bertahap (expand-contract pattern).
- Menyiapkan seed data untuk development.

## Prinsip Utama

1. **Jangan pernah edit migrasi yang sudah dijalankan di production.** Buat migrasi baru.
2. **Expand-Contract**: Tambah dulu (expand), migrasi data, baru hapus yang lama (contract). Jangan ubah sekaligus.
3. **Backward compatible**: Migrasi harus aman dijalankan saat aplikasi versi lama masih berjalan.
4. **Selalu backup** sebelum migrasi production.

## Langkah-Langkah

### 1. Rencanakan Perubahan Skema
Sebelum menulis kode, dokumentasikan:
- Apa yang berubah (tabel/kolom/relasi)
- Apakah ada data existing yang terpengaruh
- Apakah perubahan bersifat breaking (butuh dual-write atau multi-step)

### 2. Update Schema (Prisma)
Edit `prisma/schema.prisma`:
```prisma
model Post {
  id        String   @id @default(cuid())
  title     String
  content   String?
  published Boolean  @default(false)
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### 3. Buat File Migrasi
```bash
npx prisma migrate dev --name add_posts_table
```

Perintah ini:
- Membuat file SQL di `prisma/migrations/<timestamp>_add_posts_table/`
- Menjalankan migrasi di database development
- Generate ulang Prisma Client

### 4. Review File Migrasi
**WAJIB** baca file SQL yang dihasilkan sebelum commit:
```sql
-- prisma/migrations/20240101120000_add_posts_table/migration.sql
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    ...
    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
```

Pastikan:
- Tidak ada `DROP TABLE` yang tidak disengaja
- Index ditambahkan untuk kolom yang sering di-query
- Foreign key constraint benar

### 5. Seed Data (Opsional)
Buat `prisma/seed.ts`:
```typescript
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: { email: "admin@example.com", name: "Admin" },
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

Jalankan:
```bash
npx prisma db seed
```

### 6. Expand-Contract Pattern (Perubahan Breaking)

**Fase Expand** (aman, non-breaking):
```prisma
// Tambah kolom baru (nullable dulu)
model User {
  // ... existing fields
  emailNew String?  // kolom baru, belum wajib
}
```

**Fase Migrasi Data**:
```sql
-- Backfill data dari kolom lama ke kolom baru
UPDATE "User" SET "emailNew" = "email" WHERE "emailNew" IS NULL;
```

**Fase Contract** (setelah semua instance app sudah pakai kolom baru):
```prisma
model User {
  // hapus kolom lama, buat emailNew wajib
  email String @unique  // rename emailNew → email
}
```

### 7. Migrasi Production
```bash
# 1. Backup dulu
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql

# 2. Deploy migrasi (CI/CD atau manual)
npx prisma migrate deploy

# 3. Verifikasi
npx prisma migrate status
```

**JANGAN** gunakan `prisma migrate dev` di production — gunakan `prisma migrate deploy`.

### 8. Rollback Strategy
Jika migrasi gagal di production:
1. **Jangan panik.** Database mungkin dalam state partial.
2. Restore dari backup jika migrasi merusak data.
3. Buat migrasi reverse (manual SQL) jika perlu:
```sql
-- Rollback: hapus tabel yang baru ditambahkan
DROP TABLE IF EXISTS "Post";
```
4. Catat di changelog: migrasi mana yang di-rollback dan kenapa.

## Common Rationalizations

| Alasan | Fakta |
|---|---|
| "Edit migrasi lama saja, lebih cepat" | Migrasi yang sudah di production adalah immutable. Edit = chaos. |
| "Skip backup, cuma tambah kolom" | Bahkan `ADD COLUMN` bisa lock table di DB besar. Backup selalu. |
| "Langsung DROP kolom lama" | Aplikasi versi lama masih butuh kolom itu. Gunakan expand-contract. |

## Red Flags

- Menjalankan `prisma migrate reset` di production (HAPUS SEMUA DATA).
- Migrasi tanpa review file SQL.
- Mengubah skema tanpa membuat file migrasi (drift).
- Hardcode `DATABASE_URL` di source code.

## Verification

- [ ] File migrasi SQL sudah di-review manual.
- [ ] `npx prisma migrate status` menunjukkan semua migrasi applied.
- [ ] Prisma Client ter-generate ulang (`npx prisma generate`).
- [ ] Aplikasi masih berjalan setelah migrasi (smoke test).
- [ ] Backup database tersedia sebelum migrasi production.
- [ ] Tidak ada schema drift (`npx prisma migrate diff` kosong).
