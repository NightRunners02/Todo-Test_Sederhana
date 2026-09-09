# 📝 Task Manager - Google Apps Script (Multi-User)

![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?style=for-the-badge&logo=google&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

Aplikasi **To-Do List / Task Manager** berbasis web modern yang terintegrasi langsung dengan **Google Sheets** sebagai database. Menggunakan Google Apps Script, aplikasi ini mendukung **multi-user/login akun Google** dengan isolasi data otomatis untuk setiap pengguna.

---

## ✨ Fitur Utama

* 🔐 **Multi-User Authentication**: Setiap pengguna yang login dengan akun Google hanya dapat melihat, menambah, dan mengelola tugas mereka sendiri.
* 📊 **Dashboard Statistik**: Menampilkan ringkasan total tugas, tugas pending, dan tugas selesai secara otomatis.
* 🌓 **Mode Gelap / Terang (Dark & Light Mode)**: Dukungan *toggle* tampilan malam/siang yang tersimpan di memori browser (*localStorage*).
* 🔍 **Filter Tugas**: Mempermudah penyaringan tugas (*Semua*, *Pending*, *Selesai*).
* ⚡ **Real-Time Spreadsheet Sync**: Menggunakan Google Sheets sebagai *backend database* secara otomatis tanpa perlu *server* berbayar.
* 📱 **Desain Responsif**: Antarmuka bersih, cepat, dan nyaman digunakan baik di perangkat seluler maupun komputer.

---

## 🛠️ Teknologi yang Digunakan

* **Backend / API**: Google Apps Script (JavaScript)
* **Database**: Google Sheets
* **Frontend**: HTML5, CSS3, JavaScript (ES6)
* **Ikon & Font**: Lucide Icons, Google Fonts (Plus Jakarta Sans)

---

## 🚀 Cara Pemasangan (Setup Guide)

### 1. Buat Proyek Apps Script
1. Buka [Google Apps Script](https://script.google.com/).
2. Klik tombol **New project**.
3. Beri nama proyek Anda, contoh: `Task Manager App`.

### 2. Konfigurasi Kode
1. Salin seluruh isi dari file `Code.gs` ke editor Google Apps Script.
2. Buat file HTML baru di Apps Script dengan nama `Index` (akan menjadi `Index.html`).
3. Salin seluruh isi file `Index.html` ke file tersebut.
4. Simpan seluruh perubahan (`Ctrl + S` atau `Cmd + S`).

### 3. Inisialisasi Database
1. Pada menu navigasi fungsi di bagian atas editor Apps Script, pilih fungsi **`setupDatabase`**.
2. Klik tombol **Run / Jalankan**.
3. Berikan izin otorisasi akses ke Google Drive / Sheets saat diminta.
4. Fungsi ini secara otomatis akan membuat Google Spreadsheet baru bernama `Database To-Do List App Multiuser` dan menyimpan ID-nya ke `Script Properties`.

### 4. Publikasi Web App (Deployment)
1. Klik tombol **Deploy** di sudut kanan atas > pilih **New deployment**.
2. Klik ikon *gear* (Select type) > pilih **Web app**.
3. Isi konfigurasi sebagai berikut:
   * **Description**: `Task Manager Web App v1.0`
   * **Execute as**: `User accessing the web app` *(Penting agar aplikasi dapat mengidentifikasi akun pengguna yang sedang login)*
   * **Who has access**: `Anyone with Google account` atau `Anyone`
4. Klik **Deploy** dan salin **Web App URL** yang dihasilkan.

---

## 📁 Struktur Database (Google Sheets)

Tabel tugas disimpan otomatis pada sheet `Tasks` dengan struktur kolom sebagai berikut:

| Kolom A | Kolom B | Kolom C | Kolom D | Kolom E |
| :--- | :--- | :--- | :--- | :--- |
| **ID** | **Task** | **Status** | **CreatedAt** | **UserEmail** |
| `TASK_17123...` | Belajar Apps Script | `Pending` | `09/09/2026, 10:00:00` | `user@gmail.com` |

---

## 📜 Lisensi

Proyek ini dilisensikan di bawah **MIT License** - lihat file [LICENSE](LICENSE) untuk detail lebih lanjut.

```text
MIT License

Copyright (c) 2026 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.