# Kelola Provider (Tambah & Update)

Prosedur menambah provider baru atau memperbarui konfigurasi provider yang sudah ada di `opencode.json`. Prosedur ini mendukung dua mode: **Mode Tambah** (provider belum ada) dan **Mode Update** (provider sudah ada).

---

## Mode 1: Tambah Provider Baru

### Langkah 1: Kumpulkan Informasi
Tanyakan 3 hal kepada pengguna:
- **Nama Provider**: identifier lowercase, tanpa spasi, tanpa karakter khusus (contoh: `myprovider`, `routerku`). Gunakan sebagai key di JSON.
- **Base URL**: URL endpoint API (contoh: `https://api.openai.com/v1`). Pastikan diakhiri `/v1` jika provider menggunakan format OpenAI-compatible.
- **API Key**: Key autentikasi untuk provider tersebut. **JANGAN tampilkan key di output** — selalu tampilkan sebagai `***...<4-char-akhir>`.

### Langkah 2: Cek Koneksi & Fetch Daftar Model
Gunakan API key dan base URL untuk melakukan cek koneksi nyata ke provider:

**PowerShell:**
```powershell
$headers = @{ "Authorization" = "Bearer $apiKey" }
$response = Invoke-RestMethod -Uri "$baseURL/models" -Headers $headers -Method Get
$models = $response.data | Select-Object -ExpandProperty id
```

**curl (bash):**
```bash
curl -s "$baseURL/models" -H "Authorization: Bearer $apiKey" | jq -r '.data[].id'
```

- Jika gagal (timeout / 401 / 403), tampilkan pesan error dan **hentikan proses**. Jangan lanjutkan sampai pengguna memperbaiki kredensial.
- Jika sukses, tampilkan daftar model yang tersedia (maksimal 20 nama pertama; jika lebih, ringkas dengan `...dan X model lainnya`).

### Langkah 3: Cek Duplikat di `opencode.json`
Baca `opencode.json`, cek apakah key `provider["<nama>"]` sudah ada.
- **Jika belum ada**: Lanjut ke Mode Tambah (Langkah 4).
- **Jika sudah ada**: Tampilkan konfigurasi existing dan tawarkan:
  - A: **Update provider** yang sudah ada (lompat ke Mode 2)
  - B: **Batal** (hentikan proses)

### Langkah 4: Konfirmasi & Inject
Tampilkan ringkasan yang akan ditambahkan (mask API key):
```
Provider: myprovider
Base URL: https://api.myprovider.com/v1
Models  : gpt-4o-mini, gpt-4o, claude-3.5-sonnet (3 model)
```

Minta konfirmasi pengguna (`y/n`). Jika `y`:
1. Baca `opencode.json` utuh.
2. Tambahkan entry baru di dalam block `"provider": { ... }`:
```json
"<nama-provider>": {
  "api": "openai",
  "name": "<Display Name>",
  "options": {
    "apiKey": "<api-key>",
    "baseURL": "<base-url>"
  },
  "models": {
    "<model-id-1>": { "name": "<model-id-1>" },
    "<model-id-2>": { "name": "<model-id-2>" }
  }
}
```

**Aturan Field:**
- `"api"`: selalu `"openai"` untuk provider yang kompatibel dengan OpenAI API.
- `"name"`: gunakan huruf kapital di awal kata (contoh: `"My Provider"`).
- `"options.baseURL"`: sudah diakhiri `/v1` — jangan tambahkan `/v1` lagi. Jika provider menambahkan `/v1` di belakang layar, gunakan base URL tanpa `/v1`.

### Langkah 5: Validasi JSON
Setelah edit:
- **PowerShell**: `Get-Content opencode.json | ConvertFrom-Json | Out-Null`
- **Bash**: `python -m json.tool opencode.json > nul`

Jika gagal: **ROLLBACK** perubahan dan laporkan error. Jangan tinggalkan config dalam state rusak.

### Langkah 6: Konfirmasi Akhir
Tampilkan pesan sukses:
```
✅ Provider "myprovider" berhasil ditambahkan dengan 3 model.

⚠️  Silakan restart OpenCode agar perubahan diterapkan.
```

---

## Mode 2: Update Provider yang Sudah Ada

### Langkah 1: Identifikasi Provider
Tampilkan daftar provider yang ada di `opencode.json` (tanpa API key) dan tanyakan nama provider yang ingin diperbarui. Pengguna boleh menjawab `list` untuk melihat daftar.

### Langkah 2: Tampilkan Konfigurasi Saat Ini
Baca entry provider dari `opencode.json` dan tampilkan (mask API key):
```
Provider saat ini: myprovider
Base URL          : https://api.myprovider.com/v1
API Key           : ***...b3f2
Models            : gpt-4o-mini, gpt-4o (2 model)
```

### Langkah 3: Pilih yang Ingin Diubah
Tanyakan apa yang ingin diperbarui:
- A: **API Key** saja (tidak perlu fetch ulang model)
- B: **Base URL** saja (fetch ulang model dari URL baru)
- C: **Base URL + API Key** (fetch ulang model)
- D: **Refresh daftar model** saja (fetch ulang dari URL existing)
- E: **Batal**

### Langkah 4: Lakukan Perubahan
- **Jika mengganti API Key/URL**: Lakukan cek koneksi + fetch model seperti Mode Tambah Langkah 2.
- **Jika refresh model saja**: Fetch ulang model, bandingkan dengan yang ada, tampilkan model baru/hilang.

### Langkah 5: Approval Diff
**SELALU tampilkan diff sebelum menerapkan perubahan**:
```diff
Provider: myprovider
Base URL:
- https://api-old.example.com/v1
+ https://api-new.example.com/v1
Models:
- gpt-3.5-turbo (HAPUS)
+ gpt-4o-mini (BARU)
  gpt-4o (TETAP)
```

Minta konfirmasi pengguna (`y/n`). Jika `y`, terapkan perubahan, validasi JSON, dan tampilkan pesan sukses.

---

## Verifikasi

- [ ] API key mask di semua output.
- [ ] Koneksi ke provider terverifikasi sebelum perubahan diterapkan.
- [ ] JSON valid setelah setiap perubahan.
- [ ] Tidak ada perubahan pada provider lain atau field top-level (`model`, `small_model`, `$schema`).
- [ ] Pengguna dikonfirmasi sebelum perubahan ditulis ke file.
