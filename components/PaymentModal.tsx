'use client';

import { useCartStore } from '@/store/useCartStore';
import { translations } from '@/lib/data';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, QrCode, ShieldCheck, Cpu, ArrowRight, ArrowLeft, ShoppingCart } from 'lucide-react';

export default function PaymentModal() {
    const { setView, language, setPaymentMethod, getTotal, cart, saveOrder } = useCartStore();
    const t = translations[language];
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayment = async (method: string) => {
        setPaymentMethod(method);
        setIsProcessing(true);

        // Save to MongoDB
        await saveOrder();

        setTimeout(() => {
            setIsProcessing(false);
            setView('RECEIPT');
        }, 3000);
    };

    if (isProcessing) {
        return (
            <div className="fixed inset-0 bg-slate-900 z-50 flex flex-col items-center justify-center text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <motion.div
                        animate={{ y: [-1000, 1000] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="h-1 bg-emerald-500 w-full blur-xl shadow-[0_0_50px_emerald]"
                    />
                </div>

                <div className="relative mb-16">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        className="w-32 h-32 border-[6px] border-emerald-500/20 border-t-emerald-500 rounded-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Cpu size={40} className="text-emerald-500 animate-pulse" />
                    </div>
                </div>

                <div className="text-center space-y-4">
                    <h2 className="text-3xl font-black tracking-tighter uppercase">{t.processing}</h2>
                    <div className="flex items-center justify-center gap-3">
                        <ShieldCheck size={20} className="text-emerald-500" />
                        <p className="text-white/30 text-xs font-black uppercase tracking-[0.5em] animate-pulse">Security Gateway Engaged</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-[#F8FAFC] overflow-y-auto custom-scrollbar no-print">
            {/* Action Bar */}
            <div className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-12 shrink-0 sticky top-0 z-20">
                <button
                    onClick={() => setView('SCANNING')}
                    className="flex items-center gap-3 px-6 py-3 bg-slate-50 border border-slate-200 rounded-[20px] text-slate-400 hover:text-slate-900 font-black text-sm uppercase tracking-widest transition-all hover:border-slate-300 active:scale-95 group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    {t.back}
                </button>

                <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Transaction Security</span>
                        <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">TLS 1.3 Active</span>
                    </div>
                    <div className="w-px h-8 bg-slate-100 mx-2" />
                    <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center">
                        <ShieldCheck size={22} />
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center">
                {/* Visual Header Section */}
                <div className="w-full bg-slate-900 pt-20 pb-32 px-12 relative overflow-hidden text-center">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_0)] bg-[length:40px_40px] pointer-events-none" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-emerald-500/5 blur-[120px] pointer-events-none" />

                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative z-10">
                        <h2 className="text-4xl font-black text-white tracking-tighter mb-4 leading-none">{t.select_payment || 'Payment Terminal'}</h2>
                        <p className="text-white/30 text-base font-bold uppercase tracking-[0.4em] mt-2 opacity-60">Authentication & Gateway Entrance</p>
                    </motion.div>
                </div>

                {/* Main Content Area (Tucked overlap effect) */}
                <div className="w-full max-w-7xl px-12 -mt-20 pb-20 relative z-10 flex flex-col gap-12">

                    {/* Amount & Items Card */}
                    <div className="bg-white rounded-[48px] p-10 shadow-premium border border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-8">
                            <div className="w-20 h-20 bg-slate-900 text-white rounded-3xl flex items-center justify-center shadow-2xl">
                                <ShoppingCart size={32} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-slate-900 tracking-tight">{cart.length} SKU REGISTERED</h3>
                                <p className="text-slate-400 font-bold uppercase text-[9px] tracking-widest mt-1 opacity-60">Ready for authorization</p>
                            </div>
                        </div>
                        <div className="h-16 w-px bg-slate-100 mx-4" />
                        <div className="text-right">
                            <span className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.5em] mb-1 block leading-none">Total Payable Amount</span>
                            <span className="text-5xl font-black text-slate-900 tracking-tighter tabular-nums leading-none">Rs. {getTotal().toLocaleString()}</span>
                        </div>
                    </div>

                    {/* Payment Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <PaymentOptionCard
                            icon={<CreditCard size={56} strokeWidth={1.5} />}
                            label={t.card}
                            description="Pay with Visa, Master, or Amex Card"
                            onClick={() => handlePayment('CARD')}
                            accentColor="bg-slate-900"
                            highlightText="Tap, Dip or Swipe"
                        />
                        <PaymentOptionCard
                            icon={<QrCode size={56} strokeWidth={1.5} />}
                            label={t.qr || 'Mobile QR'}
                            description="Pay with LankaQR or Banking Apps"
                            onClick={() => handlePayment('QR')}
                            accentColor="bg-emerald-500"
                            highlightText="LankaQR Certified"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function PaymentOptionCard({ icon, label, description, onClick, accentColor, highlightText }: any) {
    return (
        <motion.button
            whileHover={{ y: -6, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className="group relative bg-white border border-slate-100 rounded-[48px] p-12 overflow-hidden shadow-premium transition-all hover:border-emerald-500/20 hover:shadow-2xl text-left flex gap-10 items-center"
        >
            <div className={`w-28 h-28 rounded-[36px] ${accentColor} text-white flex items-center justify-center shrink-0 shadow-2xl transition-all group-hover:rotate-3`}>
                {icon}
            </div>

            <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{label}</h3>
                    <motion.div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight size={32} className="text-emerald-500" />
                    </motion.div>
                </div>
                <p className="text-slate-400 font-bold text-base mb-6 leading-relaxed max-w-[240px] opacity-80">{description}</p>
                <div className="inline-flex items-center gap-3 bg-slate-50 border border-slate-100 px-5 py-2.5 rounded-2xl">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-900/60">{highlightText}</span>
                </div>
            </div>

            {/* Subtle bg texture/graphic */}
            <div className="absolute top-0 right-0 p-8 text-slate-50 font-black text-[140px] leading-none pointer-events-none opacity-40 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform select-none">
                {label.charAt(0)}
            </div>
        </motion.button>
    );
}
