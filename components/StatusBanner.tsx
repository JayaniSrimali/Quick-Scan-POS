'use client';

import { useCartStore } from '@/store/useCartStore';
import { translations } from '@/lib/data';
import { useState, useEffect } from 'react';
import { Wifi, Activity, Cpu } from 'lucide-react';

export default function StatusBanner() {
    const { view, language } = useCartStore();
    const t = translations[language];
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const getStatus = () => {
        switch (view) {
            case 'WELCOME': return { text: t.welcome, color: 'bg-indigo-500' };
            case 'SCANNING': return { text: t.scan_instruction, color: 'bg-emerald-500' };
            case 'PAYMENT': return { text: t.select_payment, color: 'bg-amber-500' };
            case 'RECEIPT': return { text: t.payment_success, color: 'bg-emerald-500' };
            default: return { text: '', color: 'bg-slate-400' };
        }
    };

    const status = getStatus();

    return (
        <div className="h-8 bg-slate-900 border-b border-white/5 flex items-center justify-between px-10 z-50 overflow-hidden no-print">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 ${status.color} rounded-full animate-pulse`} />
                    <span className="text-[8px] font-black uppercase text-white/40 tracking-[0.3em]">{status.text}</span>
                </div>
            </div>

            <div className="flex items-center gap-8">
                <div className="flex items-center gap-4 opacity-40">
                    <div className="flex items-center gap-1.5">
                        <Wifi size={10} className="text-emerald-500" />
                        <span className="text-[8px] font-black text-white uppercase tracking-widest">Connected</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Activity size={10} className="text-emerald-500" />
                        <span className="text-[8px] font-black text-white uppercase tracking-widest">TLS 1.3</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Cpu size={10} className="text-emerald-500" />
                        <span className="text-[8px] font-black text-white uppercase tracking-widest">Engine v4.2</span>
                    </div>
                </div>

                <div className="h-3 w-px bg-white/10" />

                <div className="flex items-center gap-3">
                    <span className="text-[9px] font-black text-white tracking-[0.2em]">
                        {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                </div>
            </div>
        </div>
    );
}
