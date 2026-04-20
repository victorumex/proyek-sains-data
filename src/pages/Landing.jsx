import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Scan, ShieldCheck, Zap, ChevronRight, Star, Activity, Award } from "lucide-react";

const features = [
  { icon: Zap, title: "Deteksi Instan", desc: "Hasil analisis AI dalam hitungan detik" },
  { icon: ShieldCheck, title: "Akurasi Tinggi", desc: "Model AI terlatih dengan ribuan data klinis" },
  { icon: Scan, title: "Tanpa Login", desc: "Langsung gunakan tanpa registrasi apapun" },
];

function MockDashboard() {
  return (
    <div className="w-full bg-white rounded-3xl border border-gray-100 shadow-2xl shadow-gray-200/60 overflow-hidden">
      {/* Mock header bar */}
      <div className="bg-dental-green px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-white/20 rounded-md flex items-center justify-center">
            <Scan className="w-3 h-3 text-white" />
          </div>
          <span className="text-white text-sm font-bold">Hasil Deteksi</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-white/30" />
          <div className="w-3 h-3 rounded-full bg-white/30" />
          <div className="w-3 h-3 rounded-full bg-white/30" />
        </div>
      </div>

      {/* Severity bar */}
      <div className="px-5 pt-4 pb-2">
        <p className="text-xs text-gray-400 font-medium mb-2">Tingkat Keparahan</p>
        <div className="h-2.5 rounded-full bg-gradient-to-r from-green-400 via-yellow-400 via-orange-400 to-red-500" />
        <div className="flex justify-between mt-1">
          {["Sehat", "Ringan", "Sedang", "Parah"].map(l => (
            <span key={l} className="text-xs text-gray-300">{l}</span>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="px-5 py-3 grid grid-cols-2 gap-3">
        <div className="bg-red-50 rounded-xl p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <Activity className="w-3.5 h-3.5 text-red-400" />
            <span className="text-xs text-red-500 font-semibold">Karies</span>
          </div>
          <span className="text-2xl font-extrabold text-red-500">5</span>
          <p className="text-xs text-red-300 mt-0.5">terdeteksi</p>
        </div>
        <div className="bg-green-50 rounded-xl p-3">
          <div className="flex items-center gap-1.5 mb-1">
            <Award className="w-3.5 h-3.5 text-dental-green" />
            <span className="text-xs text-dental-green font-semibold">Akurasi</span>
          </div>
          <span className="text-2xl font-extrabold text-dental-green">87%</span>
          <p className="text-xs text-green-300 mt-0.5">kepercayaan AI</p>
        </div>
      </div>

      {/* Detail list */}
      <div className="px-5 pb-4 space-y-2">
        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">Detail per Gigi</p>
        {[
          { id: "G-11", label: "Sehat", conf: 96, color: "#2ECC71", barW: "96%" },
          { id: "G-13", label: "Sedang", conf: 91, color: "#E67E22", barW: "91%" },
          { id: "G-14", label: "Parah", conf: 94, color: "#E74C3C", barW: "94%" },
          { id: "G-22", label: "Sedang", conf: 85, color: "#E67E22", barW: "85%" },
        ].map((t) => (
          <div key={t.id} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: t.color }} />
            <span className="text-xs text-gray-500 w-9 flex-shrink-0 font-medium">{t.id}</span>
            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: t.barW, backgroundColor: t.color + "99" }} />
            </div>
            <span className="text-xs font-bold w-7 text-right" style={{ color: t.color }}>{t.conf}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-white font-inter overflow-x-hidden flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-dental-green rounded-lg flex items-center justify-center">
              <Scan className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-lg tracking-tight">DentiScan AI</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 bg-dental-green-light rounded-full px-3 py-1.5">
              <Star className="w-3.5 h-3.5 text-dental-green fill-dental-green" />
              <span className="text-xs font-semibold text-dental-green-dark">AI-Powered</span>
            </div>
            <Link to="/upload">
              <button className="hidden md:flex items-center gap-2 bg-dental-green text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-dental-green-mid transition-colors shadow-sm shadow-dental-green/20">
                <Scan className="w-4 h-4" />
                Mulai Deteksi
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col pt-16">

        {/* ─── HERO SECTION ─── */}
        <section className="flex-1 flex items-center max-w-7xl mx-auto w-full px-6 lg:px-10 py-16 lg:py-0 lg:min-h-[calc(100vh-64px)]">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left: Text */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-dental-green-light border border-dental-green/20 rounded-full px-4 py-2 mb-6"
              >
                <span className="w-2 h-2 bg-dental-green rounded-full animate-pulse" />
                <span className="text-sm font-medium text-dental-green-dark">Teknologi AI Terdepan untuk Kesehatan Gigi</span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-900 leading-[1.1] mb-5 tracking-tight"
              >
                Deteksi{" "}
                <span className="relative inline-block">
                  <span className="text-dental-green">Karies Gigi</span>
                  <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 200 6" fill="none" preserveAspectRatio="none">
                    <path d="M0 5 Q50 0 100 3 Q150 6 200 1" stroke="#2ECC71" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                  </svg>
                </span>
                <br />
                <span className="text-gray-800">dengan AI</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg text-gray-500 mb-8 max-w-md leading-relaxed"
              >
                Unggah atau ambil foto gigi Anda dan biarkan AI menganalisis kondisi kesehatan gigi secara akurat dalam sekejap.
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
              >
                <Link to="/upload" className="w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.03, boxShadow: "0 16px 40px rgba(46,204,113,0.35)" }}
                    whileTap={{ scale: 0.97 }}
                    className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-dental-green hover:bg-dental-green-mid text-white font-bold text-base sm:text-lg px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-dental-green/25"
                  >
                    <Scan className="w-5 h-5 flex-shrink-0" />
                    Mulai Deteksi
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </motion.button>
                </Link>
                <p className="text-sm text-gray-400 flex items-center gap-1.5 flex-shrink-0">
                  <ShieldCheck className="w-4 h-4 text-dental-green flex-shrink-0" />
                  Gratis · Tanpa Registrasi
                </p>
              </motion.div>

              {/* Trust stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-10 flex items-center gap-6 sm:gap-8"
              >
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-extrabold text-gray-900">50505050%</div>
                  <div className="text-xs text-gray-400 mt-0.5">Akurasi Model</div>
                </div>
                <div className="w-px h-10 bg-gray-100" />
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-extrabold text-gray-900">12Kjuta ratus belas+</div>
                  <div className="text-xs text-gray-400 mt-0.5">Gigi Dianalisis</div>
                </div>
                <div className="w-px h-10 bg-gray-100" />
                <div className="text-center lg:text-left">
                  <div className="text-2xl font-extrabold text-gray-900">&lt;3s</div>
                  <div className="text-xs text-gray-400 mt-0.5">Waktu Deteksi</div>
                </div>
              </motion.div>
            </div>

            {/* Right: Mock dashboard */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative flex items-center justify-center"
            >
              {/* Background glow */}
              <div className="absolute inset-0 bg-dental-green opacity-5 blur-3xl rounded-full scale-110 pointer-events-none" />

              <div className="relative w-full max-w-sm lg:max-w-none">
                <MockDashboard />

                {/* Floating badge top-right */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.7, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.8, type: "spring" }}
                  className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl border border-dental-green/10 px-4 py-2.5 z-10"
                >
                  <div className="text-xs text-gray-400 mb-0.5">Status</div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-dental-green rounded-full animate-pulse" />
                    <span className="text-sm font-bold text-dental-green">Selesai</span>
                  </div>
                </motion.div>

                {/* Floating badge bottom-left */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.7, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 1, type: "spring" }}
                  className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-2.5 z-10"
                >
                  <div className="text-xs text-gray-400 mb-0.5">Model AI</div>
                  <div className="text-sm font-bold text-gray-900">YOLOv8 · Dental</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── FEATURES SECTION ─── */}
        <section className="bg-gray-50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">Mengapa DentiScan AI?</h2>
              <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">Platform deteksi karies berbasis AI yang cepat, akurat, dan mudah digunakan siapa saja.</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-6">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-dental-green/20 transition-all duration-300 text-center group"
                >
                  <div className="w-12 h-12 bg-dental-green-light rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-dental-green/10 transition-colors">
                    <f.icon className="w-6 h-6 text-dental-green" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1.5">{f.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA BOTTOM ─── */}
        <section className="bg-dental-green">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">Siap untuk deteksi?</h2>
              <p className="text-green-100 text-sm sm:text-base">Tidak perlu akun. Langsung mulai sekarang juga.</p>
            </div>
            <Link to="/upload" className="flex-shrink-0">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-3 bg-white text-dental-green font-bold text-base px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                <Scan className="w-5 h-5" />
                Mulai Deteksi Sekarang
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-dental-green rounded-md flex items-center justify-center">
              <Scan className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-bold text-gray-700">DentiScan AI</span>
          </div>
          <p className="text-xs text-gray-400">© 2026 DentiScan AI · Proyek Sains Data - Kelompok 1</p>
        </div>
      </footer>
    </div>
  );
}