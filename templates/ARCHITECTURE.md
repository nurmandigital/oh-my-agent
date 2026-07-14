# Architecture Document

## 1. Struktur Direktori
[Tulis peta struktur folder penting di proyek ini beserta fungsinya.]
```text
src/
├── components/     # Komponen UI reusable
├── hooks/          # Custom hooks React (jika ada)
├── services/       # Logika integrasi API / DB
└── utils/          # Fungsi utility/helper murni
```

## 2. Alur Data & Komunikasi Komponen
- Komponen UI memicu aksi via `services/`.
- `services/` melakukan pemanggilan API/Database.
- Respons data divalidasi menggunakan skema validasi sebelum dikembalikan ke UI state.

## 3. Skema Basis Data (Jika Ada)
- **Tabel `users`**:
  - `id` (UUID, Primary Key)
  - `email` (String, Unique)
  - `created_at` (Timestamp)

## 4. Pola Pengembangan Kode (Patterns)
- Hindari logic berlebih di file komponen UI.
- Simpan helper murni dalam folder `utils/` agar mudah di-test.
