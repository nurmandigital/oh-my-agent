# Product Requirements Document (PRD)

## 1. Metadata Proyek
- **Nama Proyek**: [Nama Proyek]
- **Status**: Draft / Under Review / Approved
- **Versi**: 1.0.0
- **Pemilik (Owner)**: [Nama Owner]
- **Tanggal**: [Tanggal Pembuatan]

## 2. Latar Belakang & Masalah (Background & Problem Statement)
- **Masalah**: [Jelaskan masalah pengguna secara detail.]
- **Solusi**: [Jelaskan solusi yang ditawarkan fitur ini.]

## 3. Tujuan & Batasan (Goals & Non-Goals)
- **Goals**:
  - [ ] [Tujuan utama 1]
  - [ ] [Tujuan utama 2]
- **Non-Goals**:
  - [ ] [Hal di luar ruang lingkup proyek]
  - [ ] [Fitur yang sengaja ditunda]

## 4. Persona Pengguna & Alur Kerja (User Personas & Flows)
- **Personas**:
  - **[Nama Peran]**: [Deskripsi perilaku dan kebutuhan pengguna.]
- **User Flows**:
  1. Pengguna membuka halaman [Nama Halaman].
  2. Pengguna melakukan aksi [Nama Aksi].
  3. Sistem memberikan respon [Respon].

## 5. Kebutuhan Fungsional & Kriteria Penerimaan (Functional Requirements & AC)
### Fitur A: [Nama Fitur]
- **Deskripsi**: [Cara kerja fitur.]
- **Kriteria Penerimaan (Acceptance Criteria)**:
  - [ ] User bisa melakukan [tindakan]
  - [ ] Sistem menyimpan data [data] ke database
- **Penanganan Error (Error Handling)**:
  - [ ] Jika input tidak valid, tampilkan error: "[Pesan Error]"
  - [ ] Jika database offline, tampilkan fallback UI
- **Kasus Batas (Edge Cases)**:
  - [ ] Pengguna mencoba submit form berkali-kali secara cepat (double submit prevention)

## 6. Kebutuhan Non-Fungsional (Non-Functional Requirements)
- **Performa**: Waktu respon API maksimal [100ms/200ms]
- **Aksesibilitas**: Memenuhi standar WCAG 2.1 AA
- **Keamanan**: Data sensitif wajib dienkripsi di DB

## 7. Integrasi Teknis & Model Data (Technical Integrations & Data Model)
- **Integrasi**: [Sebutkan third-party API / SDK]
- **Model Data (Skema Kasar)**:
  ```sql
  -- Contoh skema database
  CREATE TABLE users (
      id UUID PRIMARY KEY,
      email VARCHAR(255) UNIQUE,
      created_at TIMESTAMP
  );
  ```

## 8. Metrik Keberhasilan & Kriteria Rilis (Success Metrics & Release Criteria)
- **KPI**: [Misal: Retensi naik 5%]
- **Kriteria Rilis**:
  - [ ] Unit test coverage minimal 80%
  - [ ] Lolos static code analysis (no critical errors)

## 9. Risiko & Asumsi (Risks, Assumptions, & Open Questions)
- **Risiko**: [Dampak & Solusi Mitigasi]
- **Pertanyaan Terbuka**: [Hal yang butuh konfirmasi stakeholder]
