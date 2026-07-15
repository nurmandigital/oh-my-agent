# Oh My Agent 🤖

Kit instruksi kerja universal untuk AI Agent — platform-agnostic, bisa dipakai di OpenCode, Cursor, Claude Code, Aider, Gemini CLI, Hermes, atau tool agen lainnya.

Berisi panduan peran (agents), alur kerja (workflows), pembatas (guardrails), template dokumen, dan skill teknis yang bisa di-copy-paste langsung ke system prompt atau instruction file agen Anda.

## Struktur Repositori

```text
oh-my-agent/
├── README.md
├── agents/                   # Persona AI (senior-dev, EA, reviewer, dll)
├── workflows/                # Instruksi kerja terarah step-by-step
├── templates/                # Template dokumen (PRD, ARCHITECTURE, DESIGN, dll)
├── guardrails/               # Aturan proteksi ketat (TypeScript, Dependensi)
└── skills/                   # Keahlian teknis (setup stack, migrasi DB, auth, dll)
```

## Cara Penggunaan

1. **Copy file yang relevan** ke project Anda — tidak perlu clone seluruh repo.
2. **Gunakan persona di `agents/`** sebagai system prompt untuk melatih agent dengan keahlian tertentu.
3. **Gunakan panduan di `workflows/`** untuk membimbing agent bekerja secara terstruktur (step-by-step).
4. **Gunakan berkas di `guardrails/`** untuk membatasi ruang gerak agent (misal: larangan `any` di TypeScript).
5. **Gunakan template di `templates/`** untuk membuat dokumentasi proyek standar.
6. **Gunakan skill di `skills/`** sebagai panduan teknis spesifik (setup stack, migrasi DB, dll).

## Workflow vs Template

- `workflows/` berisi prompt/prosedur untuk menghasilkan artefak atau menjalankan proses kerja.
- `templates/` berisi struktur output Markdown yang dihasilkan workflow.
- `workflows/project-lifecycle.md` menjadi peta urutan dan handoff antarfase.
- Panduan copy/paste untuk user tersedia di [`docs/WORKFLOW_GUIDE.md`](docs/WORKFLOW_GUIDE.md).

## Recommended Project Lifecycle

```text
Brief
→ PRD
→ Architecture
→ Design (jika ada UI)
→ Security
→ Testing
→ Task List
→ Implementation / Debugging
→ Code Review
→ Deployment
```

| Phase | Workflow | Template/output |
|---|---|---|
| PRD | `workflows/prd-generation.md` | `templates/PRD.md` |
| Architecture | `workflows/architecture-generation.md` | `templates/ARCHITECTURE.md` |
| Design | `workflows/design-generation.md` | `templates/DESIGN.md` |
| Security | `workflows/security-planning.md` | `templates/SECURITY.md` |
| Testing | `workflows/testing-planning.md` | `templates/TESTING.md` |
| Task List | `workflows/task-list-generation.md` | `templates/TASK_LIST.md` |
| Execution | `workflows/task-instruction.md` | Implementasi + task status |
| Debugging | `workflows/debugging-workflow.md` | Root cause + verified fix |
| Review | `workflows/code-review-workflow.md` | `templates/CODE_REVIEW.md` + task kondisional |
| Deployment | `workflows/deployment-workflow.md` | `templates/DEPLOYMENT.md` |

## Kompatibilitas & Scope

Kit ini dirancang untuk **semua platform AI agent**. Namun, tidak semua file relevan untuk semua konteks. Berikut taksonomi setiap file:

### 🟢 Universal (bisa dipakai agen apa pun)
| File | Kegunaan |
|---|---|
| `agents/executive-assistant.md` | Koordinator tugas, triage, routing, tracking, briefing (cocok untuk Hermes, asisten umum, dll) |
| `templates/PRD.md` | Template Product Requirements Document |
| `templates/SECURITY.md` | Protokol keamanan (validasi input, env var, try-catch) |
| `templates/TESTING.md` | Standard kualitas assurance |
| `workflows/debugging-workflow.md` | Alur sistematis debugging bug/error |
| `workflows/prd-generation.md` | Panduan AI membuat PRD dari deskripsi fitur |
| `workflows/task-instruction.md` | Alur kerja terstruktur Define → Plan → Build → Verify → Review |
| `workflows/task-list-generation.md` | Panduan membuat task list step-by-step |

### 🔵 Coding-Only (untuk agen yang menulis kode)
| File | Kegunaan |
|---|---|
| `agents/senior-developer.md` | Persona fullstack developer (frontend + backend + DB + testing) |
| `agents/code-reviewer.md` | Persona code reviewer |
| `agents/security-auditor.md` | Persona security auditor |
| `agents/ui-ux-designer.md` | Persona UI/UX designer |
| `agents/qa-engineer.md` | Persona QA engineer |
| `guardrails/typescript-rules.md` | Aturan TypeScript (hanya untuk proyek TS) |
| `guardrails/dependency-rules.md` | Aturan dependency (hanya untuk proyek dengan package manager) |
| `skills/react-nextjs-setup/` | Setup Next.js + Tailwind + Shadcn |
| `skills/express-api-setup/` | Setup Express + Prisma + Zod |
| `skills/database-migration/` | Pola migrasi database aman |
| `skills/auth-implementation/` | Implementasi autentikasi (JWT + bcrypt) |
| `skills/api-integration/` | Integrasi API pihak ketiga |
| `skills/error-handling-pattern/` | Standar error handling |
| `skills/testing-setup/` | Setup testing (Vitest/Jest) |
| `templates/ARCHITECTURE.md` | Template arsitektur kode |
| `templates/DESIGN.md` | Template design system (Tailwind) |
| `templates/DEPLOYMENT.md` | Template deployment infrastruktur |

### 🟠 OpenCode-Specific (contoh untuk OpenCode)
| File | Kegunaan |
|---|---|
| `skills/provider-management/` | Cara mengelola AI model provider di `opencode.json` |

> 💡 File di folder `skills/provider-management/` adalah **contoh konkret untuk OpenCode**. Jika Anda menggunakan tool lain, sesuaikan nama file konfigurasi dan schema provider sesuai tool Anda.
