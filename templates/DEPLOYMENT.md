# Deployment Plan: [Nama Sistem/Fitur]

## Metadata
- **Release/version:** [..]
- **Owner/approver:** [..]
- **Source change/PR:** [..]

## 1. Environments & Artifact
| Environment | Purpose | Artifact/config reference | Owner |
|---|---|---|---|
| Development/Staging/Production | [..] | [No secret values] | [..] |

## 2. Preconditions
- [ ] Approved change, test evidence, security/review gates, backup, and maintenance/approval requirements.

## 3. Configuration & Secrets
- Required variable/secret names, owner, storage location, and validation method. Never record secret values.

## 4. Rollout Plan
1. [Build/package artifact using verified project command.]
2. [Deploy sequence/canary/feature flag/migration as applicable.]
3. [Health check and functional verification.]

## 5. Data Migration
- Preconditions, expand/contract sequence, compatibility, backup, validation, and rollback. Or `Not applicable`.

## 6. Monitoring & Verification
- Health signals, logs/metrics/alerts, acceptance checks, observation window, and owner.

## 7. Rollback Plan
- Trigger, decision owner, rollback steps, data recovery, communication, and verification.

## 8. Post-Deployment
- Release notes, monitoring handoff, cleanup, follow-up, and incident link if needed.
