import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Scan, ShieldCheck, Zap, ChevronRight, Star } from "lucide-react";

const features = [
  { icon: Zap, title: "Deteksi Instan", desc: "Hasil analisis AI dalam hitungan detik" },
  { icon: ShieldCheck, title: "Akurasi Tinggi", desc: "Model AI terlatih dengan ribuan data klinis" },
  { icon: Scan, title: "Tanpa Login", desc: "Langsung gunakan tanpa registrasi apapun" },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-white font-inter overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-dental-green rounded-lg flex items-center justify-center">
              <Scan className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-lg tracking-tight">DentiScan AI</span>
          </div>
          <div className="hidden sm:flex items-center gap-1 bg-dental-green-light rounded-full px-3 py-1.5">
            <Star className="w-3.5 h-3.5 text-dental-green fill-dental-green" />
            <span className="text-xs font-semibold text-dental-green-dark">AI-Powered</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="relative pt-16">
        {/* Background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-dental-green opacity-5 blur-3xl" />
          <div className="absolute top-1/2 -left-48 w-[500px] h-[500px] rounded-full bg-dental-green opacity-5 blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6">
          {/* Hero content */}
          <div className="min-h-screen flex flex-col items-center justify-center text-center py-24">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-dental-green-light border border-dental-green/20 rounded-full px-4 py-2 mb-8"
            >
              <span className="w-2 h-2 bg-dental-green rounded-full animate-pulse" />
              <span className="text-sm font-medium text-dental-green-dark">Teknologi AI untuk Kesehatan Gigi</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tight"
            >
              Deteksi{" "}
              <span className="relative">
                <span className="text-dental-green">Karies Gigi</span>
                <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                  <path d="M0 6 Q50 0 100 4 Q150 8 200 2" stroke="#2ECC71" strokeWidth="3" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
              <br />
              dengan Kecerdasan Buatan
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-500 mb-12 max-w-xl leading-relaxed"
            >
              Unggah atau ambil foto gigi Anda, dan biarkan AI kami menganalisis kondisi kesehatan gigi Anda secara akurat dalam sekejap.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <Link to="/upload">
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0 20px 40px rgba(46,204,113,0.35)" }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative inline-flex items-center gap-3 bg-dental-green hover:bg-dental-green-mid text-white font-bold text-lg px-10 py-5 rounded-2xl transition-all duration-300 shadow-lg shadow-dental-green/30"
                >
                  <Scan className="w-5 h-5" />
                  Mulai Deteksi
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <p className="text-sm text-gray-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-dental-green" />
                Gratis · Tanpa Registrasi
              </p>
            </motion.div>

            {/* Decorative tooth illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-20 relative"
            >
              <div className="relative mx-auto w-full max-w-2xl">
                <div className="bg-gradient-to-br from-dental-green-light via-white to-gray-50 rounded-3xl border border-dental-green/10 shadow-2xl shadow-dental-green/5 p-8 flex items-center justify-center gap-6">
                  {/* Mock scan UI */}
                  <div className="flex-1 space-y-3">
                    <div className="h-3 bg-dental-green/20 rounded-full w-3/4" />
                    <div className="h-3 bg-dental-green/10 rounded-full w-full" />
                    <div className="h-3 bg-dental-green/20 rounded-full w-2/3" />
                    <div className="mt-4 flex gap-2">
                      <div className="h-8 w-24 bg-dental-green rounded-lg opacity-80" />
                      <div className="h-8 w-16 bg-gray-100 rounded-lg" />
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    {["#2ECC71", "#F39C12", "#E74C3C"].map((color, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: color + "22", border: `2px solid ${color}` }} />
                        <div className="flex-1 space-y-1">
                          <div className="h-2 bg-gray-100 rounded-full" style={{ width: `${80 - i * 20}%`, backgroundColor: color + "44" }} />
                          <div className="h-1.5 bg-gray-100 rounded-full w-1/2" />
                        </div>
                        <span className="text-xs font-bold" style={{ color }}>{95 - i * 15}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Floating stats */}
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl border border-dental-green/10 px-4 py-3">
                  <div className="text-xs text-gray-400 mb-0.5">Akurasi Model</div>
                  <div className="text-xl font-black text-dental-green">96.4%</div>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3">
                  <div className="text-xs text-gray-400 mb-0.5">Gigi Dianalisis</div>
                  <div className="text-xl font-black text-gray-900">12,400+</div>
                </div>
              </div>
            </motion.div>

            {/* Features */}
            <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-dental-green/20 transition-all duration-300 text-center group"
                >
                  <div className="w-12 h-12 bg-dental-green-light rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-dental-green/10 transition-colors">
                    <f.icon className="w-6 h-6 text-dental-green" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{f.title}</h3>
                  <p className="text-sm text-gray-500">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
        <p>© 2026 DentiScan AI · Proyek Sains Data - Kelompok 1</p>
      </footer>
    </div>
  );
}