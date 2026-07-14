# TypeScript & Code Quality Guardrails

Aturan ketat penulisan TypeScript untuk menjaga integritas tipe data dan kebersihan kode.

## 1. Larangan Penggunaan `any`
- Dilarang keras menggunakan tipe `any`. Gunakan `unknown` jika tipe data tidak diketahui sebelumnya, lalu gunakan type guarding / runtime validation.
- Selalu aktifkan `"noImplicitAny": true` pada konfigurasi `tsconfig.json`.

## 2. Penggunaan Assertion Tipe data
- Hindari penggunaan operator non-null assertion `!` secara sembarangan. Gunakan opsional chaining `?.` atau pengecekan `if` eksplisit.
- Jangan gunakan type casting paksa seperti `as unknown as T` kecuali dalam kondisi integrasi dengan library pihak ketiga yang terpaksa.

## 3. Struktur Modul & Fungsi
- Setiap fungsi ekspor (exported function) wajib memiliki tipe parameter dan tipe kembalian (return type) yang dideklarasikan secara eksplisit.
- Batasi jumlah baris dalam satu fungsi maksimal 50 baris untuk menjaga fokus logika.
