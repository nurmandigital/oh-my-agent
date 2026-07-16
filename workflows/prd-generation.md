---
name: prd-generation
title: PRD Generation
order: 2
phase: Define
usage: Copy first
condition: Always
output: templates/PRD.md
next: workflows/architecture-generation.md
---

# PRD Generation Workflow

## Goal
Mengubah brief kebutuhan sistem/fitur menjadi PRD yang rinci, dapat ditindaklanjuti, testable, dan disetujui. PRD menjadi source of truth untuk architecture, design, security, testing, dan task planning.

## Boundary
- Workflow ini **menghasilkan requirement**, bukan kode, schema final, desain final, atau deployment plan.
- Agent wajib membedakan **fakta**, **keputusan**, **asumsi**, dan **TBD**.
- Agent dilarang mengarang metric, baseline, target, user, stakeholder, deadline, budget, dependency, atau approval.
- Jika data belum ada, tulis `TBD — perlu konfirmasi`, tentukan owner/next action bila diketahui.
- Agent tidak boleh menandai PRD `Approved` tanpa approval user/stakeholder.

## Input
- Brief/problem statement/feature request.
- Konteks bisnis atau produk yang tersedia.
- Existing docs, issue, feedback, constraints, dan system context bila ada.

## Product Discovery Stance

Agent bertindak sebagai **product discovery partner**, bukan pencatat pasif. User tidak harus sudah mengetahui seluruh fitur, role, rule, edge case, atau kebutuhan operasional sejak awal.

Prinsip kerja:

```text
Agent discovers → agent recommends → user decides → PRD records
```

Agent wajib:

- Menggali kebutuhan yang belum terpikirkan berdasarkan problem, domain, user journey, dan risiko.
- Menjelaskan kenapa suatu fitur/rule perlu dipertimbangkan sebelum meminta keputusan.
- Menawarkan opsi beserta trade-off, bukan pertanyaan kosong seperti “fiturnya apa saja?”.
- Membedakan rekomendasi agent dari keputusan user.
- Meminta konfirmasi sebelum rekomendasi menjadi requirement.
- Menantang requirement yang bertentangan dengan goal, scope, security, usability, atau constraint.
- Menyederhanakan scope; jangan mendorong semua ide masuk MVP.

Agent dilarang:

- Menganggap fitur umum sebagai kebutuhan pasti hanya karena lazim di produk sejenis.
- Mengubah rekomendasi menjadi requirement tanpa keputusan user.
- Membanjiri user dengan seluruh question bank sekaligus.
- Menggunakan istilah teknis tanpa menjelaskan dampaknya bagi produk/user.

## Interaction Contract

1. Mulai dengan ringkasan pemahaman singkat: problem, user, desired outcome, fakta, dan unknown.
2. Ajukan satu batch pertanyaan paling relevan, maksimal 3–7 pertanyaan per giliran.
3. Untuk area yang mungkin belum dipikirkan user, gunakan format:
   - **Temuan:** konteks/potensi gap.
   - **Rekomendasi:** opsi yang disarankan + alasan.
   - **Keputusan:** pertanyaan spesifik yang perlu dijawab user.
4. Gunakan pilihan jawaban hanya bila pilihan memang valid; selalu izinkan jawaban bebas atau `TBD`.
5. Setelah jawaban diterima:
   - ringkas keputusan,
   - catat rekomendasi yang diterima/ditolak/ditunda,
   - jelaskan dampaknya,
   - lanjut ke batch berikutnya hanya jika masih diperlukan.
6. Jangan mengulang pertanyaan yang sudah terjawab kecuali jawaban baru menimbulkan konflik.
7. Jika user tidak tahu, tawarkan default/rekomendasi yang masuk akal beserta risiko; tetap minta persetujuan.
8. Jika user meminta langsung draft, buat draft dengan asumsi berlabel dan daftar readiness gaps; jangan diam-diam mengisi unknown.
9. Sebelum menyatakan ready, tampilkan unresolved decisions dan dampaknya terhadap architecture/testing/task planning.

## Progressive Discovery Batches

Gunakan urutan ini secara adaptif. Lewati pertanyaan yang sudah terjawab atau tidak relevan.

### Batch 1 — Problem, User & Outcome

Gali:

- Siapa mengalami masalah, seberapa sering, dan dalam konteks apa?
- Bagaimana proses berjalan sekarang?
- Apa pain point, workaround, dan impact of inaction?
- Outcome apa yang dianggap berhasil?
- Mengapa kebutuhan ini penting sekarang?

### Batch 2 — Feature Discovery & MVP

Berdasarkan jawaban Batch 1, agent menyusun **candidate capabilities**, bukan requirement final.

Contoh respons:

```text
Berdasarkan alur inventory yang dijelaskan, kandidat capability:
1. Katalog barang — dibutuhkan agar stok punya identitas konsisten.
2. Stok masuk/keluar — dibutuhkan untuk mencatat perubahan kuantitas.
3. Audit mutasi — direkomendasikan karena beberapa role dapat mengubah stok.
4. Peringatan stok minimum — berguna, tetapi bisa ditunda setelah MVP.

Rekomendasi MVP: 1–3. Apakah disetujui, diubah, atau ada yang dihapus?
```

Untuk setiap candidate capability, catat:

- Problem/user journey yang didukung.
- Nilai/manfaat.
- Dependency/risk utama.
- Rekomendasi priority: Must/Should/Could/Won't.
- Keputusan user: Accepted/Rejected/Deferred/TBD.

### Batch 3 — Workflow, Rules & Exceptions

Gali:

- Trigger, actor, langkah, output, dan handoff.
- Siapa boleh melihat/membuat/mengubah/menghapus/menyetujui?
- Validasi, uniqueness, limit, expiry, calculation, dan state transition.
- Apa yang terjadi jika input salah, duplikat, dibatalkan, atau diproses ulang?
- Apakah destructive/irreversible action perlu confirmation atau approval?

### Batch 4 — Data, Roles & Integrations

Gali:

- Data apa yang masuk, dihasilkan, ditampilkan, dicari, diekspor, dan disimpan?
- Mana yang sensitif/PII; siapa owner dan source of truth?
- Role dan permission matrix.
- Existing system, API, file import/export, notification, payment, email, atau vendor.
- Perilaku saat dependency timeout, gagal, duplicate, atau unavailable.

### Batch 5 — Forgotten States & Quality Risks

Secara proaktif periksa:

- Loading, empty, validation error, permission denied, timeout/offline, partial success, retry, cancel/back.
- Search, filter, sort, pagination, bulk action, import/export bila skala/alur membutuhkannya.
- Audit trail, notification, retention/deletion, privacy, rate abuse, accessibility, localization.
- Performance, reliability, compatibility, migration, monitoring, support, dan rollback.

Agent hanya mengangkat item yang relevan dan menjelaskan alasannya.

### Batch 6 — Prioritization & Gap Review

- Kelompokkan capability: Must/Should/Could/Won't.
- Pisahkan MVP, post-MVP, future consideration, dan explicit non-goals.
- Tampilkan keputusan yang masih blocking dan non-blocking.
- Verifikasi tidak ada requirement tanpa user/problem/outcome yang jelas.
- Minta persetujuan scope sebelum menyusun draft final.

## Recommendation & Decision Ledger

Pertahankan ledger selama discovery agar rekomendasi agent tidak tercampur dengan keputusan user:

| ID | Area | Recommendation/option | Reason/trade-off | User decision | PRD impact |
|---|---|---|---|---|---|
| REC-001 | [Feature/rule/risk] | [..] | [..] | Accepted/Rejected/Deferred/TBD | [Section/requirement] |

Rules:

- Hanya `Accepted` yang boleh menjadi requirement committed.
- `Deferred` masuk post-MVP/future consideration.
- `Rejected` tidak dimasukkan sebagai fitur; catat sebagai decision/non-goal bila penting mencegah pengulangan.
- `TBD` masuk open questions dengan owner/next action.

## Domain-Aware Question Generation

Agent membuat pertanyaan dari domain dan risiko, bukan checklist generik. Contoh pemicu:

- **Auth/account:** registration, identity verification, session, recovery, role, lockout, account deletion.
- **Inventory/order:** SKU/identity, stock movement, negative stock, reservation, adjustment reason, audit, concurrency.
- **Payment:** amount/currency, idempotency, pending/failed/refund, reconciliation, webhook, fraud, audit.
- **Content/admin:** draft/publish, moderation, ownership, revision history, scheduling, deletion.
- **Notification:** channel, trigger, preference, retry, duplicate prevention, opt-out.
- **Reporting/analytics:** source of truth, freshness, filter, timezone, export, access, metric definition.
- **AI-assisted feature:** model input/output boundary, hallucination/fallback, human review, privacy, cost/rate limit.

Gunakan contoh ini sebagai pemicu berpikir, bukan daftar fitur wajib.

## 15-Phase Process

### Phase 1 — Intake Brief
- Ambil nama fitur/sistem, tujuan awal, problem, target user, dan desired outcome.
- Pisahkan fakta yang user berikan dari interpretasi agent.
- Output internal: brief summary + daftar informasi yang belum diketahui.

### Phase 2 — Context & Problem Discovery
- Pahami current workflow, pain point, existing workaround, impact of inaction, dan why now.
- Minta evidence bila klaim membutuhkan bukti.
- Jangan mengubah symptom menjadi root cause tanpa konfirmasi.

### Phase 3 — Stakeholder & User Mapping
- Identifikasi primary user, secondary user, admin/operator, approver, owner, dan pihak terdampak.
- Catat environment, device, technical familiarity, accessibility need, dan permission context.
- Buat permission matrix awal bila fitur menyentuh akses/resource.

### Phase 4 — Scope Definition
- Pisahkan goals, in scope, non-goals, MVP, post-MVP, dan future consideration.
- Catat constraint, dependency, compatibility concern, dan hal yang sengaja tidak diputuskan.
- Deteksi scope creep sebelum menulis requirement.

### Phase 5 — User Journey Mapping
- Tulis entry point, trigger, user action, system response, success outcome, alternate path, dan recovery path.
- Cover happy path, empty state, loading, validation error, permission denied, timeout/offline, cancel/back, dan retry bila relevan.

### Phase 6 — Requirement Extraction
- Turunkan kebutuhan menjadi requirement bernomor:
  - `FR-*` functional requirement.
  - `BR-*` business rule.
  - `NFR-*` non-functional requirement.
  - `DATA-*` data requirement.
  - `INT-*` integration requirement.
  - `SEC-*` security/privacy/audit requirement.
- Setiap requirement harus observable dan memiliki priority/rationale.

### Phase 7 — Business Rules
- Identifikasi rule, role restriction, state transition, calculation, uniqueness, limit, expiry, approval, dan exception.
- Jangan menetapkan policy bisnis yang belum diputuskan; jadikan open question.

### Phase 8 — Data & Integration Discovery
- Identifikasi entity/field, required/optional, validation, source of truth, sensitivity, retention, dan ownership.
- Untuk integrasi, catat system/event, contract expectation, authentication boundary, timeout/retry/fallback, rate limit, dan failure behavior.
- Jangan mendesain schema atau API final; itu handoff ke architecture phase.

### Phase 9 — Security, Privacy, Accessibility & Operations
- Tandai kebutuhan auth/authz, input validation, secret handling, PII, audit, retention, abuse prevention, dan safe errors.
- Untuk UI, tandai keyboard, focus, semantic structure, contrast, localization, responsive behavior, dan screen-reader needs.
- Catat logging, monitoring, support, reliability, performance, dan compatibility concern bila relevan.

### Phase 10 — Acceptance Criteria
- Buat criteria dengan format Given/When/Then.
- Map setiap criteria ke requirement ID.
- Cover happy path, validation/error, authorization, boundary, integration failure, dan recovery bila relevan.
- Criteria harus observable: implementer/tester bisa menentukan pass atau fail tanpa menebak.

### Phase 11 — Risks, Assumptions & Decisions
- Catat risk dengan likelihood, impact, mitigation, owner.
- Catat assumption yang belum tervalidasi.
- Catat decision log: opsi, keputusan, alasan, owner, dan tanggal.
- Bedakan risk dari open question.

### Phase 12 — Metrics & Measurement Validation
- Identifikasi business, product, operational, quality, dan security signal yang benar-benar dibutuhkan.
- Untuk setiap metric, minta baseline, target, measurement method, source, dan owner.
- Jika belum tersedia, gunakan `TBD — perlu konfirmasi`; jangan membuat angka contoh seolah fakta.

### Phase 13 — Rollout & Operational Considerations
- Bahas rollout, feature flag, migration, backward compatibility, monitoring, rollback trigger/behavior, support, dan documentation impact bila relevan.
- Untuk fitur tanpa release/operation impact, tulis `Tidak relevan` beserta alasan singkat.

### Phase 14 — Draft PRD & Completeness Review
- Isi `templates/PRD.md` secara lengkap, hapus section conditional yang tidak relevan hanya setelah memberi alasan.
- Validasi ID unik, cross-reference, scope, acceptance mapping, TBD ownership, dan tidak ada placeholder ambigu yang tertinggal.
- Tampilkan ringkasan: goals, scope, requirement count, AC count, risks, open questions, dan readiness gaps.

### Phase 15 — Stakeholder Review & Approval
- Minta user/stakeholder memeriksa problem, scope, requirement, priority, AC, risiko, metric, dan open questions.
- Revisi berdasarkan feedback; simpan decision log.
- Set status `Approved` hanya setelah approval eksplisit.
- Setelah approved, handoff ke `workflows/architecture-generation.md`; jangan langsung implementasi.

## Output
- File `prd-[feature-name].md` di direktori dokumentasi proyek yang disepakati.
- Struktur resmi: `templates/PRD.md`.
- Handoff berikutnya: `workflows/architecture-generation.md`.

## PRD Readiness Gate

PRD siap di-handoff hanya jika:

- [ ] Problem dan target outcome dipahami tanpa konteks chat.
- [ ] Users, stakeholders, roles, dan permission context jelas.
- [ ] Goals, scope, non-goals, MVP, constraints, dan dependencies eksplisit.
- [ ] Journey dan relevant states tercakup.
- [ ] Requirement IDs unik dan dapat diverifikasi.
- [ ] Happy/error/empty/permission/boundary/integration paths memiliki AC bila relevan.
- [ ] Data, integration, security/privacy, accessibility, dan operations ditinjau.
- [ ] Metric bersumber atau ditandai TBD.
- [ ] Risks, assumptions, decisions, open questions memiliki owner/next action.
- [ ] Traceability ke task/test sudah disiapkan.
- [ ] Stakeholder approval tercatat.

## Handoff Notes
Serahkan ke fase berikutnya:

- Path PRD dan version/status.
- Requirement + acceptance criteria IDs.
- Constraint/dependency.
- Open questions yang belum blocking atau keputusan yang ditunda.
- Risk/security/data/integration flags.
- Explicit instruction: **jangan menganggap TBD sebagai keputusan final**.
