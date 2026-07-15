# Project Lifecycle Workflow

Workflow induk untuk memilih dan mengurutkan artefak proyek. Tidak semua fase wajib; gunakan sesuai risiko dan scope.

## Lifecycle

| Phase | Workflow | Output |
|---|---|---|
| Define | `workflows/prd-generation.md` | `PRD.md` dari `templates/PRD.md` |
| Architect | `workflows/architecture-generation.md` | `ARCHITECTURE.md` |
| Design (conditional) | `workflows/design-generation.md` | `DESIGN.md` |
| Secure | `workflows/security-planning.md` | `SECURITY.md` |
| Test plan | `workflows/testing-planning.md` | `TESTING.md` |
| Plan work | `workflows/task-list-generation.md` | `TASK_LIST.md` |
| Execute | `workflows/task-instruction.md` | Implementasi + updated task status |
| Debug (conditional) | `workflows/debugging-workflow.md` | Root-cause evidence + verified fix |
| Review | `workflows/code-review-workflow.md` | Review report + conditional remediation tasks |
| Release | `workflows/deployment-workflow.md` | `DEPLOYMENT.md` + release evidence |

## Routing Rules
- Proyek kecil boleh menggabungkan dokumen, tetapi acceptance criteria, risiko, test, dan rollback tidak boleh hilang.
- Design boleh dilewati untuk API/CLI/background service tanpa UI.
- Architecture ringan tetap diperlukan ketika ada data flow, integration, schema, atau compatibility decision.
- Security/testing depth mengikuti risiko; auth, payment, PII, destructive operation, dan public endpoint membutuhkan detail lebih tinggi.
- Deployment hanya berjalan setelah implementation verification dan review sesuai kebijakan proyek.

## Handoff Gate
Setiap fase menyerahkan: source input, keputusan, asumsi/open questions, output path, dan evidence/exit checklist. Fase berikutnya tidak boleh menganggap open question sebagai keputusan.
