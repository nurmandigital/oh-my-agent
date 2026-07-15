# Code Review Report: [Nama Fitur]

> Laporan ini bersifat read-only. Source code tidak diubah oleh reviewer.

## Metadata

- **Review ID**: `CR-[YYYYMMDD]-[slug]`
- **Target**: [Branch / commit / PR / file / folder]
- **Tanggal**: [YYYY-MM-DD]
- **Reviewer**: [Agent/persona]
- **Scope**: [Apa yang termasuk review]
- **Out of Scope**: [Apa yang tidak direview]
- **Requirement/PRD**: [Path atau link, jika tersedia]
- **Architecture/Design**: [Path atau link, jika tersedia]

## Verdict

**[Approve | Approve with Suggestions | Request Changes | Block]**

### Alasan Verdict

[Ringkasan alasan berdasarkan finding dengan severity tertinggi.]

## Executive Summary

[Ringkasan 2-5 kalimat tentang kualitas perubahan, risiko utama, dan status kesiapan integrasi.]

## Findings Summary

| Severity | Jumlah | Task Dibuat |
|---|---:|---:|
| Critical | 0 | 0 |
| High | 0 | 0 |
| Major | 0 | 0 |
| Minor | 0 | 0 |
| Nit | 0 | 0 |

> **Rule A:** Task remediation hanya dibuat untuk Critical, High, dan Major.

## Findings

### [CR-001] [Judul Temuan]

- **Severity**: Critical / High / Major / Minor / Nit
- **Kategori**: Correctness / Security / Performance / Maintainability / Testing / Compatibility
- **Lokasi**: `path/to/file.ts:10-25`
- **Status**: Open / Accepted Risk / Resolved
- **Task**: `tasks/task-review-[slug].md` atau `Tidak dibuat (Minor/Nit)`

#### Evidence

```text
[Potongan diff, output test, atau langkah reproduksi yang membuktikan temuan]
```

#### Masalah

[Jelaskan apa yang salah secara faktual.]

#### Dampak

[Jelaskan siapa/apa yang terdampak, likelihood, dan konsekuensi teknis/bisnis.]

#### Rekomendasi

[Jelaskan perbaikan yang disarankan. Jangan mengubah source code dari laporan ini.]

#### Verifikasi yang Dibutuhkan

- [ ] [Test atau pemeriksaan untuk membuktikan perbaikan]
- [ ] [Edge case yang perlu dicakup]

> Gandakan blok `### [CR-001]` untuk setiap finding.

## Positive Findings

- [Hal yang sudah dilakukan dengan baik]
- [Kontrol security/test/performance yang sudah benar]

## Verification Results

| Pemeriksaan | Command/Metode | Status | Catatan |
|---|---|---|---|
| Test | `[perintah sesuai proyek]` | PASS / FAIL / NOT RUN | [Detail] |
| Lint | `[perintah sesuai proyek]` | PASS / FAIL / NOT RUN | [Detail] |
| Typecheck | `[perintah sesuai proyek]` | PASS / FAIL / NOT RUN | [Detail] |
| Build | `[perintah sesuai proyek]` | PASS / FAIL / NOT RUN | [Detail] |
| Security | [Metode] | PASS / FAIL / NOT RUN | [Detail] |

## Compatibility & Regression Assessment

- **API compatibility**: [Aman / Breaking / Tidak dinilai]
- **Database/schema compatibility**: [Aman / Breaking / Tidak dinilai]
- **Configuration/env impact**: [Tidak ada / Ada — jelaskan]
- **Regression risk**: Low / Medium / High
- **Rollback plan**: [Ada / Tidak ada / Tidak diperlukan]

## Limitations

- [Test atau akses yang tidak tersedia]
- [Bagian yang tidak dapat diverifikasi]
- [Asumsi yang digunakan]

## Remediation Tasks

Daftar task yang dibuat berdasarkan Rule A:

- [ ] `tasks/task-review-[slug-1].md` — `[CR-001] [Judul]` — Critical/High/Major
- [ ] `tasks/task-review-[slug-2].md` — `[CR-002] [Judul]` — Critical/High/Major

## Reviewer Checklist

- [ ] Scope review terdokumentasi.
- [ ] PRD/requirement dibaca bila tersedia.
- [ ] Semua finding memiliki evidence, lokasi, dan dampak.
- [ ] Severity tidak dibesar-besarkan.
- [ ] Critical/High/Major memiliki remediation task.
- [ ] Minor/Nit tidak dibuatkan task otomatis.
- [ ] Source code tidak diubah.
- [ ] Limitasi review dicatat.
- [ ] Verdict konsisten dengan finding.
