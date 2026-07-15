# Design Generation Workflow

## Goal
Menyusun spesifikasi UX/UI yang konsisten, accessible, dan dapat diimplementasikan dari PRD; gunakan hanya bila produk memiliki antarmuka pengguna.

## Input
- PRD, acceptance criteria, user flow, dan architecture constraints.
- Brand/design system existing bila tersedia.

## Proses
1. Tentukan apakah UI diperlukan; lewati workflow ini untuk CLI/API-only bila tidak relevan.
2. Baca token, komponen, font, dan pola existing sebelum menambah aturan baru.
3. Klarifikasi pengguna, aksi utama, perangkat prioritas, tone, dan state/error yang belum jelas.
4. Definisikan user flow, hierarchy, responsive behavior, content states, accessibility, dan component states.
5. Dokumentasikan token/pattern baru hanya jika memang diperlukan; jangan mengarang brand asset atau metric.

## Output
- File `DESIGN.md` di lokasi dokumentasi proyek yang disepakati.
- Gunakan `templates/DESIGN.md`.

## Exit Checklist
- [ ] User flow memenuhi acceptance criteria UI.
- [ ] Default, loading, empty, error, success, hover, focus, disabled state tercakup bila relevan.
- [ ] Keyboard, focus, contrast, semantic markup, dan mobile behavior tercakup.
- [ ] Sistem existing dipakai atau perubahan token dijustifikasi.
