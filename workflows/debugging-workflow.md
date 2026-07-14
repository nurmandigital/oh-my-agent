# Debugging Workflow

Gunakan alur sistematis ini saat mendeteksi adanya bug, error pada testing, atau kegagalan kompilasi (build).

## Langkah 1: Isolasi Masalah
- Dapatkan pesan error lengkap (stack trace).
- Identifikasi file dan baris kode yang memicu error tersebut.
- Reproduksi error tersebut dengan input minimal (minimal reproducible example).

## Langkah 2: Analisis Penyebab Utama (Root Cause Analysis)
- Ajukan pertanyaan:
  - Apakah ini disebabkan oleh tipe data yang salah?
  - Apakah ada state yang tidak ter-update dengan benar?
  - Apakah ada dependensi eksternal yang gagal diakses (API timeout, DB offline)?

## Langkah 3: Rancang Perbaikan Minimal
- Buat solusi dengan dampak terkecil pada modul lain. Hindari menulis ulang seluruh modul jika masalah hanya ada pada satu baris validasi.
- Tulis test case tambahan yang secara spesifik mengetes skenario kegagalan ini (regression testing).

## Langkah 4: Terapkan dan Verifikasi
- Terapkan perbaikan.
- Jalankan kembali test case yang gagal sebelumnya untuk memastikan masalah selesai.
- Jalankan seluruh rangkaian test suite untuk menjamin tidak ada fitur lain yang rusak akibat perbaikan ini.
