import { motion } from "framer-motion";

const priorityStyles = {
  urgent: "border-l-red-500 bg-red-50",
  high: "border-l-orange-400 bg-orange-50",
  medium: "border-l-yellow-400 bg-yellow-50",
  info: "border-l-green-400 bg-green-50",
};

const priorityLabel = {
  urgent: { text: "Segera", badge: "bg-red-100 text-red-700" },
  high: { text: "Penting", badge: "bg-orange-100 text-orange-700" },
  medium: { text: "Pantau", badge: "bg-yellow-100 text-yellow-700" },
  info: { text: "Rutin", badge: "bg-green-100 text-green-700" },
};

export default function RecommendationTab({ recommendations }) {
  return (
    <div className="space-y-3">
      {recommendations.map((rec, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className={`border-l-4 rounded-r-xl p-4 ${priorityStyles[rec.priority]}`}
        >
          <div className="flex items-start gap-3">
            <span className="text-xl">{rec.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="font-bold text-gray-900 text-sm">{rec.title}</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${priorityLabel[rec.priority].badge}`}>
                  {priorityLabel[rec.priority].text}
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">{rec.desc}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}