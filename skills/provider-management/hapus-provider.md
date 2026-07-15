# Hapus Provider

Prosedur menghapus provider dari `opencode.json` dengan aman, termasuk penanganan referensi model di field top-level (`model`, `small_model`) dan konfigurasi `agent`.

---

## Langkah 1: Tampilkan Daftar Provider
Baca `opencode.json`, tampilkan daftar key di dalam block `"provider"` (tanpa API key):
```
Provider tersedia:
  1. tokenrouter
  2. dahonolabs
  3. 9router
  4. openrouter
```

Tanyakan nama provider yang ingin dihapus. Pengguna boleh menjawab dengan nomor atau nama langsung.

## Langkah 2: Cek Referensi Model
Sebelum menghapus, **wajib** cek apakah provider tersebut masih direferensikan di field top-level:

1. **`model`** (model utama): Cek apakah nilainya diawali `<nama-provider>/`. Contoh: `tokenrouter/gpt-4o`.
2. **`small_model`** (model ringan): Cek pola yang sama.
3. **`agent`**: Cek setiap entry agent (`planner`, `implementer`, `reviewer`, `documenter`, `explorer`, dll) — apakah ada yang menggunakan model dari provider ini.

Tampilkan laporan referensi:
```
Provider yang akan dihapus: 9router

Referensi yang ditemukan:
  ⚠️  model        = 9router/mikirgratis  (WAJIB GANTI)
  ⚠️  agent.explorer = 9router/mikirgratis (WAJIB GANTI)
  ✅  small_model  = tokenrouter/deepseek  (aman, tidak terdampak)
```

## Langkah 3: Tangani Referensi (Jika Ada)
Jika ada referensi yang masih mengarah ke provider ini:
- **JANGAN langsung hapus provider.**
- Tanyakan model pengganti dari provider lain yang masih ada:
  ```
  Provider "9router" masih dipakai di:
    - model (utama)
    - agent.explorer

  Pilih model pengganti dari provider yang tersedia:
    1. tokenrouter/gpt-4o
    2. tokenrouter/deepseek-v4-flash
    3. dahonolabs/claude-3.5-sonnet
    4. Ketik manual (format: provider/model)
  ```
- Update setiap referensi ke model pengganti yang dipilih.

## Langkah 4: Konfirmasi Penghapusan
Tampilkan ringkasan:
```
Provider yang akan dihapus: 9router
Models yang akan dihapus:   mikirgratis, gpt-4o-mini, ... (5 model)
Referensi yang akan diupdate:
  model          → tokenrouter/gpt-4o
  agent.explorer → tokenrouter/gpt-4o

Konfirmasi hapus? (y/n)
```

## Langkah 5: Eksekusi & Validasi
Jika `y`:
1. Hapus entry `provider["<nama>"]` dari `opencode.json`.
2. Update field `model`, `small_model`, dan `agent.*` jika ada perubahan referensi.
3. Validasi JSON:
   - **PowerShell**: `Get-Content opencode.json | ConvertFrom-Json | Out-Null`
   - **Bash**: `python -m json.tool opencode.json > nul`
4. Jika gagal: **ROLLBACK** semua perubahan dan laporkan error.

## Langkah 6: Konfirmasi Akhir
```
✅ Provider "9router" berhasil dihapus.
✅ Referensi model telah diupdate ke tokenrouter/gpt-4o.

⚠️  Silakan restart OpenCode agar perubahan diterapkan.
```

---

## Verifikasi

- [ ] Semua referensi `model`, `small_model`, dan `agent.*` dicek sebelum penghapusan.
- [ ] Tidak ada referensi model yang mengarah ke provider yang sudah dihapus.
- [ ] JSON valid setelah penghapusan.
- [ ] Pengguna dikonfirmasi sebelum penghapusan dieksekusi.
- [ ] Tidak ada provider lain atau field top-level yang ikut terhapus.
