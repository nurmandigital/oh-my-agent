# Testing Planning Workflow

## Goal
Menyusun strategi pengujian berbasis risiko dan acceptance criteria sebelum implementasi.

## Input
- PRD, architecture, design/security documents bila ada, change scope, serta test tooling existing.

## Proses
1. Turunkan test scenario dari setiap acceptance criterion dan failure mode.
2. Scan test framework, convention, fixture, CI, dan command yang tersedia; jangan mengarang command.
3. Klarifikasi environment, data fixture, external dependency, dan coverage expectation yang belum jelas.
4. Pilih level test paling murah yang membuktikan behavior: unit, integration, contract, E2E, manual, security, performance.
5. Tentukan test data, mocking, regression scenario, non-functional checks, ownership, dan exit criteria.

## Output
- File `TESTING.md` di lokasi dokumentasi proyek yang disepakati.
- Gunakan `templates/TESTING.md`.

## Exit Checklist
- [ ] Semua acceptance criteria punya metode verifikasi.
- [ ] Happy path, error path, edge case, dan regression risk tercakup.
- [ ] Test tidak bergantung pada service/data production tanpa persetujuan.
- [ ] Command/tool hanya dicantumkan bila tersedia di proyek.
