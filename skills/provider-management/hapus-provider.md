# Hapus Provider

> ⚠️ **Contoh untuk OpenCode.** Prosedur ini menggunakan `opencode.json` sebagai referensi. Jika Anda menggunakan tool lain, sesuaikan nama file konfigurasi dan field referensi model sesuai tool Anda.

---

Prosedur menghapus provider dari file konfigurasi agen (contoh: `opencode.json`) dengan aman, termasuk penanganan referensi model di field top-level (`model`, `small_model`) dan konfigurasi `agent`.

---

## Langkah 1: Tampilkan Daftar Provider
Baca file konfigurasi agen, tampilkan daftar key di dalam block `"provider"` (tanpa API key):
```
Provider tersedia:
  1. provider-alpha
  2. provider-beta
  3. provider-gamma
  4. provider-delta
```

Tanyakan nama provider yang ingin dihapus. Pengguna boleh menjawab dengan nomor atau nama langsung.

## Langkah 2: Cek Referensi Model
Sebelum menghapus, **wajib** cek apakah provider tersebut masih direferensikan di field top-level:

1. **`model`** (model utama): Cek apakah nilainya diawali `<nama-provider>/`. Contoh: `provider-alpha/model-full`.
2. **`small_model`** (model ringan): Cek pola yang sama.
3. **`agent`**: Cek setiap entry agent (`planner`, `implementer`, `reviewer`, `documenter`, `explorer`, dll) — apakah ada yang menggunakan model dari provider ini.

Tampilkan laporan referensi:
```
Provider yang akan dihapus: provider-gamma

Referensi yang ditemukan:
  ⚠️  model        = provider-gamma/model-basic  (WAJIB GANTI)
  ⚠️  agent.explorer = provider-gamma/model-basic (WAJIB GANTI)
  ✅  small_model  = provider-alpha/model-flash  (aman, tidak terdampak)
```

## Langkah 3: Tangani Referensi (Jika Ada)
Jika ada referensi yang masih mengarah ke provider ini:
- **JANGAN langsung hapus provider.**
- Tanyakan model pengganti dari provider lain yang masih ada:
  ```
  Provider "provider-gamma" masih dipakai di:
    - model (utama)
    - agent.explorer

  Pilih model pengganti dari provider yang tersedia:
    1. provider-alpha/model-full
    2. provider-alpha/model-flash
    3. provider-beta/model-pro
    4. Ketik manual (format: provider/model)
  ```
- Update setiap referensi ke model pengganti yang dipilih.

## Langkah 4: Konfirmasi Penghapusan
Tampilkan ringkasan:
```
Provider yang akan dihapus: provider-gamma
Models yang akan dihapus:   model-basic, model-lite, ... (5 model)
Referensi yang akan diupdate:
  model          → provider-alpha/model-full
  agent.explorer → provider-alpha/model-full

Konfirmasi hapus? (y/n)
```

## Langkah 5: Eksekusi & Validasi
Jika `y`:
1. Hapus entry `provider["<nama>"]` dari file konfigurasi.
2. Update field `model`, `small_model`, dan `agent.*` jika ada perubahan referensi.
3. Validasi JSON:
   - **PowerShell**: `Get-Content config.json | ConvertFrom-Json | Out-Null`
   - **Bash**: `python -m json.tool config.json > /dev/null`
   - **Alternatif universal**: `jq empty config.json` (jika jq tersedia)
4. Jika gagal: **ROLLBACK** semua perubahan dan laporkan error.

## Langkah 6: Konfirmasi Akhir
```
✅ Provider "provider-gamma" berhasil dihapus.
✅ Referensi model telah diupdate ke provider-alpha/model-full.

⚠️  Silakan restart aplikasi agen Anda agar perubahan diterapkan.
```

---

## Verifikasi

- [ ] Semua referensi `model`, `small_model`, dan `agent.*` dicek sebelum penghapusan.
- [ ] Tidak ada referensi model yang mengarah ke provider yang sudah dihapus.
- [ ] JSON valid setelah penghapusan.
- [ ] Pengguna dikonfirmasi sebelum penghapusan dieksekusi.
- [ ] Tidak ada provider lain atau field top-level yang ikut terhapus.
