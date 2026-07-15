# Task List Generation Workflow

## Goal
Mengubah PRD dan dokumen pendukung menjadi task list implementasi yang berurutan, atomic, dan dapat diverifikasi.

## Input
- Wajib: PRD + acceptance criteria.
- Bila tersedia: `ARCHITECTURE.md`, `DESIGN.md`, `SECURITY.md`, `TESTING.md`, existing code, dan constraints.

## Proses
1. Baca semua input; catat dokumen yang tidak tersedia sebagai limitation.
2. Identifikasi dependency, risk, migration, affected files, dan pekerjaan lintas layer.
3. Tampilkan 4–6 parent task untuk persetujuan awal; jangan menulis detail seolah sudah disetujui.
4. Setelah user menyetujui, pecah menjadi subtask atomic dengan satu outcome jelas.
5. Setiap acceptance criterion harus punya task/test/verification yang membuktikannya.
6. Gunakan `templates/TASK_LIST.md`; jangan mengarang path atau command. Tandai unknown sebagai TBD.
7. Sertakan verification checkpoint per fase, lalu final test/lint/typecheck/build hanya bila tersedia.

## Output
- File `tasks-[feature-name].md` di direktori dokumentasi proyek yang disepakati.
- Template resmi: `templates/TASK_LIST.md`.

## Exit Checklist
- [ ] PRD/AC menjadi source of truth.
- [ ] Task punya dependency order dan relevant files.
- [ ] Tidak ada task di luar scope tanpa approval.
- [ ] Test, security, migration, dan rollback tercakup bila relevan.
- [ ] Definition of Done dan evidence jelas.
