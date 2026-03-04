'use client';

import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { translations } from '@/lib/data';
import { Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
    const { language, setLanguage, setDashboardOpen } = useCartStore();
    const t = translations[language];
    const [logoClicks, setLogoClicks] = useState(0);

    useEffect(() => {
        if (logoClicks === 3) {
            setDashboardOpen(true);
            setLogoClicks(0);
        }
        const timer = setTimeout(() => setLogoClicks(0), 2000);
        return () => clearTimeout(timer);
    }, [logoClicks, setDashboardOpen]);

    return (
        <header className="h-20 bg-slate-900 flex items-center justify-between px-10 relative overflow-hidden z-30 border-b border-white/5 no-print shrink-0">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-1/4 w-48 h-48 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />

            <div className="flex items-center gap-5 relative z-10">
                <button
                    onClick={() => setLogoClicks(prev => prev + 1)}
                    className="w-10 h-10 bg-gradient-to-tr from-emerald-600 to-emerald-400 rounded-xl flex items-center justify-center shadow-lg transition-transform active:scale-95 hover:rotate-3"
                >
                    <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M12 2L4.5 9C4.5 9 3 13 3 17C3 21 7 22 12 22C17 22 21 21 21 17C21 13 19.5 9 19.5 9L12 2Z" />
                    </svg>
                </button>
                <div className="flex flex-col">
                    <h1 className="text-2xl font-black text-white tracking-tighter leading-none">
                        Smart<span className="text-emerald-500">Grocer</span>
                    </h1>
                    <div className="flex items-center gap-2 mt-1">
                        <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                        <p className="text-[8px] font-black uppercase text-white/30 tracking-[.3em]">Self-Checkout Terminal</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-6 relative z-10">
                <div className="bg-white/[0.04] backdrop-blur-md p-0.5 rounded-xl border border-white/5 flex gap-0.5 items-center">
                    <LanguageButton label="EN" active={language === 'EN'} onClick={() => setLanguage('EN')} />
                    <LanguageButton label="සිංහල" active={language === 'SI'} onClick={() => setLanguage('SI')} />
                    <LanguageButton label="தமிழ்" active={language === 'TA'} onClick={() => setLanguage('TA')} />
                </div>

                <div className="h-6 w-px bg-white/10" />

                <div className="flex flex-col items-end">
                    <p className="text-[8px] font-black text-white/20 uppercase tracking-widest">Station ID</p>
                    <p className="text-[10px] font-black text-white tracking-wider">#COL-0882</p>
                </div>
            </div>
        </header>
    );
}

function LanguageButton({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all duration-500 relative overflow-hidden ${active ? 'text-white' : 'text-white/40 hover:text-white/60'
                }`}
        >
            {active && (
                <motion.div
                    layoutId="activeLang"
                    className="absolute inset-0 bg-emerald-500"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
            )}
            <span className="relative z-10">{label}</span>
        </button>
    );
}
