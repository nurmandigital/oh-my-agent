# Task Instruction (Step-by-Step Prompt)

Panduan kerja terstruktur ini wajib diikuti oleh AI Agent sebelum dan selama melakukan perubahan kode pada repositori.

## Langkah 1: Eksplorasi & Pemahaman (Define)
- Baca berkas deskripsi fitur (`PRD.md`) dan arsitektur (`ARCHITECTURE.md`).
- Petakan file mana saja yang akan dipengaruhi oleh perubahan tersebut.
- Jangan mulai menulis kode sebelum Anda paham 100% tujuan dan batasan tugas.

## Langkah 2: Perencanaan Tugas (Plan)
- Buat daftar tugas (`todo.md`) secara berurutan dari yang paling dasar (dependency terendah) hingga yang paling atas (UI/fitur akhir).
- Lakukan review rencana tugas dengan user jika ada hal yang kurang jelas.

## Langkah 3: Eksekusi Bertahap (Build)
- Selesaikan tugas satu per satu. Jangan menumpuk banyak perubahan dalam satu waktu.
- Setiap kali menyelesaikan satu file atau fungsi, pastikan tidak ada sintaks yang rusak.

## Langkah 4: Pengujian & Validasi (Verify)
- Jalankan test suite lokal jika ada.
- Lakukan pengecekan manual atau verifikasi output untuk memastikan fitur berjalan sesuai kriteria penerimaan.

## Langkah 5: Review & Finishing (Review)
- Lakukan linting dan typecheck (`npm run lint`, `npm run typecheck`, atau sejenisnya).
- Bersihkan kode dari console log percobaan atau komentar debug sebelum menyerahkan hasil akhir.
