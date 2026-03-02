'use client';

import { useCartStore } from '@/store/useCartStore';
import { translations } from '@/lib/data';
import { Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
    const { language, setLanguage } = useCartStore();
    const t = translations[language];

    return (
        <header className="h-24 bg-slate-900 flex items-center justify-between px-12 relative overflow-hidden z-30 border-b border-white/5 no-print shrink-0">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="flex items-center gap-6 relative z-10">
                <div className="w-12 h-12 bg-gradient-to-tr from-emerald-600 to-emerald-400 rounded-[14px] flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-transform hover:rotate-3 cursor-pointer">
                    <svg viewBox="0 0 24 24" className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M12 2L4.5 9C4.5 9 3 13 3 17C3 21 7 22 12 22C17 22 21 21 21 17C21 13 19.5 9 19.5 9L12 2Z" />
                        <path d="M12 2V22" strokeOpacity="0.2" />
                    </svg>
                </div>
                <div className="flex flex-col">
                    <h1 className="text-3xl font-black text-white tracking-tighter leading-none">
                        Smart<span className="text-emerald-500">Grocer</span>
                    </h1>
                    <div className="flex items-center gap-2.5 mt-1.5">
                        <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                        <p className="text-[9px] font-black uppercase text-white/30 tracking-[.4em]">Self-Checkout Terminal</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-8 relative z-10">
                {/* High-End Segment Control */}
                <div className="bg-white/[0.04] backdrop-blur-md p-1 rounded-2xl border border-white/5 flex gap-0.5 items-center">
                    <LanguageButton label="EN" active={language === 'EN'} onClick={() => setLanguage('EN')} />
                    <LanguageButton label="සිංහල" active={language === 'SI'} onClick={() => setLanguage('SI')} />
                    <LanguageButton label="தமிழ்" active={language === 'TA'} onClick={() => setLanguage('TA')} />
                </div>

                <div className="h-8 w-px bg-white/10" />

                <div className="flex flex-col items-end">
                    <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">Station ID</p>
                    <p className="text-xs font-black text-white tracking-wider">#COL-0882</p>
                </div>
            </div>
        </header>
    );
}

function LanguageButton({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-500 relative overflow-hidden ${active ? 'text-white' : 'text-white/40 hover:text-white/60'
                }`}
        >
            {active && (
                <motion.div
                    layoutId="activeLang"
                    className="absolute inset-0 bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
            )}
            <span className="relative z-10">{label}</span>
        </button>
    );
}
