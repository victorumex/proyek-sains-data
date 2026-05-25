import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Scan, Home, RotateCcw, ChevronLeft } from "lucide-react";
import SummaryTab from "../components/results/SummaryTab";
import StatsSection from "../components/results/StatsSection";
import ToothDetailList from "../components/results/ToothDetailList";
import RecommendationTab from "../components/results/RecommendationTab";
import ChatWidget from "../components/ChatWidget";

// Gambar cadangan jika API tidak mengirimkan URL
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80";

const MOCK_DATA = {
  overallSeverity: "moderate",
  summaryText: "Hasil analisis mendeteksi adanya karies pada beberapa area. (Data Contoh)",
  avgConfidence: 87.4,
  detections: [],
  recommendations: [
    { priority: "urgent", icon: "🚨", title: "Segera ke Dokter Gigi", desc: "Karies parah memerlukan penanganan segera." },
    { priority: "info", icon: "✅", title: "Jaga Kebersihan Rutin", desc: "Sikat gigi minimal 2x sehari dan gunakan benang gigi." },
  ]
};

export default function Results() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("summary");

  // 1. Ambil data asli dari state navigasi
  const apiResponse = location.state?.resultData;
  const analysis = apiResponse?.analysis || MOCK_DATA;
  const annotatedImageUrl = apiResponse?.url || DEFAULT_IMAGE;

  // 2. Mapping data deteksi (Menambahkan index dan cadangan box)
  const detectionsWithImages = (analysis.detections || []).map((det, index) => ({
    ...det,
    id: det.id || index + 1,
    cropUrl: det.crop_url || annotatedImageUrl, 
    label: det.label || "Karies Terdeteksi",
    confidence: det.confidence || 0,
    box: { x: 0, y: 0, w: '100%', h: '100%' }
  }));

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => navigate("/upload")} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Kembali</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-dental-green rounded-md flex items-center justify-center">
              <Scan className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-gray-900">Hasil Deteksi AI</span>
          </div>
          <div className="w-16" />
        </div>
      </header>

      {/* Grid Layout: Responsif (1 kolom di mobile, 12 kolom di desktop) */}
      <main className="max-w-6xl mx-auto px-4 py-6 lg:grid lg:grid-cols-12 lg:gap-8 pb-32">
        
        {/* KOLOM KIRI: Gambar Utama (Sticky di desktop agar tidak perlu scroll) */}
        <div className="lg:col-span-5 mb-6 lg:mb-0">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-24"
          >
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm flex flex-col items-center justify-center bg-gray-50">
              <img 
                src={annotatedImageUrl} 
                alt="Hasil Deteksi YOLOv8" 
                className="w-full h-auto object-contain max-h-[500px]"
              />
              <div className="w-full p-3 bg-white border-t border-gray-50 flex justify-center">
                 <span className="text-xs font-semibold text-dental-green flex items-center gap-2">
                   <Scan className="w-3 h-3"/> Terverifikasi Model YOLOv8
                 </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* KOLOM KANAN: Analisis, Rekomendasi, dan Detail */}
        <div className="lg:col-span-7 space-y-5">
          {/* Ringkasan Statistik */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <StatsSection data={{ ...analysis, totalDetected: detectionsWithImages.length }} />
          </motion.div>

          {/* Tab Konten (Analisis & Tindakan) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
          >
            <div className="flex border-b border-gray-100 bg-gray-50/50">
              {[
                { key: "summary", label: "Analisis" },
                { key: "recommendation", label: "Tindakan" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 py-3 text-sm font-bold transition-all relative ${
                    activeTab === tab.key ? "text-dental-green" : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.key && (
                    <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-dental-green" />
                  )}
                </button>
              ))}
            </div>
            <div className="p-5">
              {activeTab === "summary" ? (
                <SummaryTab data={analysis} />
              ) : (
                <RecommendationTab recommendations={analysis.recommendations || MOCK_DATA.recommendations} />
              )}
            </div>
          </motion.div>

          {/* Area Karies Terdeteksi */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-3 px-1">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Detail Temuan</h3>
              <span className="bg-dental-green-light text-dental-green text-[10px] font-bold px-2 py-1 rounded-full">
                {detectionsWithImages.length} AREA
              </span>
            </div>
            <ToothDetailList detections={detectionsWithImages} />
          </motion.div>
        </div>
      </main>

      {/* Navigasi Bawah */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex gap-3">
          <Link to="/" className="flex items-center justify-center gap-2 flex-1 py-3 rounded-xl border-2 border-gray-100 text-gray-600 font-semibold hover:border-gray-200 hover:bg-gray-50 transition-all text-sm">
            <Home className="w-4 h-4" />
            Beranda
          </Link>
          <Link to="/upload" className="flex items-center justify-center gap-2 flex-[2] py-3 rounded-xl bg-dental-green text-white font-bold hover:bg-dental-green-mid transition-all shadow-lg shadow-dental-green/20 text-sm">
            <RotateCcw className="w-4 h-4" />
            Scan Ulang Foto
          </Link>
        </div>
      </div>

      {/* Chatbot Widget */}
      <ChatWidget />
    </div>
  );
}