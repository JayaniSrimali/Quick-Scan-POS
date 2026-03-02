'use client';

import { useCartStore } from '@/store/useCartStore';
import { translations } from '@/lib/data';
import { motion } from 'framer-motion';
import { ShieldAlert, Globe, Clock } from 'lucide-react';

export default function WelcomeScreen() {
    const { setView, language } = useCartStore();
    const t = translations[language];

    return (
        <div className="h-full flex flex-col items-center justify-center p-12 bg-white relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-50 rounded-full blur-[120px] opacity-60" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-[120px] opacity-60" />
            </div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center z-10"
            >
                <div className="w-24 h-24 bg-emerald-500 rounded-[32px] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-emerald-500/20">
                    <svg viewBox="0 0 24 24" className="w-14 h-14 text-white" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M12 2L4.5 9C4.5 9 3 13 3 17C3 21 7 22 12 22C17 22 21 21 21 17C21 13 19.5 9 19.5 9L12 2Z" />
                        <path d="M12 2V22" strokeOpacity="0.3" />
                        <path d="M12 7C9 10 7 14 7 17" strokeOpacity="0.5" />
                    </svg>
                </div>

                <h1 className="text-6xl font-black text-slate-900 tracking-tighter mb-4">
                    Smart<span className="text-emerald-500">Grocer</span>
                </h1>
                <p className="text-lg text-slate-400 font-bold uppercase tracking-[0.4em] mb-12 opacity-60">Premium Retail Experience</p>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setView('SCANNING')}
                    className="group relative px-16 py-8 bg-slate-900 text-white rounded-[32px] text-2xl font-black shadow-2xl shadow-slate-900/40 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-emerald-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    <span className="relative z-10 uppercase tracking-widest">{t.start}</span>
                </motion.button>
            </motion.div>

            <div className="absolute bottom-16 flex gap-12 text-slate-300">
                <div className="flex items-center gap-2">
                    <ShieldAlert size={20} />
                    <span className="text-xs font-black uppercase tracking-widest">Secure Terminal</span>
                </div>
                <div className="flex items-center gap-2">
                    <Globe size={20} />
                    <span className="text-xs font-black uppercase tracking-widest">Multi-Language</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock size={20} />
                    <span className="text-xs font-black uppercase tracking-widest">24/7 Operations</span>
                </div>
            </div>
        </div>
    );
}
