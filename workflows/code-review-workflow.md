---
name: code-review-workflow
title: Code Review Workflow
order: 10
phase: Review
usage: Use before merge
condition: Before merge
output: templates/CODE_REVIEW.md
next: workflows/deployment-workflow.md
---

# Code Review Workflow

Workflow read-only untuk meninjau perubahan kode dan menghasilkan laporan serta remediation task tanpa memodifikasi implementasi.

## Input

Reviewer harus memperoleh minimal satu target:
- Git diff/commit/branch/PR.
- Daftar file atau folder.
- Patch yang diberikan user.

Konteks tambahan bila tersedia:
- PRD dan acceptance criteria.
- Architecture/design/security/testing documentation.
- Issue atau deskripsi bug.

## Output

1. **Laporan wajib**: `code-review-[feature]-[YYYY-MM-DD].md`, berdasarkan `templates/CODE_REVIEW.md`.
2. **Task kondisional**: satu task per temuan Critical/High/Major, berdasarkan `templates/CODE_REVIEW_TASK.md`.
3. **Tidak ada perubahan source code**.

Lokasi output harus mengikuti pilihan proyek. Default yang disarankan:
- Laporan: `docs/reviews/`.
- Task: `tasks/`.

## Fase 1: Tetapkan Scope

1. Catat target review, branch/commit, dan tanggal.
2. Baca requirement dan acceptance criteria.
3. Identifikasi file changed, dependency, schema, API contract, dan consumer terdampak.
4. Catat keterbatasan review, misalnya test tidak dapat dijalankan atau requirement tidak tersedia.

## Fase 2: Inspeksi Perubahan

Review setiap perubahan melalui dimensi berikut:

### Correctness
- Apakah implementasi menyelesaikan requirement?
- Apakah kondisi batas, null state, error path, retry, dan concurrency ditangani?
- Apakah ada perubahan perilaku yang tidak disengaja?

### Security
- Apakah input eksternal divalidasi?
- Apakah auth dan authorization diterapkan pada resource yang tepat?
- Apakah secret, PII, token, atau internal error terekspos?
- Apakah ada injection, XSS, CSRF, SSRF, path traversal, atau IDOR?

### Performance
- Apakah ada N+1 query, loop bersarang berlebih, I/O berulang, atau payload besar?
- Apakah list endpoint memiliki pagination?
- Apakah query butuh index atau caching?

### Maintainability
- Apakah naming dan struktur sesuai pola proyek?
- Apakah logic duplikat, fungsi terlalu besar, type bypass, atau dead code muncul?
- Apakah perubahan menambah coupling yang tidak perlu?

### Testing
- Apakah test membuktikan behavior, bukan implementation detail?
- Apakah happy path, error path, edge case, dan regression scenario dicakup?
- Apakah mock tepat dan test tidak flaky?

### Compatibility
- Apakah API/schema/config berubah secara breaking?
- Apakah migrasi backward-compatible dan punya rollback?
- Apakah dokumentasi/env example perlu diperbarui?

## Fase 3: Verifikasi Berbasis Bukti

1. Jalankan test, lint, typecheck, atau build hanya bila command telah tersedia dan tidak mengubah source code.
2. Jangan menjalankan auto-fix, migration, deploy, package installation, atau destructive command.
3. Jika command tidak dapat dijalankan, catat sebagai limitation — jangan mengklaim hasilnya lulus.
4. Pastikan setiap finding punya file/line atau skenario reproduksi.

## Fase 4: Klasifikasi Finding

| Severity | Kriteria | Task? |
|---|---|---:|
| Critical | Data loss, auth bypass, secret leak, RCE, outage | Ya |
| High | Security tinggi, regresi fungsi utama, corruption berisiko | Ya |
| Major | Acceptance criteria gagal, performa serius, test krusial hilang | Ya |
| Minor | Maintainability atau behavior berdampak rendah | Tidak |
| Nit | Kosmetik atau preferensi opsional | Tidak |

Hindari inflation: severity ditentukan oleh dampak dan likelihood, bukan selera reviewer.

## Fase 5: Tulis Laporan

1. Salin struktur `templates/CODE_REVIEW.md`.
2. Isi metadata, scope, verdict, ringkasan, finding, positive findings, limitation, dan verification result.
3. Urutkan finding: Critical → High → Major → Minor → Nit.
4. Pastikan verdict konsisten:
   - Critical → Block.
   - High/Major → Request Changes.
   - Hanya Minor/Nit → Approve with Suggestions.
   - Tanpa finding → Approve.

## Fase 6: Buat Remediation Task (Rule A)

Untuk setiap finding `Critical`, `High`, atau `Major`:
1. Buat satu file berdasarkan `templates/CODE_REVIEW_TASK.md`.
2. Isi evidence, impact, scope, rekomendasi, acceptance criteria, test, dan dependency.
3. Referensikan ID finding dari laporan.
4. Jangan membuat task untuk Minor/Nit kecuali user meminta eksplisit.
5. Jangan mengeksekusi task; serahkan ke implementer.

## Fase 7: Serah Terima

Laporkan:
- Verdict.
- Jumlah finding per severity.
- Lokasi laporan.
- Lokasi remediation task.
- Limitasi review.

Format ringkas:

```markdown
Review selesai — source code tidak diubah.

- Verdict: Request Changes
- Findings: 0 Critical, 1 High, 2 Major, 3 Minor
- Report: `docs/reviews/code-review-user-auth-2026-01-01.md`
- Tasks:
  - `tasks/task-review-user-auth-missing-authorization.md`
  - `tasks/task-review-user-auth-refresh-race.md`
```

## Exit Checklist

- [ ] Review tetap read-only.
- [ ] Laporan memakai template resmi.
- [ ] Semua finding memiliki evidence dan dampak.
- [ ] Task hanya dibuat untuk Critical/High/Major.
- [ ] Task mereferensikan finding laporan.
- [ ] Tidak ada auto-fix, install, migration, atau deploy.
