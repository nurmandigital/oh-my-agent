# Dependency & Third-Party Library Guardrails

Aturan penambahan dan pengelolaan paket eksternal (third-party packages) pada proyek.

## 1. Larangan Instalasi Paket Mandiri
- AI Agent dilarang keras menginstal library baru (`npm install`, `yarn add`, dll) tanpa izin eksplisit dari developer melalui chat/konfirmasi.
- Selalu periksa apakah fungsionalitas yang dibutuhkan bisa ditulis secara native (tanpa library tambahan).

## 2. Proses Evaluasi Library Baru
Jika membutuhkan library baru, AI Agent wajib memverifikasi:
- Ukuran bundle paket (pilih yang ringan dan mendukung tree-shaking).
- Umur dan dukungan pemeliharaan proyek (hindari paket yang tidak di-update > 1 tahun).
- Jumlah kerentanan keamanan yang tercatat (lakukan pengecekan via `npm audit` jika memungkinkan).

## 3. Versi Paket
- Gunakan versi paket yang stabil (hindari versi beta/canary di lingkungan produksi).
- Tulis versi paket dengan format presisi pada `package.json` untuk menghindari bentrokan dependensi (dependency mismatch).
