# Rule: Generating a Task List from User Requirements

## Goal

Membimbing AI Agent untuk membuat daftar tugas (task list) yang terstruktur, mendetail, dan bertahap dalam format Markdown berdasarkan kebutuhan pengguna, dokumentasi fitur, atau spesifikasi sistem. Daftar tugas ini harus bisa langsung digunakan sebagai panduan eksekusi developer.

## Output

- **Format:** Markdown (`.md`)
- **Lokasi:** `/tasks/`
- **Penamaan File:** `tasks-[feature-name].md` (contoh: `tasks-user-profile-editing.md`)

## Proses Detail

1.  **Analisis Kebutuhan:** AI menganalisis kebutuhan fungsional, non-fungsional, dependensi sistem, dan lingkup perubahan kode.
2.  **Fase 1: Pembuatan Parent Tasks (High-Level):**
    - Identifikasi 4-6 fase/tugas utama untuk menyelesaikan fitur.
    - **PENTING:** Selalu masukkan tugas `0.0 Create feature branch` sebagai langkah pertama, kecuali diminta lain oleh pengguna.
    - Tampilkan daftar tugas utama ini kepada pengguna terlebih dahulu untuk persetujuan awal.
    - Tampilkan instruksi penutup: `"I have generated the high-level tasks based on your requirements. Ready to generate the sub-tasks? Respond with 'Go' to proceed."`
3.  **Jeda & Konfirmasi:** AI berhenti dan menunggu pengguna membalas dengan `"Go"`.
4.  **Fase 2: Pembuatan Sub-Tasks (Mendetail):**
    - Setelah konfirmasi, pecah setiap parent task menjadi sub-task yang dapat ditindaklanjuti secara atomic (estimasi pengerjaan per sub-task tidak lebih dari 2 jam).
    - Masukkan checkpoint pengujian (Unit/E2E test) dan verifikasi (linting/typecheck) di setiap fase akhir.
5.  **Identifikasi File Terkait:**
    - Tulis daftar file yang akan dibuat baru maupun dimodifikasi, lengkap dengan deskripsi singkat kegunaannya.
6.  **Simpan Berkas:** Buat direktori `/tasks/` jika belum ada, dan simpan dengan nama file yang sesuai.

## Format Dokumen Output

```markdown
# Tasks: [Nama Fitur/Proyek]

## Relevant Files

- `src/components/MyComponent.tsx` - Komponen utama untuk tampilan UI fitur ini.
- `src/components/MyComponent.test.tsx` - Unit testing untuk menguji rendering dan interaksi komponen.
- `src/services/api.ts` - Endpoint API baru untuk submit data ke server.
- `src/services/api.test.ts` - Integrasi test untuk memastikan pemanggilan API sukses.

### Notes

- Unit test diletakkan di direktori yang sama dengan komponen yang diuji.
- Jalankan test suite lokal dengan command: `npm test [path/ke/file/test]` atau yang sesuai di proyek.

## Instructions for Completing Tasks

**PENTING:** Setiap kali sebuah tugas selesai dikerjakan, ubah tanda `- [ ]` menjadi `- [x]`. Lakukan pembaruan status ini sesegera mungkin per sub-task demi tracking progress yang akurat.

## Tasks

- [ ] 0.0 Create feature branch
  - [ ] 0.1 Buat dan checkout ke branch baru (contoh: `git checkout -b feature/[feature-name]`)
- [ ] 1.0 Setup & Fondasi Database/API
  - [ ] 1.1 Buat skema database baru untuk fitur ini
  - [ ] 1.2 Tulis migrasi database dan jalankan di server lokal
  - [ ] 1.3 Implementasi endpoint API dasar
- [ ] 2.0 Logika Bisnis & Integrasi Service
  - [ ] 2.1 Buat service layer untuk mengolah data input
  - [ ] 2.2 Tulis unit test untuk validasi data input
- [ ] 3.0 UI Component & State Management
  - [ ] 3.1 Buat komponen antarmuka pengguna sesuai spesifikasi desain
  - [ ] 3.2 Sambungkan input UI ke service API
  - [ ] 3.3 Tulis unit test untuk interaksi komponen UI
- [ ] 4.0 Verifikasi Akhir
  - [ ] 4.1 Jalankan linting (`npm run lint`) dan pastikan tidak ada warning/error
  - [ ] 4.2 Jalankan typecheck (`npm run typecheck` atau compiler check)
  - [ ] 4.3 Jalankan seluruh test suite proyek untuk memastikan tidak ada fitur lama yang rusak
```

## Panduan Interaksi AI

AI wajib membagi proses ini menjadi dua turn interaksi (Fase High-Level -> Tunggu "Go" -> Fase Detil & Penulisan File) untuk menjaga agar rencana proyek tetap selaras dengan kebutuhan developer manusia.
