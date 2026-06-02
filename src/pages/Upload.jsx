import axios from 'axios';
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Camera, ImageUp, Scan, ArrowLeft, X, Check, AlertCircle, RefreshCw } from "lucide-react";

export default function Upload() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const [mode, setMode] = useState(null); // null | 'camera' | 'preview'
  const [preview, setPreview] = useState(null);
  const [cameraStream, setCameraStream] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [facingMode, setFacingMode] = useState("environment"); // default kamera belakang

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    setMode("preview");
  };

  const startCamera = async (mode) => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: { ideal: mode } }, 
        audio: false 
      });
      setCameraStream(stream);
      setMode("camera");
    } catch (err) {
      console.error(err);
      setError("Kamera tidak dapat diakses. Silakan coba unggah dari galeri.");
    }
  };

  const handleOpenCamera = () => {
    setFacingMode("environment");
    startCamera("environment");
  };

  const handleToggleCamera = () => {
    // Matikan stream kamera yang sedang menyala sebelum pindah
    if (cameraStream) {
      cameraStream.getTracks().forEach(t => t.stop());
    }
    // Tukar mode
    const newMode = facingMode === "environment" ? "user" : "environment";
    setFacingMode(newMode);
    startCamera(newMode);
  };

  const handleCapture = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
    const url = canvas.toDataURL("image/jpeg");
    setPreview(url);
    stopCamera();
    setMode("preview");
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(t => t.stop());
      setCameraStream(null);
    }
  };

  const handleReset = () => {
    stopCamera();
    setPreview(null);
    setMode(null);
    setError(null);
  };

  const handleAnalyze = async () => {
    setAnalyzing(true);
    const formData = new FormData();
    
    // Ambil file asli dari input/kamera
    const responseBlob = await fetch(preview);
    const blob = await responseBlob.blob();
    formData.append('file', blob, 'image.jpg');

    try {
      const res = await axios.post('https://yizhar-dentiscan-api.hf.space/predict', formData);
      localStorage.setItem("dentiscan_summary", res.data.analysis.summaryText);
      navigate("/results", { state: { resultData: res.data } });
    } catch (err) {
      setError("Gagal menghubungi server AI.");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" onClick={handleReset} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Kembali</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-dental-green rounded-md flex items-center justify-center">
              <Scan className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-gray-900">DentiScan AI</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        <div className="w-full max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Unggah Foto Gigi</h1>
            <p className="text-gray-500">Ambil foto atau pilih dari galeri untuk memulai analisis AI</p>
          </motion.div>

          <AnimatePresence mode="wait">
            {/* Initial choice */}
            {mode === null && (
              <motion.div
                key="choice"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="bg-white rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 p-8"
              >
                {error && (
                  <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl p-4">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleOpenCamera}
                    className="flex flex-col items-center gap-4 p-8 rounded-2xl border-2 border-dashed border-dental-green/30 hover:border-dental-green hover:bg-dental-green-light transition-all duration-300 group cursor-pointer"
                  >
                    <div className="w-16 h-16 bg-dental-green-light group-hover:bg-dental-green/20 rounded-2xl flex items-center justify-center transition-colors">
                      <Camera className="w-8 h-8 text-dental-green" />
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-gray-900 text-sm">Ambil Foto</p>
                      <p className="text-xs text-gray-400 mt-1">Gunakan kamera</p>
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center gap-4 p-8 rounded-2xl border-2 border-dashed border-gray-200 hover:border-dental-green hover:bg-dental-green-light transition-all duration-300 group cursor-pointer"
                  >
                    <div className="w-16 h-16 bg-gray-50 group-hover:bg-dental-green/20 rounded-2xl flex items-center justify-center transition-colors">
                      <ImageUp className="w-8 h-8 text-gray-400 group-hover:text-dental-green transition-colors" />
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-gray-900 text-sm">Dari Galeri</p>
                      <p className="text-xs text-gray-400 mt-1">Pilih dari perangkat</p>
                    </div>
                  </motion.button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileSelect}
                />

                <div className="mt-6 flex items-center gap-3 p-4 bg-dental-green-light rounded-xl">
                  <div className="w-8 h-8 bg-dental-green/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Scan className="w-4 h-4 text-dental-green" />
                  </div>
                  <p className="text-xs text-dental-green-dark leading-relaxed">
                    <strong>Tips:</strong> Pastikan foto jelas, dengan pencahayaan yang cukup dan gigi terlihat seluruhnya untuk hasil terbaik.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Camera view */}
            {mode === "camera" && (
              <motion.div
                key="camera"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-black rounded-3xl overflow-hidden shadow-2xl relative"
              >
                <div className="relative">
                  {/* LOGIKA MIRROR HANYA UNTUK KAMERA DEPAN */}
                  <video 
                    autoPlay 
                    playsInline 
                    muted 
                    className="w-full aspect-[4/3] object-cover bg-black"
                    style={{ transform: facingMode === "user" ? "scaleX(-1)" : "scaleX(1)" }} 
                    ref={(el) => {
                      videoRef.current = el; 
                      if (el && cameraStream && el.srcObject !== cameraStream) {
                        el.srcObject = cameraStream;
                      }
                    }}
                  />
                  
                  {/* Scan overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-4/5 h-3/4 border-2 border-dental-green/60 rounded-2xl relative">
                      <div className="absolute top-0 left-0 w-6 h-6 border-t-3 border-l-3 border-dental-green rounded-tl-lg" style={{ borderWidth: '3px' }} />
                      <div className="absolute top-0 right-0 w-6 h-6 border-t-3 border-r-3 border-dental-green rounded-tr-lg" style={{ borderWidth: '3px' }} />
                      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-3 border-l-3 border-dental-green rounded-bl-lg" style={{ borderWidth: '3px' }} />
                      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-3 border-r-3 border-dental-green rounded-br-lg" style={{ borderWidth: '3px' }} />
                    </div>
                  </div>

                  {/* TOMBOL GANTI KAMERA (KIRI ATAS) */}
                  <button
                    onClick={handleToggleCamera}
                    className="absolute top-4 left-4 w-9 h-9 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>

                  {/* TOMBOL TUTUP KAMERA (KANAN ATAS) */}
                  <button
                    onClick={handleReset}
                    className="absolute top-4 right-4 w-9 h-9 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Tombol Jepret */}
                <div className="p-6 flex justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCapture}
                    className="w-16 h-16 rounded-full border-4 border-white bg-dental-green shadow-lg hover:bg-dental-green-mid transition-colors"
                  />
                </div>
              </motion.div>
            )}

            {/* Preview */}
            {mode === "preview" && (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
              >
                <div className="relative">
                  <img src={preview} alt="Preview" className="w-full aspect-[4/3] object-cover" />
                  <button
                    onClick={handleReset}
                    className="absolute top-4 right-4 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center text-gray-700 hover:bg-white shadow-md transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded-lg px-3 py-1.5 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-dental-green" />
                    <span className="text-xs font-semibold text-gray-700">Foto siap dianalisis</span>
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAnalyze}
                    disabled={analyzing}
                    className="w-full bg-dental-green hover:bg-dental-green-mid text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-dental-green/20 disabled:opacity-70"
                  >
                    {analyzing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Menganalisis...
                      </>
                    ) : (
                      <>
                        <Scan className="w-5 h-5" />
                        Analisis Sekarang
                      </>
                    )}
                  </motion.button>
                  <button
                    onClick={handleReset}
                    className="w-full bg-gray-50 hover:bg-gray-100 text-gray-600 font-medium py-3 rounded-2xl transition-colors text-sm"
                  >
                    Ganti Foto
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Steps indicator */}
          {mode === null && (
            <div className="mt-8 flex items-center justify-center gap-6">
              {["Unggah Foto", "Analisis AI", "Lihat Hasil"].map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-dental-green text-white' : 'bg-gray-100 text-gray-400'}`}>
                    {i + 1}
                  </div>
                  <span className={`text-xs font-medium ${i === 0 ? 'text-gray-700' : 'text-gray-400'}`}>{s}</span>
                  {i < 2 && <div className="w-8 h-px bg-gray-200" />}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}