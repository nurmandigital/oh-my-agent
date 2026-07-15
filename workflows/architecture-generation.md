# Architecture Generation Workflow

## Goal
Mengubah PRD yang disetujui menjadi keputusan arsitektur yang dapat diverifikasi, tanpa mengarang stack atau memaksakan framework.

## Input
- PRD dan acceptance criteria.
- Batasan proyek, stack existing, deployment target, dan data/API yang tersedia.

## Proses
1. Baca PRD; daftar requirement yang memengaruhi struktur sistem.
2. Scan struktur dan teknologi existing sebelum memilih pola baru.
3. Ajukan pertanyaan hanya untuk keputusan yang blocking: runtime, data ownership, integrasi, availability, dan compatibility.
4. Rancang boundary modul, alur data, kontrak API/event, penyimpanan, error boundary, dan observability.
5. Catat alternatif, trade-off, asumsi, migration/rollback bila ada perubahan existing.
6. Pastikan setiap keputusan memetakan requirement PRD.

## Output
- File `ARCHITECTURE.md` di lokasi dokumentasi proyek yang disepakati.
- Gunakan `templates/ARCHITECTURE.md`.

## Exit Checklist
- [ ] Tidak ada stack/dependency yang diasumsikan tanpa bukti atau persetujuan.
- [ ] Semua boundary dan alur data utama terdokumentasi.
- [ ] Risiko, trade-off, compatibility, dan rollback tercatat.
- [ ] Architecture traceable ke acceptance criteria.
