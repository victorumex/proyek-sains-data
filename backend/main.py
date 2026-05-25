import os
import uuid
import httpx
import cv2
import numpy as np
import base64 # Tambahkan library ini untuk convert gambar crop
from dotenv import load_dotenv
from ultralytics import YOLO
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai


# 1. Load Environment & Model
load_dotenv()
model_path = r"C:\Users\Lenovo\OneDrive\ドキュメント\Python\.ipynb_checkpoints\Semester 6\Proyek Sains Data\base44\backend\model\yolov8s_caries.pt"
model = YOLO(model_path)
api_key = os.getenv("GEMINI_API_KEY")

# 3. KONFIGURASI (Wajib paling atas sebelum pakai genai apapun)
if api_key:
    genai.configure(api_key=api_key)
    print("--- Konfigurasi API Key Berhasil ---")
else:
    print("--- ERROR: API Key Tidak Ditemukan! Cek file .env Anda ---")

# 4. Baru boleh List Models atau Inisialisasi Model
try:
    print("Daftar Model yang Tersedia:")
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(f"- {m.name}")
    
    # Pilih model yang muncul di daftar tadi (biasanya models/gemini-1.5-flash)
    model_chat = genai.GenerativeModel('gemini-2.5-flash')
except Exception as e:
    print(f"Gagal inisialisasi AI: {e}")

# 2. Inisialisasi APP
app = FastAPI()

# 3. Middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "DentiScan Backend is Live!"}


@app.post("/predict")
async def upload_and_predict(file: UploadFile = File(...)):
    try:
        # Baca file
        file_content = await file.read()
        if not file_content:
            raise HTTPException(status_code=400, detail="File kosong")

        # Konversi ke numpy image (BGR)
        arr = np.frombuffer(file_content, dtype=np.uint8)
        img = cv2.imdecode(arr, cv2.IMREAD_COLOR)
        if img is None:
            raise HTTPException(status_code=400, detail="Gagal membaca gambar")

        # Jalankan inference
        results = model(img, conf=0.15)
        r = results[0]

        # Ambil boxes (bisa kosong)
        boxes = getattr(r, "boxes", [])
        detections_data = []
        total_conf = 0.0

        # === LOOP TUNGGAL UNTUK EKSTRAK DATA & CROP GAMBAR ===
        for i, box in enumerate(boxes):
            # 1. Ambil Confidence & Class
            try:
                conf = float(box.conf[0]) * 100.0
            except Exception:
                conf = float(getattr(box, "conf", 0.0)) * 100.0

            try:
                cls_idx = int(box.cls[0])
            except Exception:
                cls_idx = int(getattr(box, "cls", 0))

            label = r.names.get(cls_idx, str(cls_idx)) if hasattr(r, "names") else str(cls_idx)
            sev = "mild" if conf < 75 else "moderate" if conf < 90 else "severe"

            # 2. Ambil Koordinat dan pastikan jadi Integer
            xyxy = box.xyxy[0].tolist()
            x1, y1, x2, y2 = map(int, xyxy) 
            w = x2 - x1
            h = y2 - y1

            # 3. Potong (Crop) Gambar pakai OpenCV dari gambar asli (img)
            # Format pemotongan OpenCV adalah img[y_start:y_end, x_start:x_end]
            crop_img = img[y1:y2, x1:x2]

            # 4. Convert hasil crop ke Base64 (agar langsung tampil di frontend tanpa upload Supabase)
            success_crop, buffer = cv2.imencode('.jpg', crop_img)
            if success_crop:
                crop_b64 = base64.b64encode(buffer).decode('utf-8')
                crop_url = f"data:image/jpeg;base64,{crop_b64}"
            else:
                crop_url = "" # Fallback jika gagal crop

            # 5. Masukkan ke JSON Response
            detections_data.append({
                "id": i + 1,
                "label": label,
                "severity": sev,
                "confidence": round(conf, 1),
                "box": {"x": x1, "y": y1, "w": w, "h": h},
                "crop_url": crop_url  # Frontend akan menggunakan ini untuk gambar kecil
            })
            total_conf += conf

        # === PROSES UPLOAD GAMBAR UTAMA KE SUPABASE ===
        num_boxes = len(boxes) if boxes is not None else 0
        avg_conf = round(total_conf / num_boxes, 1) if num_boxes > 0 else 0.0
        overall_sev = "healthy" if num_boxes == 0 else ("moderate" if num_boxes > 2 else "mild")

        # Gambar beranotasi utuh
        annotated = r.plot() if hasattr(r, "plot") else img
        success, encoded_img = cv2.imencode(".jpg", annotated)
        if not success:
            raise HTTPException(status_code=500, detail="Gagal meng-encode gambar anotasi")
        annotated_bytes = encoded_img.tobytes()

        SUPABASE_URL = os.getenv("SUPABASE_URL")
        SUPABASE_KEY = os.getenv("SUPABASE_KEY")
        if not SUPABASE_URL or not SUPABASE_KEY:
            raise HTTPException(status_code=500, detail="SUPABASE_URL atau SUPABASE_KEY tidak dikonfigurasi")

        unique_name = f"{uuid.uuid4()}_{file.filename.replace(' ', '_')}"
        storage_path = f"uploads/{unique_name}"
        bucket = "dental-images"

        headers = {
            "Authorization": f"Bearer {SUPABASE_KEY}",
            "apikey": SUPABASE_KEY
        }

        async with httpx.AsyncClient(timeout=30.0) as client:
            storage_url = f"{SUPABASE_URL}/storage/v1/object/{bucket}/{storage_path}"
            res_s = await client.post(
                storage_url,
                content=annotated_bytes,
                headers={**headers, "Content-Type": "image/jpeg"}
            )
            
            if not res_s.is_success:
                raise HTTPException(status_code=502, detail=f"Upload ke storage gagal: {res_s.status_code}")

            public_url = f"{SUPABASE_URL}/storage/v1/object/public/{bucket}/{storage_path}"
            db_url = f"{SUPABASE_URL}/rest/v1/dental_images"
            db_data = {"original_name": file.filename, "image_url": public_url}

            res_db = await client.post(
                db_url,
                json=db_data,
                headers={**headers, "Content-Type": "application/json"}
            )

            if not res_db.is_success:
                raise HTTPException(status_code=502, detail=f"Penyimpanan metadata gagal: {res_db.status_code}")

        # Kembalikan JSON ke React
        return {
            "status": "success",
            "url": public_url,
            "analysis": {
                "overallSeverity": overall_sev,
                "avgConfidence": avg_conf,
                "summaryText": f"AI mendeteksi {num_boxes} area karies pada gigi Anda.",
                "detections": detections_data
            }
        }

    except HTTPException:
        raise
    except Exception as e:
        print("ERROR:", str(e))
        raise HTTPException(status_code=500, detail="Terjadi kesalahan pada server")


@app.post("/chat")
async def chat_api(data: dict):
    try:
        user_msg = data.get("message")
        
        # PERSINGKAT CONTEXT DI SINI
        context = "Anda adalah DentiScan AI. Jawablah dengan sangat ringkas, ramah, dan langsung ke inti pertanyaan. Jangan buat penjelasan panjang lebar. Fokus pada jawaban yang membantu pengguna memahami hasil deteksi karies gigi mereka."
        
        response = model_chat.generate_content(f"{context}\n\nUser: {user_msg}")
        return {"reply": response.text}
    except Exception as e:
        return {"reply": "Maaf, sistem sedang sibuk."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)