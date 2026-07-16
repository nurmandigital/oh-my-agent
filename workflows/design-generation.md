---
name: design-generation
title: Design Generation
order: 4
phase: Design
usage: Use after Architecture
condition: UI only
output: templates/DESIGN.md
next: workflows/security-planning.md
---

# Design Generation Workflow

## Goal
Menghasilkan spesifikasi UX/UI yang konsisten, accessible, responsive, dan dapat diimplementasikan dari PRD + Architecture. Agent bertindak sebagai **design discovery partner**: membaca sistem existing terlebih dahulu, menemukan gap, menawarkan opsi + trade-off, merekomendasikan pilihan, lalu user memutuskan.

## Boundary
- Workflow ini **menghasilkan keputusan UX/UI**, bukan kode frontend, mockup final, atau brand identity tanpa input user.
- Agent wajib membedakan **fakta existing**, **rekomendasi**, **keputusan user**, **asumsi**, dan **TBD**.
- Agent tidak boleh overwrite `DESIGN.md` existing tanpa approval eksplisit.
- Agent tidak boleh mengganti font, palette, token, brand, component, atau framework karena preferensi pribadi.
- Agent tidak boleh mengarang asset, testimonial, business metric, atau product copy.
- Agent tidak boleh menjadikan rekomendasi sebagai keputusan final tanpa konfirmasi user.

## Input
- Wajib: PRD + acceptance criteria + architecture constraint bila tersedia.
- Bila tersedia: `DESIGN.md`, existing UI/component, CSS/tokens, Tailwind config, font import, asset, screenshot, brand guideline, dan accessibility requirement.

## Design Source Routing

Tentukan mode sebelum membuat rekomendasi.

### Mode A — Existing `DESIGN.md`

Dipakai bila project sudah memiliki design system/specification.

1. Baca file penuh sebagai source of truth.
2. Audit token, typography, spacing, layout, components, states, accessibility, motion, asset, dan component ownership.
3. Bandingkan dengan implementation existing; catat conflict dengan file/path, jangan menebak.
4. Pertahankan sistem existing sebagai default.
5. Tentukan output:
   - Perubahan global disetujui → amend `DESIGN.md`.
   - Perubahan hanya untuk fitur → buat `design-[feature].md` yang mereferensikan sistem global.
6. Jangan mengubah global system untuk satu fitur tanpa alasan, impact, dan approval.

### Mode B — Existing UI tanpa `DESIGN.md`

1. Scan CSS, tokens, component, font import, theme config, asset, dan UI pattern.
2. Catat temuan dengan file/path.
3. Tampilkan sistem yang benar-benar digunakan, conflict, gap, dan component reusable.
4. Tanya user: dokumentasikan sistem existing, atau izinkan perubahan yang diusulkan?
5. Jangan menganggap UI existing konsisten/benar tanpa audit.

### Mode C — Greenfield UI

1. Jalankan discovery penuh.
2. Tawarkan 2–3 opsi visual/interaction yang relevan dengan audience, job, dan tone.
3. Jelaskan trade-off dan beri rekomendasi tegas.
4. User memilih/menyetujui sebelum sistem baru menjadi keputusan final.

### Mode D — No UI

Jika fitur API-only, CLI-only, worker, scheduler, atau tidak memiliki antarmuka pengguna:

- Tandai design workflow `Not applicable` + alasan.
- Jangan membuat `DESIGN.md` hanya demi kelengkapan.
- Handoff ke `workflows/security-planning.md`.

## Discovery Stance

```text
Agent reads PRD + Architecture + existing design system
→ discovers UX/UI decisions needed
→ offers realistic options with trade-offs
→ recommends with clear reasoning
→ user decides
→ agent records DDR decisions
→ design specification is generated
```

## Interaction Contract

1. Mulai dengan summary: UI scope, source mode, existing findings, primary user/job, and unknown.
2. Ajukan satu batch pertanyaan paling relevant, maksimal 3–7 pertanyaan per giliran.
3. Untuk gap/decision gunakan format:
   - **Temuan:** existing context atau UX risk.
   - **Options:** 2–3 alternatif bila ada.
   - **Recommendation:** pilihan + alasan/trade-off.
   - **Decision:** Accepted / Modified / Rejected / Deferred / TBD.
4. Gunakan pilihan jawaban hanya bila valid; selalu izinkan jawaban bebas atau `TBD`.
5. Setelah user menjawab, ringkas keputusan dan impact; jangan mengulang pertanyaan yang sudah terjawab.
6. Jika user belum tahu, tawarkan default yang masuk akal, jelaskan risikonya, lalu tunggu approval.
7. Sebelum finalisasi, tampilkan reused/new components, global token changes, unresolved items, dan AC mapping.

## Progressive Discovery Batches

Gunakan secara adaptif; lewati yang tidak relevan atau sudah terjawab.

### Batch 1 — UI Scope & Context
- Apakah ada UI? Screen/flow mana yang terdampak?
- Existing system, existing UI, atau greenfield?
- Siapa user, apa primary job/action, device, environment, dan urgency?
- Ada brand/design system yang wajib dipertahankan?

### Batch 2 — Existing Design Audit
- Token/font/spacing/layout/component apa yang tersedia?
- Komponen mana yang dapat direuse?
- Apa yang wajib dipertahankan?
- Ada conflict antara docs dan implementation?
- Apa gap yang dibutuhkan feature baru?

### Batch 3 — Information Architecture & Flow
- Entry point, navigation, hierarchy, primary/secondary action.
- Multi-step flow, back/cancel/recovery, confirmation, destructive action.
- Content priority, role-based visibility, empty state, and permission state.

### Batch 4 — Layout & Responsive Decisions
Agent menawarkan 2–3 struktur yang relevan. Contoh:

```text
Temuan: User perlu membandingkan daftar inventory sambil mengedit detail.

A. Master-detail split
- Pros: konteks daftar tetap terlihat; efisien untuk desktop.
- Cons: ruang mobile terbatas.

B. List → detail page
- Pros: sederhana; mobile-friendly.
- Cons: lebih banyak perpindahan konteks di desktop.

Recommendation: Responsive hybrid — master-detail desktop, list → detail mobile.
Why: desktop efficiency tanpa memaksa layout sempit di mobile.

Decision: Accepted / Modified / Rejected / Deferred / TBD
```

### Batch 5 — Visual System
- Palette, typography, spacing, density, radius, rule, shadow, iconography, asset, dark/light mode.
- Existing token selalu menang kecuali user menyetujui perubahan.
- Jangan menggunakan generic card-grid/gradient/glass treatment sebagai default.

### Batch 6 — Component Inventory & States
Untuk component interaktif yang relevan, tentukan:

- Default, hover, focus-visible, active, disabled, loading, error, success.

Untuk screen/flow yang relevan, tentukan:

- Initial, loading, empty, partial, error, permission denied, offline/timeout, success.

Jangan membuat component baru bila existing component cukup.

### Batch 7 — Accessibility & Responsive Behavior
- Keyboard order, focus management, semantic structure, labels, live announcement.
- Contrast, touch target, reduced motion, long content/translation handling.
- Verify 320/375/414/768 px: no horizontal scroll, no clipped actions, priority content retained.

### Batch 8 — Content & Interaction
- Label, helper text, validation/error, confirmation, destructive action, undo/retry.
- Search/filter/sort/pagination/bulk action bila data/alur membutuhkannya.
- Localization, date/number/timezone, and content ownership bila relevan.

### Batch 9 — Review, Approval & Handoff
- Map PRD AC → screen/component/state.
- Tampilkan existing components reused vs new components.
- Tampilkan token/global-system changes and impact.
- Tampilkan unresolved decision/risk.
- Minta approval user sebelum finalisasi.
- Handoff ke `workflows/security-planning.md`.

## Design Decision Record (DDR)

Setiap keputusan UX/UI menggunakan format:

```markdown
### DDR-001 — [Judul Keputusan]

**Requirement terkait:** FR-001, AC-002

**Existing system:** `DESIGN.md#section`, `src/components/Example.*`, atau Greenfield

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

**Why:** [Alasan berbasis user job, accessibility, responsive behavior, dan existing system]

**User decision:** Accepted / Rejected / Modified / Deferred / TBD

**Impact:** [Component, token, screen, test, documentation impact]
```

### Design Decision Ledger

| ID | Area | Existing system | Options | Recommendation | User decision | Impact |
|---|---|---|---|---|---|---|
| DDR-001 | Layout | `DESIGN.md#layout` | Split/Page | Responsive hybrid | Accepted | New responsive shell |

Hanya keputusan **Accepted** atau **Modified** yang menjadi specification final. **Rejected** dicatat sebagai non-decision. **Deferred** masuk future consideration. **TBD** masuk open question dengan owner/next action.

## Output Strategy

| Source mode | Output |
|---|---|
| Greenfield | `DESIGN.md` baru memakai `templates/DESIGN.md` |
| Existing `DESIGN.md`, change global approved | Amend `DESIGN.md` |
| Existing `DESIGN.md`, change feature-only | `design-[feature].md`, refer global system |
| Existing UI tanpa docs | Draft/updated `DESIGN.md` setelah user approve extraction |
| No UI | No design output; record Not applicable |

## Output
- Gunakan `templates/DESIGN.md` untuk global design specification atau feature specification.
- Simpan di lokasi dokumentasi proyek yang disepakati.
- Handoff berikutnya: `workflows/security-planning.md`.

## Exit Checklist

- [ ] UI applicability/source mode jelas.
- [ ] Existing `DESIGN.md` dan implementation dibaca sebelum usulan perubahan.
- [ ] Existing system dipertahankan; global change memiliki justification + approval.
- [ ] User flow, IA, layout, responsive behavior, dan content priority documented.
- [ ] Components reused/new, full states, accessibility, and mobile behavior defined.
- [ ] No generic default UI or fabricated asset/metric/copy.
- [ ] Each decision has DDR options, recommendation, user decision, and impact.
- [ ] PRD AC maps to screen/component/state.
- [ ] Risks, assumptions, open questions, and ownership recorded.
- [ ] User approval recorded; agent never self-approves.
