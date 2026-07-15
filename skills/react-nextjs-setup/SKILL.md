---
name: react-nextjs-setup
description: Setup proyek Next.js dengan TypeScript, Tailwind CSS, dan Shadcn UI dari nol. Gunakan saat memulai proyek frontend baru atau menambahkan komponen UI library ke proyek Next.js yang sudah ada.
---

# React + Next.js Setup

## Overview

Skill ini memandu setup proyek Next.js (App Router) lengkap dengan TypeScript, Tailwind CSS, ESLint, dan Shadcn UI. Menghasilkan struktur folder yang konsisten dan siap untuk produksi.

## When to Use

- Membuat proyek Next.js baru dari nol.
- Menambahkan Tailwind CSS ke proyek Next.js yang belum punya.
- Menambahkan Shadcn UI sebagai komponen library.
- Mengkonfigurasi ESLint + Prettier untuk Next.js.

## Prasyarat

- Node.js versi 18.17+ terinstal.
- Package manager: `npm`, `pnpm`, atau `yarn` (disarankan `pnpm` untuk performa).

## Langkah-Langkah

### 1. Inisialisasi Proyek Next.js
```bash
npx create-next-app@latest my-app --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

Pilih opsi:
- TypeScript: **Yes**
- ESLint: **Yes**
- Tailwind CSS: **Yes**
- `src/` directory: **Yes**
- App Router: **Yes**
- Import alias: **@/***

### 2. Verifikasi Struktur Folder
```text
my-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   └── components/       # buat jika belum ada
├── public/
├── tailwind.config.ts
├── tsconfig.json
├── next.config.mjs
└── package.json
```

### 3. Setup Shadcn UI
```bash
npx shadcn@latest init
```

Pilih opsi:
- Style: **Default** (atau **New York**)
- Base color: **Slate** (atau **Zinc**)
- CSS variables: **Yes**

Tambahkan komponen yang dibutuhkan:
```bash
npx shadcn@latest add button card input label dialog
```

### 4. Konfigurasi Tailwind (Verifikasi)
Pastikan `tailwind.config.ts` memiliki content path yang benar:
```typescript
content: [
  "./src/**/*.{js,ts,jsx,tsx,mdx}",
],
```

### 5. Struktur Folder Rekomendasi
Buat folder berikut di `src/`:
```text
src/
├── app/                  # Halaman & layout (App Router)
├── components/
│   ├── ui/               # Komponen Shadcn (auto-generated)
│   └── shared/           # Komponen reusable custom
├── lib/
│   ├── utils.ts          # Helper functions (cn, formatDate, dll)
│   └── constants.ts      # Konstanta aplikasi
├── hooks/                # Custom React hooks
├── types/                # Type definitions global
└── services/             # API calls & data fetching
```

### 6. Setup Environment Variables
Buat file `.env.local`:
```bash
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```
Pastikan `.env.local` ada di `.gitignore` (sudah default dari create-next-app).

### 7. Verifikasi Build
```bash
npm run build
npm run dev
```

## Common Rationalizations

| Alasan | Fakta |
|---|---|
| "Skip ESLint, bisa dicek nanti" | ESLint wajib dari awal untuk mencegah akumulasi debt. |
| "Pake Pages Router saja, lebih simpel" | App Router adalah standar baru Next.js. Gunakan kecuali ada alasan spesifik. |
| "Tidak perlu `src/` directory" | `src/` menjaga root folder bersih dan memisahkan kode dari config. |

## Red Flags

- Menggunakan `any` di komponen TypeScript.
- Menaruh API key di client component (`"use client"`) tanpa env var.
- Tidak menjalankan `npm run build` sebelum commit.

## Verification

- [ ] `npm run dev` berjalan tanpa error.
- [ ] `npm run build` sukses tanpa warning type.
- [ ] Komponen Shadcn (Button, Card) ter-render dengan benar.
- [ ] Tailwind CSS classes bekerja (cek dengan class `bg-red-500` di test).
- [ ] `.env.local` ada di `.gitignore`.
- [ ] Struktur folder sesuai dengan rekomendasi di Langkah 5.
