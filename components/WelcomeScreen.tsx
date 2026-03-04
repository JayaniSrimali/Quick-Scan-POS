'use client';

import { useCartStore } from '@/store/useCartStore';
import { translations } from '@/lib/data';
import { motion } from 'framer-motion';
import { ShieldAlert, Globe, Clock } from 'lucide-react';

export default function WelcomeScreen() {
    const { setView, language } = useCartStore();
    const t = translations[language];

    return (
        <div className="h-full flex flex-col items-center justify-center p-12 relative overflow-hidden bg-slate-900">
            {/* Cinematic Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/pos_welcome_background_1772607736107.png"
                    className="w-full h-full object-cover opacity-60 scale-105"
                    alt="Background"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-[2px]" />
            </div>

            <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center z-10"
            >
                <motion.div
                    animate={{
                        boxShadow: ["0 0 0px rgba(16,185,129,0)", "0 0 40px rgba(16,185,129,0.3)", "0 0 0px rgba(16,185,129,0)"]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="w-24 h-24 bg-gradient-to-tr from-emerald-600 to-emerald-400 rounded-[32px] flex items-center justify-center mx-auto mb-10 shadow-2xl relative"
                >
                    <svg viewBox="0 0 24 24" className="w-14 h-14 text-white" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M12 2L4.5 9C4.5 9 3 13 3 17C3 21 7 22 12 22C17 22 21 21 21 17C21 13 19.5 9 19.5 9L12 2Z" />
                        <path d="M12 2V22" strokeOpacity="0.2" />
                    </svg>
                    <motion.div
                        className="absolute inset-0 rounded-[32px] border-2 border-white/20"
                        animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </motion.div>

                <h1 className="text-7xl font-black text-white tracking-tighter mb-4 drop-shadow-2xl">
                    Smart<span className="text-emerald-500">Grocer</span>
                </h1>

                <div className="flex items-center justify-center gap-3 mb-16">
                    <div className="h-px w-8 bg-emerald-500/50" />
                    <p className="text-xs text-emerald-400/80 font-black uppercase tracking-[0.5em]">{t.welcome || 'Welcome'}</p>
                    <div className="h-px w-8 bg-emerald-500/50" />
                </div>

                <div className="relative group">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-[36px] blur-xl opacity-25 group-hover:opacity-60 transition duration-1000"
                    />
                    <motion.button
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setView('SCANNING')}
                        className="relative px-20 py-8 bg-white text-slate-900 rounded-[32px] text-2xl font-black shadow-2xl overflow-hidden flex items-center gap-4 group"
                    >
                        <span className="uppercase tracking-[0.2em]">{t.start}</span>
                        <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </motion.div>
                    </motion.button>
                </div>
            </motion.div>

            <div className="absolute bottom-16 flex gap-12 text-white/40">
                <FooterBadge icon={<ShieldAlert size={18} />} text="T-1.3 Secure" />
                <div className="w-px h-4 bg-white/10" />
                <FooterBadge icon={<Globe size={18} />} text="Global Standards" />
                <div className="w-px h-4 bg-white/10" />
                <FooterBadge icon={<Clock size={18} />} text="24/7 Monitoring" />
            </div>

            {/* Terminal Health Indicator */}
            <div className="absolute top-10 right-10 flex items-center gap-3 bg-white/5 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[9px] font-black text-white/50 uppercase tracking-widest">System Optimal</span>
            </div>
        </div>
    );
}

function FooterBadge({ icon, text }: { icon: React.ReactNode, text: string }) {
    return (
        <div className="flex items-center gap-2.5">
            <span className="text-emerald-500/50">{icon}</span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] leading-none">{text}</span>
        </div>
    );
}
