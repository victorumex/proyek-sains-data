import { AlertTriangle, CheckCircle, Info } from "lucide-react";

const severityIcon = {
  healthy: <CheckCircle className="w-5 h-5 text-green-500" />,
  mild: <Info className="w-5 h-5 text-yellow-500" />,
  moderate: <AlertTriangle className="w-5 h-5 text-orange-500" />,
  severe: <AlertTriangle className="w-5 h-5 text-red-500" />,
};

export default function SummaryTab({ data }) {
  const counts = data.teeth.reduce((acc, t) => {
    acc[t.severity] = (acc[t.severity] || 0) + 1;
    return acc;
  }, {});

  const items = [
    { label: "Sehat", count: counts.healthy || 0, color: "bg-green-400", textColor: "text-green-700", bg: "bg-green-50" },
    { label: "Ringan", count: counts.mild || 0, color: "bg-yellow-400", textColor: "text-yellow-700", bg: "bg-yellow-50" },
    { label: "Sedang", count: counts.moderate || 0, color: "bg-orange-400", textColor: "text-orange-700", bg: "bg-orange-50" },
    { label: "Parah", count: counts.severe || 0, color: "bg-red-500", textColor: "text-red-700", bg: "bg-red-50" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        {severityIcon[data.overallSeverity]}
        <p className="text-sm text-gray-600 leading-relaxed">{data.summaryText}</p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {items.map((item) => (
          <div key={item.label} className={`${item.bg} rounded-xl p-3 text-center`}>
            <div className={`text-2xl font-extrabold ${item.textColor}`}>{item.count}</div>
            <div className={`text-xs font-medium ${item.textColor} opacity-80 mt-0.5`}>{item.label}</div>
            <div className={`w-full h-1 ${item.color} rounded-full mt-2 opacity-60`} />
          </div>
        ))}
      </div>
    </div>
  );
}