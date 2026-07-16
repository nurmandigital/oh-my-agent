---
name: architecture-generation
title: Architecture Generation
order: 3
phase: Architect
usage: Use after PRD
condition: Recommended
output: templates/ARCHITECTURE.md
next: workflows/design-generation.md
---

# Architecture Generation Workflow

## Goal
Mengubah PRD yang disetujui menjadi keputusan arsitektur yang dapat diverifikasi. Agent bertindak sebagai **solution architect partner**: menemukan kebutuhan teknis dari PRD, menawarkan opsi, menjelaskan trade-off, merekomendasikan pilihan, dan mencatat keputusan user. Agent tidak langsung memilih stack/pattern atau mengarang asumsi.

## Boundary
- Workflow ini **menghasilkan keputusan arsitektur**, bukan kode, implementasi, atau deployment.
- Agent wajib membedakan **fakta**, **rekomendasi**, **keputusan**, **asumsi**, dan **TBD**.
- Agent dilarang mengarang traffic, SLA, budget, team capacity, cloud provider, stack, atau dependency tanpa bukti.
- Agent tidak boleh mengganti stack existing hanya karena preferensi pribadi; perubahan wajib dijustifikasi.
- Unknown → `TBD — perlu konfirmasi`; jangan menganggap default.
- Agent tidak boleh menandai `Approved` tanpa approval user.

## Input
- Wajib: PRD approved + acceptance criteria.
- Bila tersedia: existing system structure, stack, dependency, config, DB, API, deployment, dan constraint.

## Architecture Discovery Stance

```text
Agent reads PRD + scans existing system
→ discovers technical decisions needed
→ offers realistic options with trade-offs
→ recommends with clear reasoning
→ user decides
→ agent records decisions as ADR
→ architecture document is generated
```

### Pre-Flight: Existing System Scan

Sebelum bertanya:

1. Baca PRD, AC, constraint, dependency.
2. Scan existing project: file structure, stack, dependency, DB schema, API patterns, deployment, config, test setup.
3. Klasifikasikan:
   - **Greenfield**: tidak ada sistem existing.
   - **Existing**: perubahan/modifikasi bertahap.
   - **Migration/refactor**: sistem existing berubah signifikan.
4. Untuk existing/migration, kutip file/path temuan; jangan mengarang.
5. Pertahankan arsitektur existing kecuali ada alasan kuat mengubahnya.

### Progressive Discovery Batches

Gunakan urutan adaptif. Lewati yang sudah terjawab. Setiap batch maksimal 3–7 pertanyaan.

#### Batch 1 — Context & Constraints
- Greenfield, existing, atau migration?
- Target platform/runtime/environment?
- Expected users, traffic pattern, data volume, concurrency, uptime requirement?
- Team size, capability, dan constraint waktu/budget/hosting?
- Deadline atau operational requirement yang diketahui?

#### Batch 2 — Quality-Attribute Prioritization
Agent menyusun prioritas trade-off. Tidak semua bisa maksimal.

```text
Quality attributes yang perlu dipertimbangkan:
1. Simplicity (mudah dipahami dan diubah)
2. Delivery speed (cepat dirilis)
3. Maintainability (mudah dirawat jangka panjang)
4. Security (risiko data/akses terkontrol)
5. Reliability (error/failure minimal)
6. Performance (cepat dan efisien)
7. Scalability (mendukung pertumbuhan)
8. Availability (waktu hidup tinggi)
9. Cost (anggaran operasional)
10. Portability (tidak terikat platform tertentu)

Rekomendasi untuk MVP:
1. Simplicity
2. Maintainability
3. Security
4. Reliability
5. Performance

Apakah urutan prioritas ini sesuai untuk proyek Anda? Atau ada yang lebih penting?
```

#### Batch 3 — System Shape & Application Structure
Agent menawarkan opsi relevan. Contoh:

```text
Temuan: Sistem inventory — satu bisnis, satu tim kecil, scope jelas.

Opsi arsitektur aplikasi:
A. Modular monolith
  - Pros: deployment sederhana, transaction mudah, debugging langsung.
  - Cons: tidak bisa menskalakan komponen secara independen.
  - Risk: perlu disiplin modular boundary agar tidak jadi big ball of mud.
B. Microservices
  - Pros: isolation tinggi, scaling independen, deployment terpisah.
  - Cons: operational complexity tinggi, butuh observability/infra, transaction tersebar.
  - Risk: overhead infrastruktur dan tim untuk scope saat ini.

Rekomendasi: Modular monolith.
Alasan: Scope belum membutuhkan independent scaling/deployment. Tim kecil. MVP bisa dirilis lebih cepat.

Keputusan: A / B / opsi lain? Setuju dengan rekomendasi atau ada preferensi berbeda?
```

#### Batch 4 — Data Architecture
- Database type: relational, document, key-value, graph, atau hybrid?
- Source of truth dan data ownership.
- Entity/aggregate boundary.
- Transaction consistency: strong atau eventual?
- Concurrency: optimistic/pessimistic lock, queue, atau event?
- Retention, archival, deletion policy.
- Migration strategy: expand-contract, blue-green, atau feature flag?
- Search, reporting, dan analytics needs.

#### Batch 5 — API, Integration & Contracts
- API style: REST, GraphQL, RPC, event, atau hybrid?
- Sync/async boundary.
- Contract versioning: URL, header, atau schema registry?
- Idempotency strategy.
- Timeout/retry/circuit breaker.
- Rate limiting dan throttling.
- External dependency failure fallback: degrade gracefully atau block?
- Event/message schema ownership.

#### Batch 6 — Security, Trust Boundaries & Reliability
- Auth boundary: monolithic session, JWT, OAuth, atau SSO?
- Authorization placement: gateway, middleware, service, atau resource-level?
- Trust boundary: internal vs external service, data classification.
- Secret/config management: env var, vault, atau secret manager?
- Error boundary: global handler, domain error, atau panic recovery.
- Availability: single-instance, multi-AZ, atau multi-region?
- Recovery: restart, retry queue, backup/restore, atau manual?
- Audit logging: structured, searchable, PII-redacted.

#### Batch 7 — Observability & Operations
- Logging: structured, correlation ID, sampling, level policy.
- Metrics: RED (rate/error/duration), business KPI, custom metric.
- Tracing: distributed trace untuk request flow lintas service.
- Health check: readiness, liveness, dependency check.
- Monitoring dan alerting: tools, threshold, on-call rotation.
- CI/CD pipeline: test → lint → typecheck → build → deploy.
- Rollback strategy: feature flag, version pin, blue-green, canary, atau rollback commit.

#### Batch 8 — Deployment, Migration & Rollback
- Runtime: serverless, container, VM, atau PaaS?
- Environments: dev/staging/production; approval gates.
- Deployment topology: single-region, multi-region, atau hybrid.
- Data migration: expand-contract, backward-compatible window, rollback sequence.
- Schema migration: reversible, tested, ownership, dan validation.
- Zero-downtime requirement: blue-green, rolling update, atau canary.
- Rollback trigger: monitoring signal, manual decision, atau automatic?
- Post-deployment verification: health check, smoke test, canary analysis.

#### Batch 9 — Review, Approval & Handoff
- Ringkas semua keputusan arsitektur.
- Tampilkan unresolved items dan dampaknya.
- Periksa mapping: setiap PRD requirement/AC harus ter-address.
- Minta approval user sebelum finalisasi.
- Setelah approved, handoff ke `workflows/design-generation.md` (jika ada UI) atau `workflows/security-planning.md`.

### Decision Format (ADR)

Setiap keputusan teknis menggunakan format berikut:

```markdown
### ADR-001 — [Judul Keputusan]

**Requirement terkait:** FR-001, NFR-002

**Options**
A. [Opsi A]
  - Pros: [..]
  - Cons: [..]
  - Risk: [..]
B. [Opsi B]
  - Pros: [..]
  - Cons: [..]
  - Risk: [..]

**Recommendation:** [Opsi A/B atau custom]

**Why:** [Alasan berbasis trade-off dan konteks proyek]

**User decision:** Accepted / Rejected / Modified / Deferred / TBD

**Consequences:** [Dampak terhadap code, testing, deployment, migration]
```

### Architecture Decision Ledger

Simpan semua keputusan dalam tabel:

| ID | Area | Options considered | Recommendation | User decision | Consequence |
|---|---|---|---|---|---|
| ADR-001 | System shape | Monolith/Microservices | Modular monolith | Accepted | Single deployable |

Hanya keputusan **Accepted** atau **Modified** yang masuk architecture final. **Rejected** dicatat dengan alasan. **Deferred** ditunda ke fase berikutnya. **TBD** masuk open questions.

## 20-Phase Process

| Phase | Action |
|---:|---|
| 1 | Validate input (PRD approved, AC tersedia) |
| 2 | Extract architecture-relevant requirement dari PRD |
| 3 | Existing-system pre-flight scan |
| 4 | Constraint discovery (Batch 1) |
| 5 | Quality-attribute prioritization (Batch 2) |
| 6 | System-boundary discovery (Batch 3) |
| 7 | Component/module decomposition |
| 8 | Data architecture decisions (Batch 4) |
| 9 | API/event architecture decisions (Batch 5) |
| 10 | Integration/failure strategy |
| 11 | Security/trust boundaries (Batch 6) |
| 12 | Reliability/concurrency decisions |
| 13 | Observability/operations (Batch 7) |
| 14 | Deployment/migration/rollback (Batch 8) |
| 15 | Option comparison and ADR confirmation |
| 16 | Decision confirmation (Batch 9) |
| 17 | Architecture draft using `templates/ARCHITECTURE.md` |
| 18 | Traceability review: PRD → ADR → Architecture |
| 19 | Risk/open-question review |
| 20 | User approval + handoff to next phase |

## Output
- File `architecture-[feature].md` di direktori dokumentasi proyek yang disepakati.
- Struktur resmi: `templates/ARCHITECTURE.md`.
- Architecture Decision Ledger (ADR) inline.
- Handoff berikutnya: `workflows/design-generation.md` (bila ada UI) atau `workflows/security-planning.md`.

## Exit Checklist

- [ ] PRD requirement/AC mapping ke architecture decisions.
- [ ] Existing system sudah di-scan; perubahan dijustifikasi.
- [ ] Setiap keputusan punya ADR dengan opsi, rekomendasi, dan keputusan user.
- [ ] Tidak ada stack/dependency/cloud/DB yang diasumsikan tanpa persetujuan.
- [ ] Tidak ada traffic/SLA/budget/team capacity yang diarang.
- [ ] Semua trust boundary, data flow, API contract, error boundary, dan security/privacy concern tercakup.
- [ ] Migration, compatibility, dan rollback strategy terdokumentasi bila relevan.
- [ ] Risks, assumptions, open questions, dan unresolved items tercatat.
- [ ] Traceability matrix: PRD → ADR → Architecture section.
- [ ] Stakeholder approval tercatat.
