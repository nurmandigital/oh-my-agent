# Workflow Guide — Build a System with Oh My Agent

Gunakan guide ini saat ingin membangun sistem/fitur dari awal. File di `workflows/` adalah prompt/prosedur: copy isi file ke AI agent Anda, lalu simpan outputnya memakai template yang disebutkan.

## Start Here

1. Copy `workflows/project-lifecycle.md` ke agent untuk melihat keseluruhan alur.
2. Mulai dari `workflows/prd-generation.md`; jangan langsung meminta agent menulis kode.
3. Simpan setiap dokumen output di lokasi dokumentasi proyek yang disepakati (`docs/`, `specs/`, atau setara).
4. Berikan dokumen fase sebelumnya kepada agent saat menjalankan fase berikutnya.

## Recommended Path

| # | Copy this workflow | Kapan dipakai | Output | Lanjut ke |
|---:|---|---|---|---|
| 01 | `workflows/project-lifecycle.md` | Paling awal | Peta lifecycle | PRD |
| 02 | `workflows/prd-generation.md` | Sebelum desain/teknis | `PRD.md` | Architecture |
| 03 | `workflows/architecture-generation.md` | Setelah PRD | `ARCHITECTURE.md` | Design/Security |
| 04 | `workflows/design-generation.md` | Hanya jika ada UI | `DESIGN.md` | Security |
| 05 | `workflows/security-planning.md` | Wajib lebih detail untuk auth, PII, payment, public API, atau aksi destruktif | `SECURITY.md` | Testing |
| 06 | `workflows/testing-planning.md` | Sebelum implementasi | `TESTING.md` | Task list |
| 07 | `workflows/task-list-generation.md` | Setelah dokumen rencana cukup | `TASK_LIST.md` | Build |
| 08 | `workflows/task-instruction.md` | Saat implementasi | Evidence + update task status | Review |
| 09 | `workflows/debugging-workflow.md` | Hanya ketika ada error/bug/test gagal | Root cause + verified fix | Review |
| 10 | `workflows/code-review-workflow.md` | Sebelum merge | `CODE_REVIEW.md` + task kondisional | Deploy |
| 11 | `workflows/deployment-workflow.md` | Saat release | `DEPLOYMENT.md` + release evidence | Complete |

## Handoff Rule

Setiap fase harus menyerahkan:

- Path dokumen input/output.
- Keputusan dan asumsi.
- Open question yang belum dijawab.
- Acceptance criteria atau evidence verifikasi.
- Risiko, constraint, dan pekerjaan lanjutan.

Jangan menganggap open question sebagai keputusan final.

## Short Example

```text
1. Paste prd-generation.md + brief fitur ke AI agent.
2. Jawab pertanyaan klarifikasi; simpan hasil sebagai docs/prd-user-profile.md.
3. Paste architecture-generation.md + docs/prd-user-profile.md.
4. Jika ada UI, paste design-generation.md + PRD + architecture.
5. Lanjutkan security, testing, task list, lalu implementation.
```

## Conditional Phases

- **Design:** boleh dilewati untuk CLI, API-only, worker, atau job background.
- **Security:** jangan dilewati untuk perubahan berisiko; untuk perubahan kecil tetap lakukan security check ringkas.
- **Debugging:** bukan tahap rutin; pakai hanya saat evidence menunjukkan bug/error.
- **Deployment:** jalankan hanya jika akan merilis; tetap butuh approval sebelum environment/migration berubah.
