# Product Requirements Document (PRD): [Nama Fitur/Sistem]

> Gunakan bersama `workflows/prd-generation.md`. Isi hanya fakta/keputusan yang diketahui; tandai yang belum pasti sebagai `TBD — perlu konfirmasi`.

## 0. Document Control

| Field | Value |
|---|---|
| Status | Draft · In Review · Approved · Superseded |
| Owner | [Nama/role] |
| Stakeholders | [Nama/role] |
| Created | [YYYY-MM-DD] |
| Last updated | [YYYY-MM-DD] |
| Version | [0.1] |
| Source brief | [Link/path/ringkasan] |
| Related docs | [Architecture/Design/Security/Testing links bila ada] |

## 1. Executive Summary

- **Problem:** [Masalah utama yang ingin diselesaikan.]
- **Target outcome:** [Perubahan yang diharapkan setelah fitur tersedia.]
- **Primary user:** [Siapa pengguna utama.]
- **Why now:** [Alasan/prioritas; `TBD` bila belum diketahui.]

## 2. Context & Problem Discovery

### Current State
- **Current workflow:** [Bagaimana user/sistem bekerja saat ini.]
- **Pain points:** [Hambatan, error, biaya, delay, atau risiko yang terjadi.]
- **Existing workaround:** [Cara sementara yang dipakai saat ini, bila ada.]
- **Evidence:** [Feedback, issue, data, atau observasi; jangan mengarang angka.]

### Impact of Inaction
- [Apa akibat jika masalah tidak ditangani pada fase ini.]

## 3. Users, Stakeholders & Permissions

| Role | Goal | Environment/constraint | Permission/relevance |
|---|---|---|---|
| [Primary user] | [..] | [device/knowledge/accessibility need] | [..] |
| [Secondary user/admin] | [..] | [..] | [..] |

### Permission Matrix

| Action | Guest | User | Admin | Owner |
|---|---:|---:|---:|---:|
| [View] | [Yes/No] | [Yes/No] | [Yes/No] | [Yes/No] |
| [Create/update] | [Yes/No] | [Yes/No] | [Yes/No] | [Yes/No] |
| [Delete/export] | [Yes/No] | [Yes/No] | [Yes/No] | [Yes/No] |

## 4. Goals, Scope & Constraints

### Goals
- **G-001:** [Outcome spesifik.]
- **G-002:** [Outcome spesifik.]

### In Scope
- [..]

### Non-Goals / Out of Scope
- [..]

### Delivery Slices
- **MVP:** [Minimum behavior yang harus tersedia.]
- **Post-MVP:** [Ditunda setelah MVP.]
- **Future consideration:** [Ide yang belum menjadi komitmen.]

### Constraints & Dependencies
- **Constraint:** [Teknis/bisnis/legal/waktu yang benar-benar diketahui.]
- **Dependency:** [Sistem, tim, vendor, keputusan, atau data yang dibutuhkan.]

## 5. User Journeys & System States

### Journey: [Nama journey]
1. **Entry/trigger:** [..]
2. **User action:** [..]
3. **System response:** [..]
4. **Success outcome:** [..]
5. **Alternate/recovery path:** [..]

### State Matrix

| State | Trigger | Expected UI/system behavior | Recovery/evidence |
|---|---|---|---|
| Loading | [..] | [..] | [..] |
| Empty | [..] | [..] | [..] |
| Validation error | [..] | [..] | [..] |
| Permission denied | [..] | [..] | [..] |
| External failure/timeout | [..] | [..] | [..] |
| Success | [..] | [..] | [..] |

## 6. Requirements

### Functional Requirements

| ID | Requirement | Priority | Source/rationale |
|---|---|---|---|
| FR-001 | Sistem harus [behavior observable]. | Must | [Brief/user need] |
| FR-002 | [..] | Should/Could | [..] |

### Business Rules

| ID | Rule | Exception/edge case |
|---|---|---|
| BR-001 | [Aturan bisnis.] | [..] |

### Non-Functional Requirements

| ID | Category | Requirement | Verification approach |
|---|---|---|---|
| NFR-001 | Reliability/performance/compatibility | [..] | [..] |
| NFR-002 | Accessibility | [..] | [..] |

### Data Requirements

| ID | Entity/field | Required/validation | Sensitivity/retention | Source of truth |
|---|---|---|---|---|
| DATA-001 | [..] | [..] | [PII/internal/public + policy] | [..] |

### Integration Requirements (Conditional)

| ID | System/event | Contract expectation | Failure behavior | Owner |
|---|---|---|---|---|
| INT-001 | [..] | [..] | [timeout/retry/fallback] | [..] |

### Security, Privacy & Audit Requirements

| ID | Requirement | Risk addressed | Verification |
|---|---|---|---|
| SEC-001 | [Auth/authz/validation/redaction/audit need.] | [..] | [..] |

## 7. Acceptance Criteria

### AC-001 — [Behavior title]
- **Maps to:** `FR-001`[, `BR-001`].
- **Given** [starting context].
- **When** [user/system action].
- **Then** [observable result].
- **And** [validation, authorization, audit, or side effect if relevant].

### AC-002 — [Failure/edge behavior]
- **Maps to:** `FR-001`[, `NFR-001`].
- **Given** [context].
- **When** [invalid/boundary/failure condition].
- **Then** [safe, observable result and recovery].

> Tambahkan acceptance criteria untuk happy path, validation/error path, authorization, boundary case, dan integration failure bila relevan.

## 8. UX, Content & Accessibility (Conditional)

- **Design reference:** [Link `DESIGN.md`, mockup, atau `Tidak relevan`.]
- **Content/copy requirement:** [Label, empty/error/success copy, localization.]
- **Accessibility requirement:** [Keyboard, focus, semantic structure, contrast, screen reader, target size.]
- **Supported environments:** [Browser/device/network constraint bila diketahui.]

## 9. Measurement & Analytics

| Type | Metric/signal | Baseline | Target | Measurement method | Owner |
|---|---|---|---|---|---|
| Business/Product/Operational/Quality/Security | [Metric atau qualitative signal] | [nilai nyata/TBD] | [nilai nyata/TBD] | [..] | [..] |

> Jangan mengisi baseline, target, atau metric tanpa sumber. Bila belum tersedia, gunakan `TBD — perlu konfirmasi`.

## 10. Rollout & Operational Considerations (Conditional)

- **Release approach:** [Feature flag/staged rollout/full release/TBD.]
- **Backward compatibility:** [Impact pada user/API/data lama.]
- **Migration:** [Data/schema migration atau `Tidak relevan`.]
- **Monitoring:** [Health/usage/error signal + owner.]
- **Rollback trigger & behavior:** [Kapan dan bagaimana rollback dilakukan.]
- **Support/documentation impact:** [..]

## 11. Discovery Recommendations & Decisions

> Simpan rekomendasi agent terpisah dari keputusan user. Hanya keputusan `Accepted` menjadi requirement committed.

| ID | Area | Recommendation/option | Reason/trade-off | User decision | PRD impact |
|---|---|---|---|---|---|
| REC-001 | [Feature/rule/risk] | [..] | [..] | Accepted/Rejected/Deferred/TBD | [Section/requirement] |

## 12. Risks, Assumptions & Decisions

### Risks

| ID | Risk | Likelihood | Impact | Mitigation | Owner |
|---|---|---|---|---|---|
| R-001 | [..] | Low/Med/High | Low/Med/High | [..] | [..] |

### Assumptions
- **A-001:** [Asumsi yang belum tervalidasi.]

### Decision Log

| Date | Decision | Options considered | Reason | Owner |
|---|---|---|---|---|
| [YYYY-MM-DD] | [..] | [..] | [..] | [..] |

## 13. Open Questions

| ID | Question | Blocking? | Owner | Next action/due date |
|---|---|---:|---|---|
| Q-001 | [..] | Yes/No | [..] | [..] |

## 14. Traceability & Approval

### Traceability Matrix

| Requirement | Acceptance criteria | Planned task | Test/evidence |
|---|---|---|---|
| FR-001 | AC-001 | TBD — created in task planning | TBD — defined in testing plan |

### Approval

| Role/name | Decision | Date | Notes |
|---|---|---|---|
| [Product/stakeholder] | Pending/Approved/Rejected | [YYYY-MM-DD] | [..] |

## 15. PRD Readiness Checklist

- [ ] Problem can be understood without chat context.
- [ ] Users, roles, and permissions are clear.
- [ ] Scope, non-goals, MVP, constraints, and dependencies are explicit.
- [ ] Requirements have IDs and are observable.
- [ ] Main happy/error/empty/permission paths have acceptance criteria.
- [ ] Data, integration, security, privacy, accessibility, and operational impacts were reviewed.
- [ ] Metrics are sourced or marked TBD.
- [ ] Risks, assumptions, decisions, and open questions have owners.
- [ ] Handoff to architecture/testing/task planning is possible.
- [ ] Approval status is recorded; agent never self-approves.
