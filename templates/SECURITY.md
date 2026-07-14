# Security Protocols

## 1. Penanganan Error & Exception
- Semua proses I/O (call API, query DB, pembacaan file) wajib menggunakan blok `try-catch`.
- Jangan pernah melemparkan raw error dari DB ke client untuk mencegah kebocoran informasi internal.

## 2. Validasi Data
- Semua payload input dari luar (request body, parameter URL, form submission) wajib divalidasi menggunakan library validator (seperti Zod, Yup, atau Joi).
- Terapkan sanitasi string untuk mencegah celah keamanan SQL Injection atau Cross-Site Scripting (XSS).

## 3. Manajemen Environment Variables & Kredensial
- Dilarang keras menaruh API Key, Password, Token, atau data kredensial lainnya secara hardcoded di dalam kode program.
- Gunakan file `.env` dan panggil nilai tersebut melalui environment variables proyek (misal `process.env`).
- Pastikan berkas `.env` terdaftar dalam `.gitignore`.
