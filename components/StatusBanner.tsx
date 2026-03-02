'use client';

import { useCartStore } from '@/store/useCartStore';
import { translations } from '@/lib/data';

export default function StatusBanner() {
    const { view, language } = useCartStore();
    const t = translations[language];

    const getStatus = () => {
        switch (view) {
            case 'WELCOME': return { text: t.welcome, icon: <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" /> };
            case 'SCANNING': return { text: t.scan_instruction, icon: <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> };
            case 'PAYMENT': return { text: t.select_payment, icon: <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" /> };
            case 'RECEIPT': return { text: t.payment_success, icon: <div className="w-2 h-2 bg-emerald-500 rounded-full" /> };
            default: return { text: '', icon: null };
        }
    };

    const status = getStatus();

    return (
        <div className="status-banner h-10 bg-slate-100 flex items-center justify-between px-10 border-b border-slate-200/60 z-20">
            <div className="flex items-center gap-3">
                {status.icon}
                <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{status.text}</span>
            </div>
            <div className="flex items-center gap-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                <div className="flex items-center gap-2">
                    <span>Terminal Status:</span>
                    <span className="text-emerald-500">Online</span>
                </div>
                <div className="w-px h-3 bg-slate-200" />
                <div className="flex items-center gap-2">
                    <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
            </div>
        </div>
    );
}
