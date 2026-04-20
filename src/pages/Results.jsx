import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Scan, Home, RotateCcw, ChevronLeft } from "lucide-react";
import SummaryTab from "../components/results/SummaryTab";
import StatsSection from "../components/results/StatsSection";
import ToothDetailList from "../components/results/ToothDetailList";
import RecommendationTab from "../components/results/RecommendationTab";
import SeverityScale from "../components/results/SeverityScale";

const MOCK_DATA = {
  overallSeverity: "moderate",
  summaryText: "Hasil analisis mendeteksi adanya karies pada beberapa gigi dengan tingkat keparahan sedang. Ditemukan 3 gigi dengan indikasi karies aktif yang memerlukan perhatian segera, sementara 2 gigi lainnya menunjukkan tanda-tanda awal yang perlu dipantau.",
  totalDetected: 5,
  avgConfidence: 87.4,
  maxSeverity: "severe",
  teeth: [
    { id: "G-11", name: "Gigi Seri Kanan Atas", severity: "healthy", confidence: 96, label: "Sehat" },
    { id: "G-12", name: "Gigi Lateral Kanan Atas", severity: "mild", confidence: 78, label: "Karies Ringan" },
    { id: "G-13", name: "Gigi Taring Kanan Atas", severity: "moderate", confidence: 91, label: "Karies Sedang" },
    { id: "G-14", name: "Gigi Premolar Kanan Atas", severity: "severe", confidence: 94, label: "Karies Parah" },
    { id: "G-21", name: "Gigi Seri Kiri Atas", severity: "healthy", confidence: 98, label: "Sehat" },
    { id: "G-22", name: "Gigi Lateral Kiri Atas", severity: "moderate", confidence: 85, label: "Karies Sedang" },
    { id: "G-23", name: "Gigi Taring Kiri Atas", severity: "mild", confidence: 72, label: "Karies Ringan" },
    { id: "G-31", name: "Gigi Seri Kiri Bawah", severity: "healthy", confidence: 95, label: "Sehat" },
    { id: "G-32", name: "Gigi Lateral Kiri Bawah", severity: "severe", confidence: 89, label: "Karies Parah" },
    { id: "G-41", name: "Gigi Seri Kanan Bawah", severity: "healthy", confidence: 97, label: "Sehat" },
    { id: "G-42", name: "Gigi Lateral Kanan Bawah", severity: "mild", confidence: 75, label: "Karies Ringan" },
    { id: "G-43", name: "Gigi Taring Kanan Bawah", severity: "moderate", confidence: 88, label: "Karies Sedang" },
  ],
  recommendations: [
    { priority: "urgent", icon: "🚨", title: "Segera ke Dokter Gigi", desc: "2 gigi (G-14, G-32) menunjukkan karies parah yang memerlukan penanganan segera dalam 1-2 minggu." },
    { priority: "high", icon: "⚠️", title: "Perawatan Lanjutan", desc: "3 gigi dengan karies sedang perlu penambalan dalam 1-2 bulan untuk mencegah kerusakan lebih lanjut." },
    { priority: "medium", icon: "🔍", title: "Pantau Gigi Ringan", desc: "3 gigi dengan karies ringan perlu dipantau dan dijaga kebersihannya secara rutin." },
    { priority: "info", icon: "✅", title: "Jaga Kebersihan Rutin", desc: "Sikat gigi minimal 2x sehari, gunakan benang gigi, dan batasi makanan manis serta minuman bersoda." },
  ]
};

export default function Results() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("summary");

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => navigate("/upload")} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Kembali</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-dental-green rounded-md flex items-center justify-center">
              <Scan className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-gray-900">Hasil Deteksi</span>
          </div>
          <div className="w-16" />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-5 pb-32">
        {/* Severity scale banner */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <SeverityScale severity={MOCK_DATA.overallSeverity} />
        </motion.div>

        {/* Tab switcher: Summary / Recommendation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
        >
          <div className="flex border-b border-gray-100">
            {[
              { key: "summary", label: "Ringkasan" },
              { key: "recommendation", label: "Rekomendasi" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 py-3.5 text-sm font-semibold transition-all relative ${
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
              <SummaryTab data={MOCK_DATA} />
            ) : (
              <RecommendationTab recommendations={MOCK_DATA.recommendations} />
            )}
          </div>
        </motion.div>

        {/* Detection Statistics */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <StatsSection data={MOCK_DATA} />
        </motion.div>

        {/* Detail per tooth */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <ToothDetailList teeth={MOCK_DATA.teeth} />
        </motion.div>
      </main>

      {/* Bottom action bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 z-40">
        <div className="max-w-2xl mx-auto px-4 py-4 flex gap-3">
          <Link to="/" className="flex items-center justify-center gap-2 flex-1 py-3 rounded-xl border-2 border-gray-100 text-gray-600 font-semibold hover:border-gray-200 hover:bg-gray-50 transition-all text-sm">
            <Home className="w-4 h-4" />
            Beranda
          </Link>
          <Link to="/upload" className="flex items-center justify-center gap-2 flex-[2] py-3 rounded-xl bg-dental-green text-white font-bold hover:bg-dental-green-mid transition-all shadow-md shadow-dental-green/20 text-sm">
            <RotateCcw className="w-4 h-4" />
            Scan Ulang
          </Link>
        </div>
      </div>
    </div>
  );
}