import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const severityStyles = {
  healthy: { dot: "bg-green-400", badge: "bg-green-50 text-green-700 border-green-200", bar: "bg-green-400" },
  mild: { dot: "bg-yellow-400", badge: "bg-yellow-50 text-yellow-700 border-yellow-200", bar: "bg-yellow-400" },
  moderate: { dot: "bg-orange-400", badge: "bg-orange-50 text-orange-700 border-orange-200", bar: "bg-orange-400" },
  severe: { dot: "bg-red-500", badge: "bg-red-50 text-red-700 border-red-200", bar: "bg-red-500" },
};

function ToothRow({ tooth, index }) {
  const s = severityStyles[tooth.severity];

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0"
    >
      <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${s.dot}`} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold text-gray-500">{tooth.id}</span>
          <span className="text-sm font-semibold text-gray-800 truncate">{tooth.name}</span>
        </div>
        {/* Confidence bar */}
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${tooth.confidence}%` }}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.05 }}
            className={`h-full rounded-full ${s.bar}`}
          />
        </div>
      </div>
      <div className="flex flex-col items-end gap-1 flex-shrink-0">
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${s.badge}`}>{tooth.label}</span>
        <span className="text-xs text-gray-400">{tooth.confidence}%</span>
      </div>
    </motion.div>
  );
}

export default function ToothDetailList({ teeth }) {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? teeth : teeth.slice(0, 6);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Detail per Gigi</h2>
          <span className="text-xs text-gray-400 bg-gray-50 rounded-full px-2.5 py-1 font-medium">{teeth.length} gigi</span>
        </div>
      </div>
      <div className="px-5">
        {displayed.map((tooth, i) => (
          <ToothRow key={tooth.id} tooth={tooth} index={i} />
        ))}
      </div>
      {teeth.length > 6 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full py-3.5 flex items-center justify-center gap-2 text-sm font-semibold text-dental-green hover:bg-dental-green-light transition-colors border-t border-gray-50"
        >
          {showAll ? (
            <><ChevronUp className="w-4 h-4" /> Tampilkan Lebih Sedikit</>
          ) : (
            <><ChevronDown className="w-4 h-4" /> Lihat {teeth.length - 6} Gigi Lainnya</>
          )}
        </button>
      )}
    </div>
  );
}