'use client';

import { useCartStore } from '@/store/useCartStore';
import { translations } from '@/lib/data';
import { motion } from 'framer-motion';
import { CheckCircle, Printer, ChevronRight, ArrowLeft } from 'lucide-react';

export default function ReceiptView() {
    const { cart, getTotal, getSubtotal, getTax, clearCart, setView, language, member, bagCount, getSavings } = useCartStore();
    const t = translations[language];

    // Random Data to match real receipt look
    const date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
    const time = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    const billNo = "R:1000140";
    const storeCode = "SCPT";
    const stationId = "151234";

    return (
        <div className="h-full flex flex-col bg-[#F8FAFC] overflow-y-auto custom-scrollbar">
            {/* Top Navigation Bar */}
            <div className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-10 shrink-0 sticky top-0 z-20 no-print">
                <button
                    onClick={() => {
                        clearCart();
                        setView('WELCOME');
                    }}
                    className="flex items-center gap-3 px-5 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-900 font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                    {t.back || 'Home'}
                </button>

                <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end">
                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Transaction Status</span>
                        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Finalized</span>
                    </div>
                    <div className="w-px h-6 bg-slate-100 mx-1" />
                    <CheckCircle size={18} className="text-emerald-500" />
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center py-10 px-6">

                {/* Success Splash (Refined) */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center mb-8 text-center no-print"
                >
                    <div className="w-16 h-16 bg-emerald-500 rounded-[28px] flex items-center justify-center text-white shadow-xl shadow-emerald-500/20 mb-4">
                        <CheckCircle size={32} strokeWidth={3} />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tighter">Transaction Success</h2>
                    <p className="text-slate-400 font-bold uppercase text-[9px] tracking-[0.4em] mt-1.5 opacity-60">Session Completed</p>
                </motion.div>

                {/* Thermal Receipt Paper for Print Driver */}
                <div className="print-content">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="receipt-paper bg-white w-full max-w-[380px] shadow-premium p-7 text-black border border-slate-100"
                    >
                        {/* Header Section with Logo */}
                        <div className="text-center mb-5">
                            <div className="flex flex-col items-center mb-3">
                                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center mb-2 shadow-lg shadow-emerald-500/10 print:shadow-none">
                                    <svg viewBox="0 0 24 24" className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="3">
                                        <path d="M12 2L4.5 9C4.5 9 3 13 3 17C3 21 7 22 12 22C17 22 21 21 21 17C21 13 19.5 9 19.5 9L12 2Z" />
                                        <path d="M12 2V22" strokeOpacity="0.2" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-black tracking-tighter leading-none">Smart<span className="text-emerald-500">Grocer</span></h2>
                                <p className="text-[8px] font-black uppercase text-slate-300 tracking-[0.2em] print:text-black mt-1">Premium Self-Checkout</p>
                            </div>

                            <div className="text-[10px] font-bold receipt-text-mono uppercase space-y-0.5 leading-tight opacity-70">
                                <p>No. 296, Kaduwela Road, Malambe</p>
                                <p>0112 303 500 / Store: {storeCode}</p>
                                <p>{date} {time} C:{stationId}</p>
                            </div>
                        </div>

                        {/* Table Headers */}
                        <div className="receipt-text-mono text-[10px] font-bold border-y border-black border-dashed py-1.5 mb-3 grid grid-cols-[20px_1fr_50px_40px_60px]">
                            <span>#</span>
                            <span>Item</span>
                            <span className="text-right">Price</span>
                            <span className="text-right">Qty</span>
                            <span className="text-right">Total</span>
                        </div>

                        {/* Line Items */}
                        <div className="receipt-text-mono text-[10px] font-bold space-y-3 mb-5">
                            {cart.map((item, index) => (
                                <div key={index} className="grid grid-cols-[20px_1fr_60px]">
                                    <span className="opacity-40">{index + 1}</span>
                                    <div className="flex flex-col">
                                        <span className="leading-tight">{language === 'EN' ? item.name.toUpperCase() : language === 'SI' ? item.nameSi.toUpperCase() : item.nameTa.toUpperCase()}</span>
                                        <div className="grid grid-cols-[1fr_40px_60px] opacity-60 mt-0.5">
                                            <span>{item.price.toFixed(2)}</span>
                                            <span className="text-center">{item.quantity.toFixed(1)}</span>
                                            <span className="text-right">{(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {bagCount > 0 && (
                                <div className="grid grid-cols-[20px_1fr_60px]">
                                    <span className="opacity-40">{cart.length + 1}</span>
                                    <div className="flex flex-col">
                                        <span className="leading-tight">PLASTIC CARRIER BAG</span>
                                        <div className="grid grid-cols-[1fr_40px_60px] opacity-60 mt-0.5">
                                            <span>10.00</span>
                                            <span className="text-center">{bagCount.toFixed(1)}</span>
                                            <span className="text-right">{(bagCount * 10).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Totals Section */}
                        <div className="receipt-text-mono text-[10px] font-bold border-t border-black border-dashed pt-3 space-y-1 uppercase">
                            <div className="flex justify-between">
                                <span>Gross Amount</span>
                                <span className="text-right">{getSubtotal().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                            {getSavings() > 0 && (
                                <div className="flex justify-between text-emerald-600 print:text-black">
                                    <span>Discount</span>
                                    <span className="text-right">-{getSavings().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-lg border-t border-black border-double pt-1.5 mt-1.5 font-black">
                                <span>NET TOTAL</span>
                                <span className="text-right">Rs. {getTotal().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                            <div className="flex justify-between pt-1 opacity-60">
                                <span>Charged to Card</span>
                                <span className="text-right">{getTotal().toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Member Segment */}
                        {member && (
                            <div className="receipt-text-mono text-[9px] font-bold text-center border-t border-black border-dashed pt-4 mt-5 uppercase leading-tight opacity-80">
                                <p>Member: {member.name.toUpperCase()}</p>
                                <p>Points Gained: {(getTotal() / 200).toFixed(1)}</p>
                                <p>Total Points: {member.points.toLocaleString()}</p>
                                <div className="w-full h-px bg-black/10 my-2" />
                            </div>
                        )}

                        {/* Footer Notice */}
                        <div className="receipt-text-mono text-[8.5px] font-bold text-center mt-8 leading-snug border-t border-slate-100 pt-5 opacity-40">
                            <p className="uppercase mb-1">Return within 7 days with bill for any discrepancies.</p>
                            <p className="tracking-widest font-black mt-2">*** (C) SMARTGROCER ***</p>
                        </div>
                    </motion.div>
                </div>

                {/* Action Buttons for Screen */}
                <div className="mt-10 flex gap-4 w-full max-w-[380px] no-print">
                    <motion.button
                        whileHover={{ y: -3, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => window.print()}
                        className="flex-1 h-16 bg-white border border-slate-200 rounded-2xl text-slate-500 font-black flex items-center justify-center gap-2.5 transition-all shadow-md"
                    >
                        <Printer size={18} />
                        <span className="text-[11px] uppercase tracking-widest leading-none">{t.print_receipt}</span>
                    </motion.button>
                    <motion.button
                        whileHover={{ y: -3, scale: 1.02, backgroundColor: '#059669' }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                            clearCart();
                            setView('WELCOME');
                        }}
                        className="flex-[1.1] h-16 bg-emerald-600 text-white rounded-2xl font-black flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-emerald-600/10"
                    >
                        <span className="text-[11px] uppercase tracking-widest leading-none">{t.finish}</span>
                        <ChevronRight size={18} strokeWidth={3} />
                    </motion.button>
                </div>
            </div>
        </div>
    );
}
