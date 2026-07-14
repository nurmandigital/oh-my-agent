# Quality Assurance & Testing Standard

## 1. Jenis Pengujian
- **Unit Testing**: Menguji logic di level fungsi murni (`utils/`), helper, dan reducer.
- **Integration Testing**: Menguji integrasi antar komponen atau API endpoint dengan mock database.
- **E2E Testing**: Menguji alur utama aplikasi di browser menggunakan emulator (seperti Cypress atau Playwright).

## 2. Cakupan Kode (Coverage Target)
- Target minimal coverage untuk fungsionalitas inti (core logic) adalah **80%**.
- Area krusial seperti sistem pembayaran, autentikasi, dan manipulasi data sensitif wajib memiliki coverage **100%**.

## 3. Aturan Penulisan Test Case
- Nama test case harus deskriptif (format: `should [expected behavior] when [scenario]`).
- Gunakan struktur Arrange-Act-Assert (AAA).
- Bersihkan database state atau mock instance setiap selesai melakukan pengujian (`afterEach` / `beforeEach`).
