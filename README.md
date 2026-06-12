# DentiScan AI: Deteksi Karies Gigi Berbasis Computer Vision pada Citra Intraoral dengan Deployment Berbasis Web Server-Side

Proyek ini merupakan Laporan Akhir Tugas Besar untuk mata kuliah **Project Sains Data** di **Institut Teknologi Sepuluh Nopember (ITS)**.

### Anggota Kelompok 1 (Sains Data '22)
1. **Yendra Wijayanto** - 5052231005
2. **Yizhar Bezaleel Yehuda Theodoris** - 5052231027
3. **Akmal Sharif Ramdhan** - 5052231034

---

## Tujuan Proyek
Proyek ini membangun **DentiScan AI**, sebuah sistem skrining otomatis untuk mendeteksi dan melokalisasi karies gigi pada citra intraoral secara otomatis menggunakan pendekatan *object detection* berbasis *deep learning*. 

Sistem ini membandingkan keandalan arsitektur *one-stage detector* (**YOLOv8s**) dengan *two-stage detector* (**Faster R-CNN** dengan backbone *MobileNetV3-Large-FPN*). Output model diintegrasikan ke dalam ekosistem aplikasi web berbasis *server-side* (FastAPI + React) yang dilengkapi dengan fitur *auto-cropping* area karies, *result dashboard*, serta asisten virtual edukasi kesehatan gigi yang ditenagai oleh Google Gemini API.

## Karakteristik Dataset
* **Sumber Data:** Dataset publik benchmark dari Ahmed et al. (2025) yang dipublikasikan melalui repositori Zenodo (DOI: 10.5281/zenodo.14827784).
* **Jumlah Data:** 6.313 citra intraoral format JPG.
* **Kelas Anotasi:**
  1. `Primary Decay (d)`: Kerusakan karies pada fase gigi sulung (anak-anak).
  2. `Permanent Decay (D)`: Kerusakan karies pada fase gigi permanen (dewasa).
* **Format Anotasi:** Format standar YOLO (`.txt` bounding box) dan Pascal VOC (`.xml`).
* **Metode Penanganan Imbalance:** Augmentasi data offline menggunakan library *Albumentations* khusus pada kelas minoritas (`Primary Decay`), berhasil mendongkrak proporsi representasi kelas dari 8,7% ke 17,9%.

## Metode & Pemodelan AI
* **YOLOv8s (Model Utama):** Dipilih karena kecepatan inferensi yang sangat tinggi (1,4 ms per citra) serta performa mAP@0.5 yang unggul mencapai **0,6888** pada subset data pengujian (*test set*).
* **Faster R-CNN (Model Komparasi):** Menggunakan backbone *MobileNetV3-Large-FPN* demi efisiensi VRAM. Model mengalami *overfitting* yang signifikan dengan raihan mAP@0.5 akhir sebesar **0,2668** dan gagal mengenali kelas minoritas di data uji.

---

## Tutorial Pemakaian (How to Run)

Ikuti langkah-langkah di bawah ini untuk mereplikasi dan menjalankan proyek DentiScan AI secara lokal di perangkat Anda.

### Prasyarat Sistem
Pastikan laptop Anda telah terpasang:
1. **Git**
2. **Docker Desktop** (Pastikan aplikasi dalam status *Running*)
3. **Node.js** (Versi 18 atau yang terbaru)

---

### Langkah 1: Kloning Repositori Proyek
Buka terminal (Command Prompt / PowerShell), arahkan ke folder direktori bersih pilihan Anda, lalu jalankan perintah berikut:
```bash
git clone [https://github.com/victorumex/proyek-sains-data.git](https://github.com/victorumex/proyek-sains-data.git)
cd proyek-sains-data
```

### Langkah 2: Menjalankan Backend API via Docker
Kami telah mengemas ekosistem backend ke dalam kontainer Docker berbasis CPU yang sangat ringan untuk menjamin reprodusibilitas sistem bebas konflik library. Eksekusi perintah satu baris di bawah ini pada PowerShell Anda:
```bash
docker run -d -p 8000:8000 --name dentiscan-api -e GEMINI_API_KEY="ISI_GEMINI_API_KEY_ANDA" -e SUPABASE_URL="ISI_SUPABASE_URL_ANDA" -e SUPABASE_KEY="ISI_SUPABASE_SERVICE_KEY_ANDA" yizharth/dentiscan-backend:v3
```
**Verifikasi Backend:**

1. Buka aplikasi Docker Desktop dan pastikan container bernama dentiscan-api menyala dengan indikator ikon Hijau (Running).
2. Buka browser dan akses alamat http://localhost:8000/. Pastikan memuat respon JSON: {"message": "DentiScan Backend is Live!"}.

### Langkah 3: Menjalankan Frontend React (Vite)
Buka tab terminal atau PowerShell baru, lalu masuk ke direktori frontend proyek untuk menginstal dependensi interface serta menyalakan server lokal:

```bash
# Masuk ke direktori frontend
cd base44

# Mengunduh semua dependensi package UI
npm install

# Menjalankan local development server
npm run dev
```
### Langkah 4: Akses Aplikasi Sistem
Buka web browser pilihan Anda (Google Chrome / Microsoft Edge), lalu akses alamat lokal yang diberikan oleh Vite:
```bash
http://localhost:5173
```
## Alur Penggunaan Fitur Utama di Aplikasi:
1. **Landing Page:** Halaman orientasi awal mengenai dampak karies gigi global dan cara kerja skrining teknologi AI.
2. **Halaman Unggah (Upload Page):** Anda dapat mengambil foto rongga mulut secara langsung menggunakan kamera (mendukung front/rear camera toggle dan kontrol lampu flash) atau memilih file gambar dari galeri lokal.
3. **Dashboard Hasil Analisis:** Menampilkan visualisasi kotak deteksi lokasi karies gigi beserta nilai confidence score, persentase tingkat keparahan, serta panel potongan gambar otomatis (auto-cropped image) per gigi yang terinfeksi lesi karies.
4. **Floating Chatbot AI:** Gunakan fitur asisten kesehatan virtual di pojok kanan bawah layar untuk berkonsultasi secara interaktif mengenai hasil deteksi skrining gigi Anda.
