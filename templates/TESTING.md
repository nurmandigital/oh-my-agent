# Testing Strategy: [Nama Sistem/Fitur]

## Metadata
- **Status:** Draft | Approved
- **Source docs:** `[PRD/Architecture/Design/Security paths]`
- **Owner/date:** [..]

## 1. Scope & Risks
- In scope, out of scope, highest-risk behavior, compatibility/regression areas.

## 2. Acceptance Criteria Matrix
| AC | Scenario | Level | Environment/data | Evidence |
|---|---|---|---|---|
| AC-001 | [..] | Unit/Integration/Contract/E2E/Manual | [..] | [..] |

## 3. Test Layers
- Unit, integration, contract, E2E, manual, security, performance/accessibility — include only relevant layers and rationale.

## 4. Scenarios
- Happy path.
- Error/failure path.
- Edge/boundary cases.
- Regression and backward compatibility.

## 5. Environment, Data & Isolation
- Fixtures/factories, mocks, external services, cleanup, deterministic clock/network, no production data unless explicitly approved.

## 6. Commands & CI
- `[Use commands verified in the project; otherwise TBD.]`

## 7. Coverage & Quality Gates
- Use project-agreed targets. Do not invent percentage targets; prioritize critical behavior and risk evidence.
- Exit gate: [tests/checks required before review/release].

## 8. Limitations & Ownership
- Untested areas, flaky risks, manual checks, owner, and follow-up.
