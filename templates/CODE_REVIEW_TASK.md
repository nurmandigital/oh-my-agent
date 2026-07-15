# Code Review Remediation Task: [Judul Temuan]

> Task ini dibuat berdasarkan finding `CR-[ID]` dan hanya digunakan untuk severity Critical, High, atau Major.

## Metadata

- **Task ID**: `TASK-REVIEW-[YYYYMMDD]-[slug]`
- **Review ID**: `CR-[YYYYMMDD]-[slug]`
- **Finding ID**: `CR-001`
- **Severity**: Critical / High / Major
- **Priority**: P0 / P1 / P2
- **Status**: Open
- **Assignee**: [Nama/persona implementer]
- **Created**: [YYYY-MM-DD]
- **Source Report**: `docs/reviews/code-review-[feature]-[date].md`

## Masalah

[Jelaskan masalah secara spesifik, faktual, dan singkat.]

## Lokasi

- **File**: `path/to/file.ts`
- **Line/Range**: `10-25`
- **Komponen/Modul**: [Nama komponen atau modul]

## Evidence

```text
[Potongan kode, output test, log, atau langkah reproduksi]
```

## Dampak

- **Dampak teknis**: [Bug, security risk, data loss, performance, atau regresi]
- **Dampak pengguna/bisnis**: [Siapa/apa yang terdampak]
- **Likelihood**: Low / Medium / High
- **Blast radius**: Low / Medium / High

## Tujuan Perbaikan

[Definisikan kondisi yang harus tercapai setelah task selesai.]

## Rekomendasi Implementasi

[Langkah solusi yang disarankan. Implementer boleh menyesuaikan selama acceptance criteria tetap terpenuhi.]

1. [Langkah 1]
2. [Langkah 2]
3. [Langkah 3]

## Acceptance Criteria

- [ ] [Perilaku bermasalah sudah diperbaiki.]
- [ ] [Tidak ada regresi pada behavior terkait.]
- [ ] [Validasi/security/performance requirement terpenuhi.]
- [ ] [Dokumentasi/config diperbarui jika diperlukan.]

## Test & Verification Plan

- [ ] Tambahkan atau perbarui unit test.
- [ ] Tambahkan integration/E2E test jika relevan.
- [ ] Uji happy path.
- [ ] Uji error path dan edge case.
- [ ] Jalankan lint, typecheck, dan test suite sesuai tooling proyek.
- [ ] Lakukan security/performance verification jika severity terkait.

## Dependencies & Risiko

- **Dependencies**: [Task, modul, migrasi, keputusan, atau package yang dibutuhkan]
- **Risiko implementasi**: [Risiko saat memperbaiki]
- **Mitigasi**: [Cara mengurangi risiko]
- **Rollback**: [Cara mengembalikan perubahan bila gagal]

## Definition of Done

- [ ] Semua acceptance criteria terpenuhi.
- [ ] Test relevan lulus.
- [ ] Tidak ada finding Critical/High/Major baru yang disebabkan oleh fix.
- [ ] Perubahan direview oleh reviewer yang sesuai.
- [ ] Laporan review asli diperbarui dengan status finding (Open → Resolved).
- [ ] Source code hanya diubah oleh implementer yang ditugaskan, bukan reviewer.
