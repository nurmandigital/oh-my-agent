# Deployment Workflow

## Goal
Menyiapkan release yang dapat diulang, diverifikasi, dimonitor, dan di-rollback.

## Input
- PRD, architecture, security/testing evidence, environment target, change log, dan deployment convention proyek.

## Proses
1. Identifikasi environment, artifact, config, secret owner, migration, dependency, dan blast radius.
2. Klarifikasi approval, maintenance window, rollback condition, monitoring, dan incident contact bila belum jelas.
3. Dokumentasikan pre-deploy checks, rollout strategy, migration sequence, verification, observability, rollback, dan post-deploy monitoring.
4. Jangan menjalankan deploy, migration, atau mengubah environment tanpa persetujuan eksplisit.

## Output
- File `DEPLOYMENT.md` di lokasi dokumentasi proyek yang disepakati.
- Gunakan `templates/DEPLOYMENT.md`.

## Exit Checklist
- [ ] Environment/config/secret reference terdokumentasi tanpa nilai secret.
- [ ] Rollout dan rollback memiliki trigger serta owner.
- [ ] Migration aman, compatible, dan punya backup/restore plan bila relevan.
- [ ] Health check dan post-deploy verification jelas.
