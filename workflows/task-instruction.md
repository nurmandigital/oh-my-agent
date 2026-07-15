---
name: task-instruction
title: Task Instruction
order: 8
phase: Build
usage: Use during implementation
condition: Always
output: Implementation evidence
next: workflows/code-review-workflow.md
---

# Task Instruction Workflow

## Role
Orchestrator eksekusi. Workflow ini bukan generator template; ia membaca artefak yang sudah disetujui lalu memandu implementasi bertahap.

## Inputs
- PRD dan acceptance criteria.
- Architecture/design/security/testing docs bila relevan.
- Approved task list dari `workflows/task-list-generation.md` + `templates/TASK_LIST.md`.

## Define
- Baca dan ringkas tujuan, scope, constraints, risks, dan acceptance criteria.
- Petakan affected files dan dependency.
- Jika input conflict/ambigu, stop dan minta keputusan; jangan menebak.

## Plan
- Review urutan task, dependency, migration, test, dan rollback.
- Minta approval untuk install dependency, destructive change, schema/config/CI change, atau refactor besar.

## Build
- Eksekusi satu task/subtask per giliran.
- Pertahankan implementasi dalam state yang bisa diverifikasi.
- Update checklist hanya setelah evidence tersedia.
- Jangan mengklaim file/command/test yang tidak benar-benar ada.

## Verify
- Jalankan test, lint, typecheck, build, atau manual verification yang tersedia.
- Cocokkan hasil dengan acceptance criteria.
- Jika gagal, gunakan `workflows/debugging-workflow.md`.

## Review & Handoff
- Bersihkan debug artifact; cek secret, scope, docs, dan backward compatibility.
- Serahkan daftar file, evidence, limitation, unresolved risk, dan next step ke `workflows/code-review-workflow.md`.
