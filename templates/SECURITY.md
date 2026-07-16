# Security Plan: [Nama Sistem/Fitur]

> Gunakan bersama `workflows/security-planning.md`. Hanya kontrol Accepted/Modified yang menjadi komitmen final.

## 0. Document Control

| Field | Value |
|---|---|
| Status | Draft · In Review · Approved · Superseded |
| Mode | Greenfield · Existing · Migration · Remediation |
| Source PRD | `[path]` |
| Source Architecture/Design | `[paths atau Not applicable]` |
| Risk owner | [Nama/role] |
| Approver/date | [Nama/role/date] |
| Version | [0.1] |

## 1. Security Context & Scope

- **Feature/system scope:** [..]
- **Security objectives:** [Confidentiality/integrity/availability/privacy/audit priorities.]
- **In scope:** [Boundary/component/data.]
- **Out of scope:** [..]
- **Constraints/compliance:** [Known only; otherwise TBD.]

## 2. Existing Security Findings

| Finding | Source/path | Confidence | Risk/gap | Action |
|---|---|---|---|---|
| [Auth middleware exists] | `[path]` | Confirmed | [..] | Preserve/amend |

## 3. Assets, Data Classification & Ownership

| Asset/data | Classification | Owner/source of truth | Storage/transit | Access | Retention/deletion | Encryption/redaction |
|---|---|---|---|---|---|---|
| [..] | Public/Internal/Confidential/PII | [..] | [..] | [..] | [..] | [..] |

## 4. Actors, Roles & Trust Boundaries

### Actors

| Actor | Type | Goal/access | Trust level |
|---|---|---|---|
| [Guest/user/admin/service/third-party] | Human/service | [..] | [..] |

### Trust Boundaries

| Source | Destination | Boundary | Auth | Validation | Primary threat |
|---|---|---|---|---|---|
| [Browser] | [API] | Public → application | [..] | [..] | [..] |

## 5. Attack Surface Inventory

| Entry point | Input/output | Audience | Auth/authz | Validation/encoding | Rate limit | Relevant threat |
|---|---|---|---|---|---|---|
| [Endpoint/form/upload/webhook/queue] | [..] | [..] | [..] | [..] | [..] | [..] |

## 6. Threat Model & Abuse Cases

### Threat Index

| ID | Asset/entry point | Threat | Likelihood | Impact | Risk | Status |
|---|---|---|---|---|---|---|
| THR-001 | [..] | [..] | Low/Med/High | Low/Med/High | Low/Med/High | Open/Mitigated/Accepted |

### Individual Threat Records

```markdown
### THR-001 — [Title]

**Asset:** [..]
**Entry point:** [..]
**Threat actor:** [..]
**Attack path:** [..]
**Impact:** [..]
**Likelihood/Risk:** [..]

**Options**
A. [..]
  - Pros:
  - Cons:
  - Risk:
B. [..]
  - Pros:
  - Cons:
  - Risk:

**Recommendation:** [..]
**Why:** [..]
**User decision:** Accepted / Rejected / Modified / Deferred / TBD
**Controls:** [..]
**Residual risk:** [..]
**Verification:** [..]
```

## 7. Authentication Architecture

| Area | Decision | Boundary | Lifecycle | Verification |
|---|---|---|---|---|
| Login/identity | [Session/JWT/OAuth/SSO] | [..] | [Expiry/revoke/recovery] | [..] |

- Account recovery, lockout, MFA/re-auth, service identity, and logout policy.
- Do not select identity provider or token lifetime without user approval/context.

## 8. Authorization & Permission Matrix

| Resource/action | Guest | User | Admin | Service account | Ownership/tenant check | Audit |
|---|---:|---:|---:|---:|---|---|
| [View resource] | No | Yes | Yes | No | Required/Not applicable | [..] |

- Authorization enforcement point: [Gateway/middleware/service/resource].
- Denial behavior: [Safe error without resource-existence leak.]

## 9. Input, Output & API Security

| Boundary | Control | Injection/XSS/CSRF/SSRF/path/upload concern | Error behavior | Verification |
|---|---|---|---|---|
| Request body | [Schema validation] | [..] | [Safe message] | [..] |
| HTML/Markdown output | [Encoding/sanitization] | [XSS] | [..] | [..] |
| File upload | [Type/size/scan/storage] | [Malware/path] | [..] | [..] |
| Webhook/external API | [Signature/allowlist/timeout] | [Replay/SSRF] | [..] | [..] |

## 10. Session, Token, Secret & Configuration Security

### Session/Token

| Aspect | Policy | Verification |
|---|---|---|
| Storage | [httpOnly Secure SameSite cookie / alternative] | [..] |
| Expiry/refresh | [..] | [..] |
| Rotation/revocation | [..] | [..] |
| Replay/idempotency | [..] | [..] |

### Secret/Configuration

| Secret/config class | Storage/access | Rotation | Redaction | Owner |
|---|---|---|---|---|
| [API credential/config] | [Env/vault/secret manager] | [..] | [..] | [..] |

Never record secret values, sample production keys, or credentials in this document.

## 11. Privacy, Retention & Data Lifecycle

| Data class | Minimization/consent | Retention | Deletion/export | Access/audit |
|---|---|---|---|---|
| [PII/internal] | [..] | [..] | [..] | [..] |

- Data residency/legal/compliance: [Known requirement or TBD.]
- Log/backup lifecycle: [..]

## 12. Abuse Prevention, Availability & Recovery

| Threat | Prevent/detect | Limit/threshold | Recovery/fallback | Owner |
|---|---|---|---|---|
| Brute force/enumeration | [Rate limit/lockout] | [..] | [..] | [..] |
| DoS/resource exhaustion | [Quota/backpressure] | [..] | [..] | [..] |
| External dependency failure | [Timeout/retry/circuit] | [..] | [Queue/degrade] | [..] |
| Data loss/corruption | [Backup/validation] | [RPO/RTO or TBD] | [Restore] | [..] |

## 13. Logging, Audit & Incident Response

### Logging & Audit

| Event | Required fields | Redaction | Retention/access | Alert |
|---|---|---|---|---|
| Auth/admin/security action | Actor/action/resource/time/result/correlation ID | [..] | [..] | [..] |

### Incident Response

- **Severity/escalation:** [..]
- **Owner/on-call:** [..]
- **Containment/recovery:** [..]
- **Communication/evidence preservation:** [..]

## 14. Security Control Matrix

| Control | Threat/requirement | Implementation boundary | Owner | Verification/evidence |
|---|---|---|---|---|
| [Resource authorization] | THR-001 / FR-002 | [Middleware/service] | [..] | [Test/log] |

## 15. Security Decision Ledger (SDR)

| ID | Area | Options | Recommendation | User decision | Risk/impact |
|---|---|---|---|---|---|
| SDR-001 | [Authorization/session/etc.] | [..] | [..] | Accepted/Modified/Rejected/Deferred/TBD | [..] |

## 16. Security Verification Plan

| Control/threat | Test level | Scenario | Evidence | Release gate |
|---|---|---|---|---|
| THR-001 | Unit/Integration/E2E/Manual | [Unauthorized resource access] | [Test/report] | Required |

- SAST/DAST/dependency/secret scan: [Applicable tool/evidence or Not applicable].
- Exception review expiry: [..]

## 17. Security Acceptance Criteria

### SAC-001 — [Title]
- **Maps to:** [FR/AC/THR/Control].
- **Given** [context].
- **When** [attack/error/unauthorized action].
- **Then** [safe observable behavior].
- **And** [audit/evidence/recovery if relevant].

## 18. Exceptions, Risks, Assumptions & Open Questions

### Exceptions

| ID | Exception | Risk acceptance owner | Expiry/review | Mitigation |
|---|---|---|---|---|
| EX-001 | [..] | [..] | [..] | [..] |

### Risks/Assumptions/Open Questions

| ID | Type | Item | Blocking? | Owner/next action |
|---|---|---|---:|---|
| R-001 | Risk/Assumption/Question | [..] | Yes/No | [..] |

## 19. Traceability Matrix

| PRD requirement/AC | Threat | Control/SDR | Test/evidence | Status |
|---|---|---|---|---|
| FR-001 / AC-001 | THR-001 | SDR-001 | SAC-001/test | Covered |

## 20. Handoff & Approval

### Handoff to Testing
- Required security scenarios: [..]
- Required test evidence/release gates: [..]
- Residual risk and accepted exceptions: [..]
- Unresolved `TBD`: [..]

### Approval

| Role/name | Decision | Date | Notes |
|---|---|---|---|
| [Product/security/engineering] | Pending/Approved/Rejected | [YYYY-MM-DD] | [..] |

## 21. Security Readiness Checklist

- [ ] Existing security posture and cited findings reviewed.
- [ ] Assets/data classification, actors, trust boundaries, and attack surface mapped.
- [ ] Authn, authz, ownership/tenant isolation, session/token lifecycle reviewed.
- [ ] Input/output/API/upload/webhook attack surface reviewed.
- [ ] Secret/config/redaction and privacy/retention lifecycle reviewed.
- [ ] Abuse, availability, backup/restore, and recovery controls reviewed.
- [ ] Logging, audit, incident owner, and escalation defined.
- [ ] Threats have impact/likelihood/risk/control/residual risk/verification.
- [ ] Accepted/Modified controls have SDR and user decision.
- [ ] PRD/AC → threat → control → test traceability exists.
- [ ] No credential or secret value appears in document.
- [ ] Exceptions, assumptions, unresolved risk, approval, and testing handoff are recorded.
