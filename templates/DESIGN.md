# Design Specification: [Nama Fitur/Sistem]

> Gunakan bersama `workflows/design-generation.md`. Bila global `DESIGN.md` sudah ada, feature specification harus mereferensikannya dan hanya mendokumentasikan delta.

## 0. Document Control

| Field | Value |
|---|---|
| Status | Draft · In Review · Approved · Superseded · Not Applicable |
| Mode | Global system · Feature spec · Existing-system extraction |
| Source PRD | `[path]` |
| Source Architecture | `[path]` |
| Global design system | `[path/link atau none]` |
| Owner/approver | [Nama/role] |
| Version/date | [..] |

## 1. Existing Design Findings & Preservation Rules

### Source Inventory

| Source | Finding | Confidence | Action |
|---|---|---|---|
| `DESIGN.md` / CSS / component / config / asset | [Token/pattern/component] | High/Med/Low | Preserve/Amend/Resolve conflict |

### Preserve
- [Brand, tokens, typography, component, interaction, layout pattern yang tidak boleh berubah.]

### Approved Deltas

| Delta | Scope | Reason | User approval | Impact |
|---|---|---|---|---|
| [..] | Global/Feature-only | [..] | Accepted/Modified | [..] |

### Conflicts / Gaps
- [Difference between documented design and implementation, missing component/state, or TBD.]

## 2. Audience, Job & Context

| Item | Detail |
|---|---|
| Primary audience | [..] |
| Primary job/action | [..] |
| Secondary users/roles | [..] |
| Device/environment | [..] |
| User constraints | [Knowledge, accessibility, connectivity, urgency] |
| Tone | [Editorial/technical/austere/playful/etc.; avoid “clean modern” only] |

## 3. User Flow & Information Architecture

### Flow: [Nama]

```text
[Entry] → [Primary action] → [Validation/system response] → [Success]
               ↘ [Error/recovery]
```

| Step | Screen/state | User action | System feedback | Exit/recovery |
|---:|---|---|---|---|
| 1 | [..] | [..] | [..] | [..] |

### Navigation & Hierarchy
- **Entry point:** [..]
- **Primary navigation:** [..]
- **Primary/secondary action:** [..]
- **Back/cancel/recovery:** [..]
- **Role-based visibility:** [..]

## 4. Screen Inventory

| ID | Screen/view | Purpose | Entry | Primary action | Key states |
|---|---|---|---|---|---|
| UI-001 | [..] | [..] | [..] | [..] | Loading/Empty/Error/Success |

## 5. Layout & Responsive Behavior

### Macrostructure
- **Desktop:** [..]
- **Tablet:** [..]
- **Mobile:** [..]
- **Content priority:** [What stays visible/collapses/moves.]
- **Overflow:** [Long text/table/code/media handling.]

### Responsive Matrix

| Width | Structure | Navigation | Actions | Content/overflow verification |
|---:|---|---|---|---|
| 320px | [..] | [..] | [No clipped/two-line primary action] | [No horizontal scroll] |
| 375px | [..] | [..] | [..] | [..] |
| 414px | [..] | [..] | [..] | [..] |
| 768px | [..] | [..] | [..] | [..] |
| Desktop | [..] | [..] | [..] | [..] |

## 6. Visual System & Tokens

> Reference existing tokens. Do not inline new palette/font values without approved delta.

| Role | Token/reference | Existing/New | Value/source | Usage |
|---|---|---|---|---|
| Paper/background | `--color-*` | Existing/New | [..] | [..] |
| Ink/text | `--color-*` | Existing/New | [..] | [..] |
| Accent/status/focus | `--color-*` | Existing/New | [..] | [..] |
| Display/body/mono font | `--font-*` | Existing/New | [..] | [..] |
| Spacing/type/radius/rule | `--space-*` etc. | Existing/New | [..] | [..] |

### Visual Rules
- Density, hierarchy, border/shadow/radius, iconography, image treatment, dark/light mode.
- Explicitly list forbidden/avoided treatments for this product.

## 7. Component Inventory & Ownership

| Component | Existing source/owner | Reuse/New/Extend | Variants | Consumer |
|---|---|---|---|---|
| [..] | `[path]` | Reuse | [..] | UI-001 |

### Component Decision Rule
- Reuse existing component when behavior and accessibility meet requirements.
- Extend only when the change remains compatible.
- Create new only when existing ownership/semantics cannot support the need.

## 8. Component States

| Component | Default | Hover | Focus-visible | Active | Disabled | Loading | Error | Success |
|---|---|---|---|---|---|---|---|---|
| [Button/input/etc.] | [..] | [..] | [..] | [..] | [..] | [..] | [..] | [..] |

## 9. Screen & Data States

| Screen | Initial | Loading | Empty | Partial | Error | Permission denied | Offline/timeout | Success |
|---|---|---|---|---|---|---|---|---|
| UI-001 | [..] | [..] | [..] | [..] | [..] | [..] | [..] | [..] |

## 10. Content & Validation

| Context | Copy/label | Rule | Owner/source |
|---|---|---|---|
| Primary action | [Verb-led label] | [..] | [..] |
| Validation error | [Specific safe message] | [When shown] | [..] |
| Empty/success | [Guidance/evidence] | [..] | [..] |
| Destructive action | [Warning/Undo/confirmation] | [..] | [..] |

- **Localization:** [Languages, expansion, date/number/timezone.]
- **Unknown copy:** use `TBD`; do not fabricate business claims.

## 11. Interaction & Motion

| Interaction | Trigger | Feedback | Duration/easing | Reduced motion |
|---|---|---|---|---|
| [Submit/copy/filter/modal/etc.] | [..] | [..] | [..] | [..] |

Rules:
- Animate transform/opacity when motion is needed; avoid decorative motion without information value.
- Focus ring appears immediately and remains visible.
- Prefer silent success, optimistic update + undo, or inline status when appropriate.

## 12. Accessibility

- **Semantic structure:** [Landmarks/headings/table/form semantics.]
- **Keyboard:** [Order, shortcuts, traps, escape behavior.]
- **Focus:** [Initial/restored focus, visible contrast.]
- **Labels/descriptions:** [Form, icon button, status.]
- **Announcements:** [Error/success/loading changes.]
- **Contrast:** [Text, controls, focus, status not color-only.]
- **Target size:** [Touch/click requirements.]
- **Reduced motion:** [Behavior.]
- **Testing:** [Keyboard/screen reader/automated/manual evidence.]

## 13. Assets & Dependencies

| Asset/dependency | Source/license | Final/placeholder | Owner | Fallback |
|---|---|---|---|---|
| [Image/icon/font/library] | [..] | [..] | [..] | [..] |

- Never ship invented stock photography, logos, testimonials, or metrics as final content.
- Do not add UI dependencies without approval and impact assessment.

## 14. Design Decision Ledger (DDR)

### DDR Index

| ID | Area | Existing system | Options | Recommendation | User decision | Impact |
|---|---|---|---|---|---|---|
| DDR-001 | [Layout/component/token] | `[reference]` | A/B | [..] | Accepted/Modified/Rejected/Deferred/TBD | [..] |

### Individual DDR

```markdown
### DDR-001 — [Judul]

**Requirement terkait:** FR-001, AC-002
**Existing system:** `DESIGN.md#section`, `[component path]`, or Greenfield

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
**Why:** [User job + accessibility + responsive + system rationale]
**User decision:** Accepted / Rejected / Modified / Deferred / TBD
**Impact:** [Component/token/screen/test/documentation]
```

## 15. Acceptance Traceability

| PRD requirement/AC | Screen | Component/state | Design decision | Evidence planned |
|---|---|---|---|---|
| FR-001 / AC-001 | UI-001 | [Form success/error] | DDR-001 | [Prototype/test] |

## 16. Risks, Assumptions & Open Questions

### Risks

| ID | Risk | Impact | Mitigation | Owner |
|---|---|---|---|---|
| DR-001 | [..] | [..] | [..] | [..] |

### Assumptions
- **DA-001:** [..]

### Open Questions

| ID | Question | Blocking? | Owner/next action |
|---|---:|---|---|
| DQ-001 | [..] | Yes/No | [..] |

## 17. Handoff & Approval

### Implementation Handoff
- Reused components: [..]
- New/extended components: [..]
- Approved global token changes: [..]
- Feature-only deltas: [..]
- Assets/content still required: [..]
- Testing focus: [responsive/a11y/states/interactions].

### Approval

| Role/name | Decision | Date | Notes |
|---|---|---|---|
| [Design/product/engineering] | Pending/Approved/Rejected | [YYYY-MM-DD] | [..] |

## 18. Design Readiness Checklist

- [ ] UI applicability and output mode are explicit.
- [ ] Existing design sources and implementation were inspected before recommendations.
- [ ] Preserve rules, conflicts, approved global changes, and feature deltas are documented.
- [ ] Audience, primary job, flow, IA, screens, and content priority are clear.
- [ ] Layout verified at 320/375/414/768px and desktop without horizontal scroll/clipped actions.
- [ ] Existing/new tokens and component ownership are explicit.
- [ ] Relevant components include default/hover/focus/active/disabled/loading/error/success states.
- [ ] Relevant screens include loading/empty/partial/error/permission/offline/success states.
- [ ] Accessibility, content, validation, motion, assets, and localization impacts were reviewed.
- [ ] Every committed decision has an Accepted/Modified DDR.
- [ ] PRD AC maps to screen/component/state and planned evidence.
- [ ] Risks, assumptions, open questions, handoff, and approval are recorded.
