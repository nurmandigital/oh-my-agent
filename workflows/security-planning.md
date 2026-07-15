---
name: security-planning
title: Security Planning
order: 5
phase: Security
usage: Use after Architecture
condition: Risk-sensitive changes
output: templates/SECURITY.md
next: workflows/testing-planning.md
---

# Security Planning Workflow

## Goal
Mengubah requirement dan architecture menjadi kontrol keamanan yang dapat diverifikasi sebelum implementasi.

## Input
- PRD, acceptance criteria, architecture, data flow, threat surface, dan compliance requirement bila ada.

## Proses
1. Inventarisir actor, asset, trust boundary, data sensitif, endpoint, storage, dan third-party.
2. Klarifikasi authn/authz, retention, privacy, threat/compliance constraint, dan incident owner yang belum jelas.
3. Modelkan abuse case: injection, XSS, CSRF, SSRF, IDOR, secret leak, replay, rate abuse, path traversal, dan denial-of-service sesuai konteks.
4. Tetapkan kontrol: validation, authorization, secret handling, logging/redaction, rate limit, encryption, dependency policy, backup, dan response.
5. Map setiap kontrol ke requirement, boundary, dan test/verification.

## Output
- File `SECURITY.md` di lokasi dokumentasi proyek yang disepakati.
- Gunakan `templates/SECURITY.md`.

## Exit Checklist
- [ ] Semua trust boundary dan data sensitif terpetakan.
- [ ] Authn/authz dibedakan dan diuji pada resource sensitif.
- [ ] Tidak ada secret/example credential nyata.
- [ ] Threat, mitigasi, residual risk, dan owner tercatat.
- [ ] Security acceptance checks dapat diverifikasi.
