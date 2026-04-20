import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const severityStyles = {
  healthy:  { dot: "bg-green-400",  badge: "bg-green-50 text-green-700 border-green-200",   bar: "bg-green-400",  fill: "#2ECC71", stroke: "#27ae60" },
  mild:     { dot: "bg-yellow-400", badge: "bg-yellow-50 text-yellow-700 border-yellow-200", bar: "bg-yellow-400", fill: "#F1C40F", stroke: "#d4ac0d" },
  moderate: { dot: "bg-orange-400", badge: "bg-orange-50 text-orange-700 border-orange-200", bar: "bg-orange-400", fill: "#E67E22", stroke: "#ca6f1e" },
  severe:   { dot: "bg-red-500",    badge: "bg-red-50 text-red-700 border-red-200",          bar: "bg-red-500",   fill: "#E74C3C", stroke: "#c0392b" },
};

// SVG tooth shapes by type
function ToothSVG({ type, fill, stroke }) {
  const f = fill + "33"; // light fill
  const s = stroke;

  const shapes = {
    incisor: (
      // Flat, rectangular — gigi seri
      <svg viewBox="0 0 40 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="8" y="2" width="24" height="10" rx="3" fill={s} opacity="0.3"/>
        <path d="M6 12 Q5 28 8 38 Q10 48 20 50 Q30 48 32 38 Q35 28 34 12 Z" fill={f} stroke={s} strokeWidth="2"/>
        <path d="M13 18 Q13 35 20 42" stroke={s} strokeWidth="1" opacity="0.4" strokeLinecap="round"/>
      </svg>
    ),
    lateral: (
      // Slightly narrower incisor
      <svg viewBox="0 0 36 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="9" y="2" width="18" height="9" rx="3" fill={s} opacity="0.3"/>
        <path d="M7 11 Q6 27 9 37 Q11 47 18 49 Q25 47 27 37 Q30 27 29 11 Z" fill={f} stroke={s} strokeWidth="2"/>
        <path d="M13 17 Q13 33 18 40" stroke={s} strokeWidth="1" opacity="0.4" strokeLinecap="round"/>
      </svg>
    ),
    canine: (
      // Pointed — gigi taring
      <svg viewBox="0 0 36 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect x="9" y="2" width="18" height="9" rx="3" fill={s} opacity="0.3"/>
        <path d="M7 11 Q5 24 9 36 Q13 50 18 54 Q23 50 27 36 Q31 24 29 11 Z" fill={f} stroke={s} strokeWidth="2"/>
        <path d="M14 16 Q14 36 18 48" stroke={s} strokeWidth="1" opacity="0.4" strokeLinecap="round"/>
      </svg>
    ),
    premolar: (
      // Two cusps — gigi premolar
      <svg viewBox="0 0 44 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M8 4 Q8 2 14 2 L18 2 Q20 0 22 2 L26 2 Q32 2 32 4 L34 12 L10 12 Z" fill={s} opacity="0.3"/>
        <path d="M8 12 Q6 26 8 36 Q10 48 22 50 Q34 48 36 36 Q38 26 36 12 Z" fill={f} stroke={s} strokeWidth="2"/>
        <line x1="22" y1="12" x2="22" y2="30" stroke={s} strokeWidth="1.5" opacity="0.35" strokeLinecap="round"/>
        <path d="M12 20 Q17 16 22 20 Q27 24 32 20" stroke={s} strokeWidth="1" opacity="0.4" fill="none"/>
      </svg>
    ),
    molar: (
      // Wide, multi-cusp — gigi geraham
      <svg viewBox="0 0 52 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path d="M6 4 Q6 2 14 2 L20 2 Q22 0 26 2 L32 2 Q40 2 44 4 L46 12 L6 12 Z" fill={s} opacity="0.3"/>
        <path d="M6 12 Q4 26 6 36 Q9 48 26 50 Q43 48 46 36 Q48 26 46 12 Z" fill={f} stroke={s} strokeWidth="2"/>
        <line x1="26" y1="12" x2="26" y2="32" stroke={s} strokeWidth="1.5" opacity="0.35" strokeLinecap="round"/>
        <line x1="6" y1="26" x2="46" y2="26" stroke={s} strokeWidth="1" opacity="0.25" strokeLinecap="round"/>
        <path d="M10 20 Q18 15 26 20 Q34 25 42 20" stroke={s} strokeWidth="1" opacity="0.35" fill="none"/>
      </svg>
    ),
  };

  return shapes[type] || shapes.incisor;
}

// Map tooth ID prefix to shape type
function getToothType(id) {
  const num = parseInt(id.split("-")[1] || "0");
  if (num === 11 || num === 21 || num === 31 || num === 41) return "incisor";
  if (num === 12 || num === 22 || num === 32 || num === 42) return "lateral";
  if (num === 13 || num === 23 || num === 33 || num === 43) return "canine";
  if (num === 14 || num === 15 || num === 24 || num === 25 ||
      num === 34 || num === 35 || num === 44 || num === 45) return "premolar";
  return "molar";
}

function ToothRow({ tooth, index }) {
  const s = severityStyles[tooth.severity];
  const toothType = getToothType(tooth.id);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0"
    >
      {/* Tooth illustration */}
      <div
        className="flex-shrink-0 w-10 h-12 flex items-center justify-center rounded-xl p-1.5"
        style={{ backgroundColor: s.fill + "15", border: `1.5px solid ${s.fill}30` }}
      >
        <ToothSVG type={toothType} fill={s.fill} stroke={s.stroke} />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-1 flex-wrap">
          <span className="text-xs font-bold text-gray-400">{tooth.id}</span>
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

      {/* Badge + confidence */}
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
      <div className="px-5 pt-5 pb-3 flex items-center justify-between">
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Detail per Gigi</h2>
        <span className="text-xs text-gray-400 bg-gray-50 rounded-full px-2.5 py-1 font-medium">{teeth.length} gigi</span>
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