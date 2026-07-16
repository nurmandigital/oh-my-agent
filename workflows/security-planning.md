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
Mengubah PRD, Architecture, dan Design menjadi security plan yang risk-based, testable, dan disetujui sebelum implementasi. Agent bertindak sebagai **security discovery partner**: menemukan attack surface, memodelkan threat, menawarkan kontrol + trade-off, memberi rekomendasi, lalu user memutuskan.

## Boundary
- Workflow ini menghasilkan **security decisions dan verification plan**, bukan pentest, exploit, kode production, atau compliance certification.
- Agent membedakan fakta, threat, rekomendasi, keputusan user, asumsi, dan `TBD`.
- Jangan mengarang compliance, SLA, threat actor, data classification, incident requirement, atau security vendor.
- Jangan menulis credential, token, password, API key, atau contoh secret nyata.
- Jangan memaksakan kontrol enterprise tanpa risk rationale.
- Jangan menganggap recommendation sebagai keputusan final atau menandai Approved tanpa user.

## Input
- Wajib: PRD + acceptance criteria + Architecture.
- Conditional: Design bila ada UI.
- Bila tersedia: auth middleware, route/API boundary, validation schema, DB/migration, env/config, dependency manifest/lockfile, CI/CD, logging/error handling, dan test existing.

## Existing-Security Pre-Flight

Sebelum bertanya:

1. Baca PRD, Architecture, Design bila ada, dan acceptance criteria.
2. Scan implementation/config security yang ada.
3. Klasifikasikan: Greenfield / Existing system / Migration-refactor / Security remediation.
4. Catat temuan dengan path serta confidence `Confirmed / Inferred / TBD`.
5. Pertahankan security pattern existing kecuali ada evidence/risk kuat untuk perubahan.

Contoh temuan:

```text
- Confirmed: auth middleware di src/middleware/auth.ts.
- Inferred: DATA-003 mengandung PII berdasarkan Architecture.md.
- TBD: rate-limit policy belum ditemukan/dikonfirmasi.
```

## Discovery Stance

```text
Agent reads PRD + Architecture + Design
→ scans existing security posture
→ discovers assets, trust boundaries, and attack surface
→ models threats and abuse cases
→ offers controls with trade-offs
→ recommends a risk-appropriate control
→ user decides
→ agent records SDR decisions
→ SECURITY.md is generated
```

## Interaction Contract

1. Mulai dengan ringkasan scope, mode, existing findings, asset/risk yang terlihat, dan unknown.
2. Ajukan 3–7 pertanyaan paling relevant per giliran; jangan membanjiri user.
3. Untuk kontrol yang punya trade-off gunakan: Temuan → Options → Recommendation → Why → Decision.
4. Jelaskan threat dalam bahasa product impact sebelum jargon keamanan.
5. Jika user belum tahu, rekomendasikan default proporsional beserta risiko; tetap minta approval.
6. Setelah jawaban, ringkas decision + impact dan update Security Decision Ledger.
7. Sebelum final, tampilkan residual/unresolved risk, exception, dan security verification gap.

## Progressive Discovery Batches

### Batch 1 — Assets, Actors & Data Classification
- Data apa disimpan, diproses, dikirim, diekspor, atau dicatat?
- Mana public/internal/confidential/PII/payment credential?
- Siapa user, admin, service account, third-party, dan data owner?
- Source of truth, retention, deletion, export, backup requirement?

### Batch 2 — Authentication & Authorization
- Siapa boleh mengakses fitur/resource?
- Session/JWT/OAuth/SSO? Recovery, expiry, revoke, logout?
- RBAC, ABAC, ownership, atau tenant isolation?
- Admin action perlu re-auth, MFA, approval, atau audit?

Contoh format:

```text
Options:
A. RBAC sederhana — mudah diimplementasi; kurang detail untuk tenant/resource.
B. RBAC + ownership/tenant validation — lebih aman untuk multi-tenant; butuh policy layer jelas.
C. ABAC/policy engine — sangat fleksibel; complexity/operational cost lebih tinggi.

Recommendation: B untuk resource milik tenant/user.
Why: role saja tidak mencegah IDOR lintas tenant.
Decision: Accepted / Modified / Rejected / Deferred / TBD
```

### Batch 3 — Input, Output & Attack Surface
- Form, URL param, query, upload, webhook, CSV/import, API body, message queue?
- HTML/Markdown/export/log output?
- Public/internal/admin endpoint? CORS/CSRF boundary?
- Validation, encoding, sanitization, upload type/size/scan?
- Injection, XSS, SSRF, IDOR, path traversal, deserialization, open redirect sesuai konteks?

### Batch 4 — Session, Token, Secret & Configuration
- Token/session lifecycle, refresh/rotation/revocation?
- Cookie `httpOnly`, `Secure`, `SameSite` bila browser session?
- Secret store, rotation, least privilege, config access boundary?
- Redaction di log/error/telemetry?
- Encryption/key management requirement?

### Batch 5 — Abuse, Resilience & Recovery
- Brute force, enumeration, replay, duplicate submit, fraud, resource exhaustion, DoS?
- Rate limit, quota, idempotency, queue, timeout/retry/circuit breaker?
- Backup, restore, disaster recovery, data corruption response?

### Batch 6 — Privacy, Audit & Compliance
- Data minimization, consent, retention, deletion, export, legal hold?
- Audit event: actor/action/resource/time/result?
- Log redaction dan access ke audit log?
- Compliance hanya ditanyakan bila product/domain mengindikasikan atau user menyebutkan.

### Batch 7 — Incident & Verification
- Alert owner/on-call, severity/escalation, incident communication?
- Security test: unit/integration/E2E/manual; secret/dependency/SAST/DAST scan bila relevan?
- Evidence release gate, exception expiry/review?

### Batch 8 — Review, Approval & Handoff
- Ringkas threat, control, decision, residual risk, dan exception.
- Map PRD/AC → threat → control → verification.
- Minta approval user.
- Handoff ke `workflows/testing-planning.md`; `TBD` bukan final decision.

## Threat Model Record

```markdown
### THR-001 — [Threat title]

**Asset:** [Data/resource]
**Entry point:** [Endpoint/form/event]
**Threat actor:** [Actor]
**Attack path:** [How abuse may happen]
**Impact:** [Product/security impact]
**Likelihood:** Low / Medium / High
**Risk:** Low / Medium / High

**Options**
A. [Control option]
  - Pros:
  - Cons:
  - Risk:
B. [Control option]
  - Pros:
  - Cons:
  - Risk:

**Recommendation:** [..]
**Why:** [Risk/context rationale]
**User decision:** Accepted / Rejected / Modified / Deferred / TBD
**Controls:** [..]
**Residual risk:** [..]
**Verification:** [Test/evidence]
```

## Security Decision Ledger (SDR)

| ID | Area | Options | Recommendation | User decision | Risk/impact |
|---|---|---|---|---|---|
| SDR-001 | Authorization | RBAC / RBAC+ownership | RBAC+ownership | Accepted | Prevent IDOR |

Rules:
- Accepted/Modified → security plan final.
- Rejected → reason recorded.
- Deferred → post-MVP/follow-up.
- TBD → open question + owner + next action.

## Output
- File `security-[feature].md` atau `SECURITY.md` di lokasi dokumentasi proyek yang disepakati.
- Struktur resmi: `templates/SECURITY.md`.
- Threat Model + SDR + security acceptance criteria.
- Handoff berikutnya: `workflows/testing-planning.md`.

## Exit Checklist
- [ ] Existing security posture scanned with cited findings.
- [ ] Assets, data classification, actors, trust boundaries, and attack surface mapped.
- [ ] Authentication and authorization/resource ownership separated.
- [ ] Relevant threats and abuse cases have risk, control, residual risk, and verification.
- [ ] Input/output, session/token, secret/config, privacy, audit, abuse, backup/recovery reviewed.
- [ ] Every accepted control has SDR/user decision and implementation boundary.
- [ ] PRD/AC → threat → control → test traceability exists.
- [ ] No real credential/example secret is included.
- [ ] Exceptions, assumptions, open questions, owner, and expiry recorded.
- [ ] User approval recorded; agent never self-approves.
