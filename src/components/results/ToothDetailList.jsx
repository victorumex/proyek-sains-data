import { motion } from "framer-motion";

const severityStyles = {
  mild:     { badge: "bg-yellow-50 text-yellow-700 border-yellow-300", ring: "ring-yellow-300", label: "Ringan" },
  moderate: { badge: "bg-orange-50 text-orange-700 border-orange-300", ring: "ring-orange-300", label: "Sedang" },
  severe:   { badge: "bg-red-50 text-red-700 border-red-300",          ring: "ring-red-400",    label: "Parah"  },
};

const confidenceColor = (conf) => {
  if (conf >= 90) return "text-red-600";
  if (conf >= 75) return "text-orange-500";
  return "text-yellow-600";
};

function DetectionCard({ detection, index }) {
  const s = severityStyles[detection.severity] || severityStyles.mild;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.07 }}
      className={`relative bg-white rounded-2xl border overflow-hidden shadow-sm ring-2 ${s.ring}`}
    >
      {/* Gambar potongan karies ASLI dari Backend (Tanpa efek CSS aneh-aneh) */}
      <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">
        <img
          src={detection.cropUrl}
          alt={`Deteksi karies #${detection.id}`}
          className="w-full h-full object-cover"
        />

        {/* Badge Nomor Deteksi */}
        <div className="absolute top-2 left-2 bg-black/60 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          #{detection.id}
        </div>
      </div>

      {/* Info Label dan Akurasi */}
      <div className="p-3 space-y-2">
        <div className="flex items-center justify-between gap-1">
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${s.badge}`}>
            {detection.label}
          </span>
          <span className={`text-sm font-extrabold ${confidenceColor(detection.confidence)}`}>
            {detection.confidence}%
          </span>
        </div>
        
        {/* Progress Bar Akurasi */}
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${detection.confidence}%` }}
            transition={{ duration: 0.7, delay: 0.3 + index * 0.07 }}
            className={`h-full rounded-full ${
              detection.severity === "severe" ? "bg-red-400" :
              detection.severity === "moderate" ? "bg-orange-400" : "bg-yellow-400"
            }`}
          />
        </div>
        <p className="text-xs text-gray-400">Keyakinan model AI</p>
      </div>
    </motion.div>
  );
}

export default function ToothDetailList({ detections = [] }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 pt-5 pb-3 flex items-center justify-between">
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Area Karies Terdeteksi</h2>
        <span className="text-xs text-gray-400 bg-gray-50 rounded-full px-2.5 py-1 font-medium">
          {detections.length} deteksi
        </span>
      </div>

      {detections.length === 0 ? (
        <div className="px-5 pb-6 text-center text-sm text-gray-400">Tidak ada karies terdeteksi 🎉</div>
      ) : (
        <div className="px-5 pb-5 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {detections.map((d, i) => (
            <DetectionCard key={d.id} detection={d} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}