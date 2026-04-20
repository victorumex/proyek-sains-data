# Deteksi Karies Gigi Berbasis Computer Vision pada Citra Intraoral dengan Deployment Berbasis Web Server-Side
Proyek ini adalah tugas proyek kelompok dari mata kuliah 'Proyek Sains Data' yang berada di Institut Teknologi Sepuluh Nopember, yang berisikan anggota:
1. Yendra Wijayanto -5052231005
2. Yizhar Bezaleel Yehuda Theodoris -5052231027
3. Akmal Sharif Ramdhan -5052231034

### Tujuan Proyek
Proyek ini bertujuan membangun sistem deteksi karies gigi secara otomatis menggunakan pendekatan object detection berbasis deep learning.
Model dirancang untuk mengidentifikasi dan melokalisasi lesi karies pada citra gigi (radiografi atau intra-oral) dalam bentuk bounding box, sehingga menghasilkan prediksi posisi karies secara visual beserta tingkat keyakinannya. 
Output model selanjutnya diintegrasikan ke dalam website yang berjalan dengan sistem server-side, sehingga dapat diakses setiap orang yang ingin melihat dan memastikan apakah terdapat karies pada gigi mereka.

### Data yang digunakan
Dataset yang digunakan bersumber dari platform Roboflow (Free Plan), yang menyediakan koleksi citra gigi 
berlabel dengan anotasi bounding box. Dataset dipilih berdasarkan ketersediaan label yang konsisten, variasi 
citra yang memadai, serta kemudahan akses dan manajemen augmentasi data secara langsung melalui 
platform tersebut. 
Karakteristik dataset: 
1. Sumber: Roboflow Universe (dataset publik berlabel karies gigi)
2. Deskripsi: Dataset yang digunakan untuk pelatihan berupa citra gigi dengan bounding box yang 
menunjukkan lokasi karies pada gigi, terdapat 2 kelas yaitu karies dan non-karies.
3. Format anotasi: YOLO format (.txt bounding box) 

### Metode yang digunakan
Metode utama yang dipilih adalah YOLOv8 (You Only Look Once versi 8) sebagai arsitektur object detection 
utama (Model sudah tersedia di Roboflow Universe), dengan Faster R-CNN sebagai metode komparasi untuk 
evaluasi performa. YOLOv8 beroperasi secara single-stage, memproses seluruh gambar dalam satu forward 
pass sehingga menghasilkan kecepatan inferensi tinggi yang esensial untuk penggunaan real-time di aplikasi 
mobile. 
Alasan pemilihan model dari Roboflow yang berbasis arsitektur YOLOv8: 
1. Kecepatan inferensi tinggi (real-time)
2. Model sudah terlatih pada dataset karies gigi, tidak memerlukan proses training dari awal
3. Ekosistem Roboflow mendukung manajemen dataset, versioning, dan deployment secara terpadu
4. Hemat sumber daya komputasi.
