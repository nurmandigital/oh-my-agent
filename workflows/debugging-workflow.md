---
name: debugging-workflow
title: Debugging Workflow
order: 9
phase: Debug
usage: Use when an error occurs
condition: Error only
output: Root-cause evidence and verified fix
next: workflows/code-review-workflow.md
---

# Debugging Workflow

## Goal
Menemukan root cause, menerapkan fix terkecil yang benar, dan membuktikan regresi tidak kembali.

## Input
- Error lengkap, environment, reproduction steps, expected vs actual behavior, recent changes, dan relevant logs/tests.

## Process
1. **Reproduce:** Dapatkan reproduksi minimal dan evidence sebelum mengubah kode.
2. **Isolate:** Persempit layer, file, input, state, dependency, dan kondisi pemicu.
3. **Hypothesize:** Susun hipotesis terurut; uji satu variabel per langkah. Bedakan symptom dari root cause.
4. **Plan minimal fix:** Nilai impact, compatibility, data risk, dan rollback. Hindari rewrite tanpa bukti.
5. **Regression test first bila feasible:** Tambahkan test yang gagal karena bug dan lulus setelah fix.
6. **Implement:** Terapkan perubahan minimum; jangan bypass validation/type/security.
7. **Verify:** Jalankan focused test, lalu suite/quality checks relevan dan acceptance criteria terkait.
8. **Document:** Catat root cause, fix, evidence, limitation, dan prevention.

## Output
- Verified fix atau diagnosis bila perubahan belum diizinkan.
- Regression test untuk bug yang dapat diuji otomatis; jika tidak, dokumentasikan manual reproduction/verification.

## Exit Checklist
- [ ] Root cause didukung evidence.
- [ ] Fix tidak hanya menyembunyikan symptom.
- [ ] Regression scenario terbukti.
- [ ] Relevant suite/quality checks dijalankan atau limitation dicatat.
- [ ] Tidak ada destructive command, install, migration, atau deploy tanpa approval.
