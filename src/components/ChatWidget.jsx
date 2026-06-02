import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import axios from "axios";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([{ role: "ai", text: "Halo! Ada yang bisa saya bantu?" }]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const summary = localStorage.getItem("dentiscan_summary") || "User belum mengunggah gambar.";
      
      const res = await axios.post("https://yizhar-dentiscan-api.hf.space/chat", { 
        message: input,
        context_data: summary 
      });
      setMessages(prev => [...prev, { role: "ai", text: res.data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "ai", text: "Maaf, saya sedang mengalami gangguan." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col h-[400px]"
          >
            <div className="bg-dental-green p-4 text-white flex justify-between items-center">
              <span className="font-bold">DentiScan AI Chat</span>
              <button onClick={() => setIsOpen(false)}><X size={18}/></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] p-2 rounded-xl text-sm ${m.role === "user" ? "bg-dental-green text-white" : "bg-gray-100 text-gray-800"}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && <div className="text-xs text-gray-400 animate-pulse">AI sedang mengetik...</div>}
            </div>
            <div className="p-3 border-t flex gap-2">
              <input 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 text-sm border rounded-lg px-2 py-1 outline-none focus:ring-1 focus:ring-dental-green"
                placeholder="Tanya kesehatan gigi..."
              />
              <button onClick={handleSend} className="bg-dental-green text-white p-1.5 rounded-lg"><Send size={16}/></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-dental-green rounded-full shadow-lg flex items-center justify-center text-white"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </motion.button>
    </div>
  );
}