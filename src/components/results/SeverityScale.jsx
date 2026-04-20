import { motion } from "framer-motion";

const severityConfig = {
  healthy: { label: "Sehat", position: 5, color: "#2ECC71", bg: "from-green-400 to-green-500", textColor: "text-green-700", bgLight: "bg-green-50", border: "border-green-200" },
  mild: { label: "Ringan", position: 35, color: "#F1C40F", bg: "from-yellow-400 to-yellow-500", textColor: "text-yellow-700", bgLight: "bg-yellow-50", border: "border-yellow-200" },
  moderate: { label: "Sedang", position: 62, color: "#E67E22", bg: "from-orange-400 to-orange-500", textColor: "text-orange-700", bgLight: "bg-orange-50", border: "border-orange-200" },
  severe: { label: "Parah", position: 92, color: "#E74C3C", bg: "from-red-500 to-red-600", textColor: "text-red-700", bgLight: "bg-red-50", border: "border-red-200" },
};

export default function SeverityScale({ severity }) {
  const config = severityConfig[severity];

  return (
    <div className={`rounded-2xl border ${config.border} ${config.bgLight} p-5`}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Tingkat Keparahan Keseluruhan</p>
          <p className={`text-2xl font-extrabold ${config.textColor}`}>{config.label}</p>
        </div>
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${config.bg} flex items-center justify-center shadow-lg`}>
          <span className="text-2xl">{severity === 'healthy' ? '😁' : severity === 'mild' ? '🙂' : severity === 'moderate' ? '😟' : '😣'}</span>
        </div>
      </div>

      {/* Gradient scale */}
      <div className="relative mt-4">
        <div className="h-3 rounded-full bg-gradient-to-r from-green-400 via-yellow-400 via-orange-400 to-red-500 shadow-inner" />
        <motion.div
          initial={{ left: '0%' }}
          animate={{ left: `calc(${config.position}% - 10px)` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="absolute -top-1 w-5 h-5 bg-white rounded-full border-2 shadow-md"
          style={{ borderColor: config.color }}
        />
      </div>

      <div className="flex justify-between mt-2">
        {["Sehat", "Ringan", "Sedang", "Parah"].map((l) => (
          <span key={l} className="text-xs text-gray-400 font-medium">{l}</span>
        ))}
      </div>
    </div>
  );
}