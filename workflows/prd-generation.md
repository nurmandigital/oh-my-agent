---
name: prd-generation
title: PRD Generation
order: 2
phase: Define
usage: Copy first
condition: Always
output: templates/PRD.md
next: workflows/architecture-generation.md
---

# PRD Generation Workflow

## Goal
Mengubah brief menjadi requirement produk yang jelas, testable, dan disetujui sebelum keputusan teknis atau implementasi.

## Input
- Problem/feature brief, target user, business context, constraint, dan evidence yang tersedia.

## Proses
1. Ringkas masalah, pengguna, outcome, scope awal, dan fakta yang diketahui.
2. Ajukan 3–5 pertanyaan klarifikasi paling blocking; beri opsi berlabel bila membantu, tanpa memaksa pilihan palsu.
3. Bedakan fakta, asumsi, keputusan, dan open question.
4. Susun PRD menggunakan `templates/PRD.md`.
5. Tulis requirement bernomor dan acceptance criteria yang observable/testable.
6. Jangan mengarang metric, testimonial, deadline, budget, atau stakeholder approval. Gunakan `TBD — perlu konfirmasi` atau hilangkan metric yang belum tersedia.
7. Tampilkan draft untuk review; tandai status approved hanya setelah user/stakeholder menyetujui.

## Output
- File `prd-[feature-name].md` di direktori dokumentasi proyek yang disepakati.
- Template resmi: `templates/PRD.md`.

## Exit Checklist
- [ ] Problem, audience, goals, non-goals, dan scope jelas.
- [ ] Functional/non-functional requirements bernomor.
- [ ] Setiap behavior utama memiliki acceptance criteria.
- [ ] Metric hanya memakai data user atau ditandai TBD.
- [ ] Assumption dan open question terlihat jelas.
