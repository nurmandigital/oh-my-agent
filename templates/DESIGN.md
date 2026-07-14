# Design System & Styling Guide

## 1. Palet Warna
- **Primary**: `bg-indigo-600` / `#4f46e5` (Tombol utama, link aktif)
- **Secondary**: `bg-gray-600` / `#4b5563` (Tombol batal, teks sekunder)
- **Success**: `bg-emerald-600` / `#059669` (Notifikasi sukses, status aktif)
- **Danger**: `bg-rose-600` / `#e11d48` (Notifikasi error, tombol hapus)

## 2. Tipografi
- **Heading**: Inter / Sans-serif (Bold, tracking-tight)
- **Body**: Inter / Sans-serif (Normal, leading-relaxed)
- **Code**: JetBrains Mono / Fira Code (Monospace)

## 3. Komponen UI Standar
- **Tombol (Button)**:
  - Harus memiliki visual hover `hover:bg-opacity-90`.
  - Harus memiliki visual focus ring `focus:ring-2 focus:ring-offset-2`.
  - Harus memiliki status loading (tampilkan spinner/disabled saat memproses).
- **Form Input**:
  - Tampilkan pesan error berwarna merah di bawah input jika validasi gagal.
  - Border input berubah menjadi merah (`border-rose-500`) saat invalid.
