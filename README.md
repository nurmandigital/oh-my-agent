# Oh My Agent 🤖

Kumpulan instruksi kerja (workflows), panduan peran (agents), pembatas (guardrails), dan template dokumen proyek untuk memaksimalkan performa AI Agent / LLM dalam proses software engineering.

## Struktur Repositori

```text
oh-my-agent/
├── README.md
├── agents/                   # Persona AI (senior-developer, reviewer, dll)
├── workflows/                # Instruksi kerja terarah step-by-step
├── templates/                # Template dokumen PRD, ARCHITECTURE, DESIGN, dll
└── guardrails/               # Aturan proteksi ketat (TypeScript, Dependensi, dll)
```

## Cara Penggunaan

1. **Gunakan persona di `agents/`** sebagai system prompt untuk melatih agent dengan keahlian tertentu.
2. **Gunakan panduan di `workflows/`** untuk membimbing agent bekerja secara terstruktur (step-by-step).
3. **Gunakan berkas di `guardrails/`** untuk membatasi ruang gerak agent agar tidak merusak kode (misal larangan penggunaan `any` di TS).
4. **Gunakan template di `templates/`** untuk membuat dokumentasi proyek standar agar mudah dibaca oleh AI Agent lain.
