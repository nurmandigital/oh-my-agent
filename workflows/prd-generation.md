# Rule: Generating a Product Requirements Document (PRD)

## Goal

Membimbing AI Agent untuk membuat dokumen Product Requirements Document (PRD) yang mendetail dalam format Markdown berdasarkan deskripsi awal dari pengguna. PRD harus jelas, dapat ditindaklanjuti, dan mudah dipahami oleh junior developer untuk diimplementasikan.

## Proses Detail

1.  **Menerima Deskripsi Awal:** Pengguna memberikan deskripsi singkat tentang fitur atau fungsionalitas baru yang diinginkan.
2.  **Mengajukan Pertanyaan Klarifikasi:** Sebelum menulis PRD, AI *wajib* mengajukan 3-5 pertanyaan klarifikasi yang paling krusial untuk melengkapi detail yang kurang.
    - **Persyaratan Format Pertanyaan:**
      - Berikan penomoran pada setiap pertanyaan (1, 2, 3, dst).
      - Sediakan pilihan jawaban berlabel huruf (A, B, C, D, dst) untuk setiap pertanyaan agar pengguna mudah menjawab (misal: "1A, 2C, 3B").
3.  **Membuat PRD:** Setelah pengguna menjawab pertanyaan klarifikasi, buat draf PRD lengkap menggunakan struktur di bawah.
4.  **Menyimpan PRD:** Simpan PRD yang dihasilkan ke dalam direktori `/tasks/` dengan nama file `prd-[feature-name].md`.

## Struktur PRD

Daftar struktur yang wajib ada di dalam PRD:

1.  **Introduction/Overview:** Deskripsi singkat fitur, masalah yang ingin diselesaikan, dan tujuan utamanya.
2.  **Goals:** Daftar tujuan spesifik dan terukur dari fitur ini.
3.  **User Stories:** Narasi skenario penggunaan fitur oleh pengguna beserta keuntungan yang mereka dapatkan.
4.  **Functional Requirements:** Daftar fungsi spesifik yang harus dimiliki fitur secara berurutan dan terperinci. (Contoh: "1. Sistem harus memungkinkan pengguna mengunggah foto profil.").
5.  **Non-Goals (Out of Scope):** Daftar hal-hal yang tidak akan diimplementasikan pada fase ini untuk mencegah scope creep.
6.  **Design Considerations (Opsional):** Tautan ke mockup desain, atau aturan styling UI/UX yang relevan.
7.  **Technical Considerations (Opsional):** Kendala teknis yang diketahui, dependensi sistem, atau saran integrasi (misal: integrasi dengan modul autentikasi yang sudah ada).
8.  **Success Metrics:** Metrik keberhasilan implementasi fitur (misal: "Mengurangi tiket komplain terkait X sebesar 10%").
9.  **Open Questions:** Daftar pertanyaan tersisa yang membutuhkan klarifikasi atau keputusan lebih lanjut dari stakeholder di masa depan.

## Target Pembaca

Junior developer. Pastikan bahasa yang digunakan eksplisit, tidak ambigu, dan hindari jargon teknis yang tidak perlu agar alur logika fitur mudah dimengerti.
