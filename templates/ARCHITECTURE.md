# Architecture Document: [Nama Sistem/Fitur]

> Gunakan bersama `workflows/architecture-generation.md`. Hanya keputusan yang disetujui user yang menjadi arsitektur final.

## 0. Document Control

| Field | Value |
|---|---|
| Status | Draft · In Review · Approved · Superseded |
| Architect | [Nama/role] |
| Source PRD | `[path]` |
| Approved by | [Nama/role/date] |
| Version | [0.1] |
| Handoff | [`next-phase-path`] |

## 1. Architecture Goals & Quality Attributes

- **Architecture goals:** [Goal utama arsitektur dari PRD.]
- **Quality-attribute priority (user-approved):**

| Rank | Attribute | Rationale |
|---:|---|---|
| 1 | [..] | [..] |
| 2 | [..] | [..] |
| 3 | [..] | [..] |

## 2. Context & Constraints

### Existing System (Pre-Flight)

- **Foundation:** Greenfield / Existing / Migration
- **Stack:** [Bahasa, framework, library, tooling yang ada.]
- **Existing patterns:** [Folder structure, module boundary, API pattern, DB pattern.]
- **Constraint:** [Platform, budget, team, time, compatibility, security, regulatory.]
- **Architecture decision driver:** [Apa yang mendorong pilihan arsitektur.]

### Architecture Constraints

| Constraint | Source | Impact |
|---|---|---|
| [..] | [PRD/team/regulation] | [..] |

## 3. System Boundaries & Context

```text
[Diagram teks atau link diagram]
```

| Actor/System | Relationship | Trust boundary | Notes |
|---|---|---|---|
| [..] | Inbound/outbound/dependency | Internal/External/Sensitive | [..] |

## 4. Components & Modules

### Component Decomposition

| Component | Responsibility | Key interface | Dependency |
|---|---|---|---|
| [..] | [..] | [..] | [..] |

### Module Boundaries

- **Core domain:** [Business logic utama.]
- **Integration layer:** [External API, message broker, file import/export.]
- **Infrastructure:** [DB, cache, blob storage, queue, scheduler, email.]
- **Presentation:** [API gateway, GraphQL server, CLI, scheduled job.]
- **Shared library:** [Utility/service dibagi antar-modul.]

## 5. Data Architecture

### Data Ownership & Source of Truth

| Entity/aggregate | Owner component | Storage | Sensitivity/retention |
|---|---|---|---|
| [..] | [..] | [..] | [PII/internal/public] |

### Data Model

- **Database type:** [Relational / Document / Key-value / Graph / Hybrid.]
- **Consistency model:** [Strong / Eventual.]
- **Concurrency model:** [Optimistic lock / Pessimistic lock / Queue / Event.]
- **Migration strategy:** [Expand-contract / Feature flag / Blue-green.]
- **Backup/Restore:** [Policy.]

### Data Flow

```
[Request] → [Validation] → [Business logic] → [Persistence] → [Response]
```

## 6. API & Integration Contracts

### API Architecture

| Endpoint/event | Method/pattern | Auth requirement | Idempotency | Rate limit |
|---|---|---|---|---|
| [..] | [REST/GraphQL/Event] | [..] | [Yes/No/Key] | [..] |

### Integration Flow

| Partner system | Contract ownership | Timeout/retry | Failure fallback | Monitoring |
|---|---|---|---|---|
| [..] | [Consumer/provider/schema registry] | [..] | [Degrade/circuit/queue] | [..] |

### Contract Versioning

- [Strategy: URL path, header, schema registry.]
- [Deprecation window.]
- [Breaking change policy.]

## 7. Security Architecture

### Trust Boundaries

| Boundary | Access control | Data classification | Audit |
|---|---|---|---|
| Public API | [Auth/rate] | Public | [..] |
| Internal service | [Network/token] | Internal | [..] |
| Sensitive data | [Encryption/redaction] | PII/Payment | [..] |

### Auth & Authorization

- **Auth strategy:** [Session/JWT/OAuth/SSO.]
- **Auth enforcement point:** [Gateway/Middleware/Service.]
- **Authorization model:** [RBAC/ABAC/Ownership-based.]
- **Token lifecycle:** [TTL, refresh, revocation.]

### Secret & Configuration Management

- **Secrets:** [Env-var-only / Vault / Secret manager.]
- **Config:** [12-factor env / Config server / Feature flag.]

## 8. Reliability & Concurrency

### Failure Modes

| Scenario | Detection | Recovery | Fallback |
|---|---|---|---|
| [DB unavailable] | [Health check] | [Retry/pool reconnect] | [Graceful degrade] |
| [External API timeout] | [Circuit breaker] | [Fallback/default] | [Queue for retry] |
| [High traffic] | [Rate limit/throttle] | [Queue/backpressure] | [503 + retry-after] |

### Concurrency Strategy

- [Optimistic/pessimistic lock, idempotency key, queue, or event sourcing.]

## 9. Observability

### Signals

| Type | Implementation | Key indicators | Alert |
|---|---|---|---|
| Logs | [Structured JSON, correlation ID] | [Error/access/audit] | [..] |
| Metrics | [RED: rate/error/duration] | [p99 latency, error %] | [..] |
| Traces | [Distributed tracing] | [Service dependency graph] | [..] |

### Health & Monitoring

- **Health check:** [Readiness, liveness, dependency status.]
- **Dashboards:** [Where, owner.]
- **On-call/alert escalation:** [How, who.]
- **SLO/SLI/SLA:** [Jika diketahui; bila tidak, `TBD — perlu konfirmasi`.]

## 10. Deployment Architecture

### Topology

| Environment | Runtime | Scaling | Backup | Access |
|---|---|---|---|---|
| Development | [..] | [..] | [..] | [..] |
| Staging | [..] | [..] | [..] | [..] |
| Production | [..] | [Multi-AZ/region atau TBD] | [..] | [..] |

### Deployment Pipeline

```
[Commit] → [Build] → [Test/Lint/Typecheck] → [Package] → [Deploy Staging] → [Smoke Test] → [Approve] → [Deploy Production]
```

### Rollout & Rollback

- **Rollout strategy:** [Blue-green / Rolling / Canary / Feature flag.]
- **Migration:** [Expand-contract window, backward compatibility period.]
- **Rollback trigger:** [Error rate spike, health check failure, manual decision.]
- **Rollback steps:** [Revert deploy, restore DB backup, toggle feature flag.]
- **Zero-downtime:** [Capability dan gap.]

## 11. Architecture Decision Ledger (ADR)

### ADR Index

| ID | Area | Options | Recommendation | User decision | Consequence |
|---|---|---|---|---|---|
| ADR-001 | System shape | Monolith/Microservices/Modular | Modular monolith | Accepted | Single deployable |
| ADR-002 | [..] | [..] | [..] | Accepted/Rejected/Deferred | [..] |

### Individual ADRs

```markdown
### ADR-001 — [Judul]

**Requirement terkait:** [FR-001, NFR-002]

**Options**
A. [Opsi A]
  - Pros:
  - Cons:
  - Risk:
B. [Opsi B]
  - Pros:
  - Cons:
  - Risk:

**Recommendation:** [..]

**Why:** [Alasan berbasis quality attributes dan konteks.]

**User decision:** Accepted / Rejected / Modified / Deferred / TBD

**Consequences:** [Dampak.]
```

## 12. Migration, Compatibility & Rollback Plan

- **Data migration:** [Expand-contract sequence, backward compatibility, down migration script bila relevan.]
- **Breaking changes:** [List, impact, compatibility window, communication plan.]
- **Rollback:** [Trigger, owner, steps, data recovery, verification.]
- **Technical debt:** [Yang sengaja diterima, jangka waktu, rencana pelunasan.]

## 13. Traceability Matrix

| PRD requirement/AC | Architecture decision | Architecture section | Status |
|---|---|---|---|
| FR-001 | ADR-001 | Component | Covered |
| NFR-001 | ADR-003 | Reliability | Covered |
| AC-001 | ADR-005 | API contract | Covered |

## 14. Risks, Assumptions & Open Questions

### Risks

| ID | Risk | Impact | Mitigation | Owner |
|---|---|---|---|---|
| R-001 | [..] | [..] | [..] | [..] |

### Assumptions

- **A-001:** [Asumsi yang belum tervalidasi.]

### Open Questions

| ID | Question | Blocking architecture? | Owner/next action |
|---:|---|:---:|---|
| Q-001 | [..] | Yes/No | [..] |

## 15. Architecture Readiness Checklist

- [ ] PRD AC, goals, constraints, dan dependency tercakup.
- [ ] Quality attributes sudah diprioritaskan user.
- [ ] Existing system sudah di-scan; perubahan dijustifikasi.
- [ ] System boundaries, components, data model, dan contract terdokumentasi.
- [ ] Trust boundary, auth, secret, error boundary, dan reliability strategy jelas.
- [ ] Integration failure, circuit breaker, dan fallback terdokumentasi.
- [ ] Observability, monitoring, alert, CI/CD, deployment, migration, dan rollback tercakup.
- [ ] Setiap keputusan punya ADR dengan opsi, recommendation, rationale, user decision, dan consequence.
- [ ] Tidak ada dependency/stack/cloud/provider/SLA yang diarang.
- [ ] Risks, assumptions, open questions, dan unresolved items tercatat.
- [ ] Traceability matrix: PRD requirement/AC → ADR → Architecture section.
- [ ] Approval tercatat; agent tidak self-approve.
