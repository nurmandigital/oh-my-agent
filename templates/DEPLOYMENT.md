# Deployment & Infrastructure Guide

## 1. Lingkungan Rilis (Environments)
- **Development**: Digunakan oleh developer di mesin lokal.
- **Staging**: Lingkungan testing sebelum naik ke produksi. Database dan resource terisolasi namun mirip dengan produksi.
- **Production**: Lingkungan langsung yang diakses oleh pengguna akhir.

## 2. Langkah Penggelaran (Deployment Steps)
1. Pastikan semua build test lokal lulus (perintah test proyek, mis. `npm test`, `pytest`, `go test`).
2. Jalankan perintah kompilasi produksi (perintah build proyek, mis. `npm run build`, `pnpm build`, `cargo build`).
3. Set environment variables yang dibutuhkan pada platform host (Vercel, AWS, Docker, dsb).
4. Lakukan migrasi skema database (jika ada) menggunakan perintah migrasi produksi.
5. Deploy artefak kompilasi ke server host.

## 3. Daftar Environment Variables yang Wajib Ada
- `DATABASE_URL`: Alamat koneksi database.
- `JWT_SECRET`: Token enkripsi autentikasi.
- `API_BASE_URL`: Endpoint dasar backend API.
