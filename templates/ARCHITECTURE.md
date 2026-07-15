# Architecture Document: [Nama Sistem/Fitur]

## Metadata
- **Status:** Draft | Approved
- **Source PRD:** `[path]`
- **Owner/date:** [..]

## 1. Context & Constraints
- Requirement/acceptance criteria yang memengaruhi arsitektur.
- Existing stack, runtime, compatibility, scale, dan operational constraints.

## 2. System Boundaries
- Actor, module/service, external dependency, ownership, dan trust boundary.

```text
[Diagram teks atau link diagram]
```

## 3. Components & Responsibilities
| Component | Responsibility | Interface/Dependency |
|---|---|---|
| [..] | [..] | [..] |

## 4. Data & Control Flow
1. [Request/event flow]
2. [Validation/business/storage/response flow]

## 5. Contracts
- API/event/schema, errors, idempotency, versioning, dan compatibility.

## 6. Data Model & Storage
- Entity/schema, ownership, retention, migration, index, consistency, dan backup bila relevan.

## 7. Reliability, Security & Observability
- Failure modes, retries/timeouts, logs/metrics/traces, auth boundaries; refer `SECURITY.md` bila tersedia.

## 8. Decisions & Trade-offs
| Decision | Alternatives | Reason | Consequence |
|---|---|---|---|
| [..] | [..] | [..] | [..] |

## 9. Migration & Rollback
- [Sequence, compatibility window, rollback trigger/steps, atau `Tidak relevan`.]

## 10. Risks & Open Questions
- [..]
