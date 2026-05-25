import { motion } from "framer-motion";
import { Activity, Target } from "lucide-react";

export default function StatsSection({ data }) {
  const confidenceColor = data.avgConfidence >= 90 ? "#2ECC71" : data.avgConfidence >= 75 ? "#E67E22" : "#E74C3C";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Statistik Deteksi</h2>
      <div className="grid grid-cols-2 gap-4">
        {/* Caries count */}
        <div className="bg-red-50 border border-red-100 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-red-500" />
            <span className="text-xs font-semibold text-red-600">Karies Terdeteksi</span>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
            className="text-4xl font-extrabold text-red-600"
          >
            {data.totalDetected}
          </motion.div>
          <p className="text-xs text-red-400 mt-1">area karies pada foto</p>
        </div>

        {/* Avg confidence */}
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-gray-500" />
            <span className="text-xs font-semibold text-gray-600">Rata-rata Kepercayaan</span>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
            className="text-4xl font-extrabold"
            style={{ color: confidenceColor }}
          >
            {data.avgConfidence}%
          </motion.div>
          <p className="text-xs text-gray-400 mt-1">akurasi model AI</p>
        </div>
      </div>

      {/* Confidence bar */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-gray-400 mb-1.5">
          <span>Tingkat Kepercayaan AI</span>
          <span className="font-semibold" style={{ color: confidenceColor }}>{data.avgConfidence}%</span>
        </div>
        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${data.avgConfidence}%` }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-dental-green to-green-400"
          />
        </div>
      </div>
    </div>
  );
}