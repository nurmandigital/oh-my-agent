# Security Plan: [Nama Sistem/Fitur]

## Metadata
- **Status:** Draft | Approved
- **Source PRD/Architecture:** `[paths]`
- **Risk owner/date:** [..]

## 1. Assets, Actors & Trust Boundaries
| Asset/data | Actor | Sensitivity | Boundary/owner |
|---|---|---|---|
| [..] | [..] | [..] | [..] |

## 2. Threats & Abuse Cases
| ID | Threat/scenario | Likelihood/impact | Control | Residual risk |
|---|---|---|---|---|
| SEC-001 | [..] | [..] | [..] | [..] |

## 3. Controls
- **Input/output:** validation, encoding, sanitization, safe error response.
- **Auth:** authentication, authorization/resource ownership, session/token policy.
- **Secrets/privacy:** environment/secret manager, redaction, retention, deletion, encryption.
- **Dependencies/network:** least privilege, allowlist, timeout, SSRF/path traversal controls.
- **Abuse/availability:** rate limits, quotas, replay/idempotency, backup/recovery.
- **Logging/response:** audit events, PII redaction, alert owner, incident steps.

## 4. Verification
| Control | Test/check | Evidence/owner |
|---|---|---|
| [..] | [..] | [..] |

## 5. Open Questions & Exceptions
- [..]

## 6. Security Acceptance Criteria
- [ ] [Observable security condition]
