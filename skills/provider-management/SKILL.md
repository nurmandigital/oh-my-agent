---
name: provider-management
description: Mengelola provider model AI dalam konfigurasi OpenCode — menambah, memperbarui, dan menghapus provider beserta model-modelnya. Gunakan saat pengguna ingin menambahkan provider baru (base URL + API key), memperbarui konfigurasi yang sudah ada, atau menghapus provider beserta referensinya.
---

# Provider Management

## Overview

Skill ini menangani seluruh siklus hidup provider AI dalam konfigurasi OpenCode (`opencode.json`). Mulai dari menambah provider baru, memperbarui konfigurasi yang sudah ada, hingga menghapus provider dengan aman tanpa merusak referensi model yang masih dipakai.

## When to Use

- Pengguna ingin **menambah** provider AI baru (OpenAI-compatible) dengan base URL dan API key.
- Pengguna ingin **memperbarui** API key, base URL, atau model dari provider yang sudah ada.
- Pengguna ingin **menghapus** provider yang tidak lagi digunakan.
- Ada provider duplikat atau konfigurasi yang kedaluwarsa.

## Sub-Files

| File | Fungsi |
|---|---|
| `kelola-provider.md` | Menambah provider baru ATAU memperbarui provider yang sudah ada (dengan diff + approval) |
| `hapus-provider.md` | Menghapus provider + menangani referensi model di `model`, `small_model`, dan `agent` |

## Verification

- [ ] JSON konfigurasi valid setelah setiap perubahan (divalidasi dengan parser JSON)
- [ ] Koneksi ke provider terverifikasi (endpoint `/models` merespons)
- [ ] Tidak ada referensi model yang mengarah ke provider yang sudah dihapus
- [ ] Perubahan sudah dikonfirmasi oleh pengguna sebelum diterapkan
