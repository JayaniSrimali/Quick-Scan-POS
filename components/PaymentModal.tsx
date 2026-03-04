'use client';

import { useCartStore } from '@/store/useCartStore';
import { translations } from '@/lib/data';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, QrCode, ShieldCheck, Cpu, ArrowRight, ArrowLeft, ShoppingCart } from 'lucide-react';

export default function PaymentModal() {
    const { setView, language, setPaymentMethod, getTotal, cart, saveOrder } = useCartStore();
    const t = translations[language];
    const [step, setStep] = useState<'selection' | 'card' | 'qr' | 'processing'>('selection');

    const handleBack = () => {
        if (step === 'selection') setView('SCANNING');
        else setStep('selection');
    };

    const handleSelection = (method: string) => {
        setPaymentMethod(method);
        if (method === 'CARD') setStep('card');
        else if (method === 'QR') setStep('qr');
    };

    const finalizePayment = async () => {
        setStep('processing');
        await saveOrder();
        setTimeout(() => {
            setView('RECEIPT');
        }, 3000);
    };

    if (step === 'processing') {
        return (
            <div className="fixed inset-0 bg-slate-900 z-50 flex flex-col items-center justify-center text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <motion.div
                        animate={{ y: [-1000, 1000] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="h-1 bg-emerald-500 w-full blur-xl shadow-[0_0_50px_emerald]"
                    />
                </div>
                <div className="relative mb-12">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        className="w-24 h-24 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Cpu size={32} className="text-emerald-500 animate-pulse" />
                    </div>
                </div>
                <div className="text-center space-y-3">
                    <h2 className="text-2xl font-black tracking-tight uppercase">{t.processing}</h2>
                    <div className="flex items-center justify-center gap-3">
                        <ShieldCheck size={18} className="text-emerald-500" />
                        <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">Security Gateway Engaged</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-[#F8FAFC] overflow-y-auto custom-scrollbar no-print">
            {/* Action Bar */}
            <div className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-10 shrink-0 sticky top-0 z-20">
                <button
                    onClick={handleBack}
                    className="flex items-center gap-3 px-5 py-2.5 bg-slate-50 border border-slate-200 rounded-[16px] text-slate-400 hover:text-slate-900 font-bold text-[10px] uppercase tracking-widest transition-all hover:border-slate-300 active:scale-95 group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    {t.back}
                </button>

                <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end">
                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Transaction Security</span>
                        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">TLS 1.3 Active</span>
                    </div>
                    <div className="w-px h-6 bg-slate-100 mx-2" />
                    <div className="w-8 h-8 bg-emerald-50 text-emerald-500 rounded-lg flex items-center justify-center">
                        <ShieldCheck size={18} />
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center">
                <AnimatePresence mode="wait">
                    {step === 'selection' && <SelectionStep key="select" t={t} cartLength={cart.length} total={getTotal()} onSelect={handleSelection} />}
                    {step === 'card' && <CardStep key="card" t={t} onFinish={finalizePayment} />}
                    {step === 'qr' && <QRStep key="qr" t={t} onFinish={finalizePayment} />}
                </AnimatePresence>
            </div>
        </div>
    );
}

function SelectionStep({ t, cartLength, total, onSelect }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full flex flex-col items-center"
        >
            <div className="w-full bg-slate-900 pt-16 pb-24 px-12 relative overflow-hidden text-center">
                <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_0)] bg-[length:32px_32px] pointer-events-none" />
                <h2 className="text-3xl font-black text-white tracking-tight mb-2 leading-none">{t.select_payment || 'Payment Terminal'}</h2>
                <p className="text-white/20 text-xs font-bold uppercase tracking-[0.3em] mt-2">Authentication & Gateway Entrance</p>
            </div>

            <div className="w-full max-w-5xl px-12 -mt-12 pb-20 relative z-10 flex flex-col gap-8">
                <div className="bg-white rounded-[32px] p-8 shadow-premium border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-xl">
                            <ShoppingCart size={28} />
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-slate-900 tracking-tight">{cartLength} SKU REGISTERED</h3>
                            <p className="text-slate-400 font-bold uppercase text-[8px] tracking-[0.2em] mt-1">Ready for authorization</p>
                        </div>
                    </div>
                    <div className="h-12 w-px bg-slate-100 mx-4" />
                    <div className="text-right">
                        <span className="text-[8px] font-black text-emerald-500 uppercase tracking-[0.4em] mb-1 block leading-none">Payable Amount</span>
                        <span className="text-4xl font-black text-slate-900 tracking-tighter tabular-nums leading-none">Rs. {total.toLocaleString()}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <PaymentOptionCard
                        icon={<CreditCard size={40} strokeWidth={1.5} />}
                        label={t.card}
                        description="Visa, Master, or Amex"
                        onClick={() => onSelect('CARD')}
                        accentColor="bg-slate-900"
                        highlightText="Tap, Dip or Swipe"
                    />
                    <PaymentOptionCard
                        icon={<QrCode size={40} strokeWidth={1.5} />}
                        label={t.qr || 'Mobile QR'}
                        description="LankaQR or Bank Apps"
                        onClick={() => onSelect('QR')}
                        accentColor="bg-emerald-500"
                        highlightText="LankaQR Certified"
                    />
                </div>
            </div>
        </motion.div>
    );
}

function CardStep({ t, onFinish }: any) {
    useEffect(() => {
        const timer = setTimeout(onFinish, 4000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-20 text-center gap-10"
        >
            <div className="relative">
                <div className="w-64 h-40 bg-slate-900 rounded-3xl p-6 relative overflow-hidden shadow-2xl">
                    <div className="w-12 h-10 bg-amber-400/20 rounded-lg mb-8" />
                    <div className="space-y-2">
                        <div className="h-4 bg-white/10 rounded w-full" />
                        <div className="h-4 bg-white/10 rounded w-3/4" />
                    </div>
                    <motion.div
                        animate={{ x: [280, 0] }}
                        transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                        className="absolute top-1/2 -right-16 -translate-y-1/2 w-32 h-20 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg"
                    >
                        <Cpu size={24} className="text-white" />
                    </motion.div>
                </div>
                <motion.div
                    animate={{ y: [10, -10, 10] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -bottom-8 -right-8 w-16 h-16 bg-white rounded-2xl shadow-premium border border-slate-100 flex items-center justify-center text-emerald-500"
                >
                    <ShieldCheck size={32} />
                </motion.div>
            </div>

            <div className="space-y-4">
                <h3 className="text-2xl font-black text-slate-900 uppercase">Insert or Tap Card</h3>
                <p className="text-slate-400 font-medium max-w-[300px] mx-auto text-sm leading-relaxed">Please follow instructions on the banking terminal to complete auth.</p>
                <div className="inline-flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl mt-4">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                    <span className="text-[10px] font-black text-slate-900/40 uppercase tracking-widest">Awaiting Peripheral Respond</span>
                </div>
            </div>
        </motion.div>
    );
}

function QRStep({ t, onFinish }: any) {
    // Simulate payment detected after 5 seconds
    useEffect(() => {
        const timer = setTimeout(onFinish, 6000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-20 text-center gap-10"
        >
            <div className="bg-white p-8 rounded-[40px] shadow-premium border border-slate-100 relative">
                <div className="w-64 h-64 bg-slate-50 rounded-3xl flex items-center justify-center overflow-hidden border-2 border-slate-50">
                    <QrCode size={180} strokeWidth={1} className="text-slate-900" />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-6 py-2 rounded-full text-[10px] font-black shadow-lg">LANKAQR</div>
            </div>

            <div className="space-y-4">
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Scan LankaQR</h3>
                <p className="text-slate-400 font-medium max-w-[320px] mx-auto text-sm leading-relaxed">Open your banking app and scan the code above. Payment will update automatically.</p>

                <div className="mt-8 flex justify-center gap-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl border border-slate-100" />
                    <div className="w-12 h-12 bg-slate-50 rounded-xl border border-slate-100" />
                    <div className="w-12 h-12 bg-slate-50 rounded-xl border border-slate-100" />
                </div>
            </div>
        </motion.div>
    );
}

function PaymentOptionCard({ icon, label, description, onClick, accentColor, highlightText }: any) {
    return (
        <motion.button
            whileHover={{ y: -4, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className="group relative bg-white border border-slate-100 rounded-[32px] p-8 overflow-hidden shadow-premium transition-all hover:border-emerald-500/20 hover:shadow-2xl text-left flex gap-6 items-center"
        >
            <div className={`w-20 h-20 rounded-[24px] ${accentColor} text-white flex items-center justify-center shrink-0 shadow-lg transition-all group-hover:rotate-3`}>
                {icon}
            </div>

            <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">{label}</h3>
                    <motion.div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowRight size={20} className="text-emerald-500" />
                    </motion.div>
                </div>
                <p className="text-slate-400 font-bold text-xs mb-4 opacity-80">{description}</p>
                <div className="inline-flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg">
                    <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-900/60">{highlightText}</span>
                </div>
            </div>

            <div className="absolute top-0 right-0 p-4 text-slate-50 font-black text-[100px] leading-none pointer-events-none opacity-40 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform select-none">
                {label.charAt(0)}
            </div>
        </motion.button>
    );
}
