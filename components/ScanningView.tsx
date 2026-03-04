'use client';

import { useCartStore } from '@/store/useCartStore';
import { translations, products } from '@/lib/data';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShoppingCart, Plus, Minus, Trash2, ScanLine,
    AlertCircle, HelpCircle, Search, User, Package, X,
    ChevronRight, ArrowLeft, ArrowRight, Zap, List
} from 'lucide-react';

export default function ScanningView() {
    const {
        addItem, cart, language, updateQuantity, removeItem,
        getSubtotal, getTax, getTotal, setView,
        member, setMember, bagCount, setBags, getSavings, clearCart
    } = useCartStore();

    const [barcodeInput, setBarcodeInput] = useState('');
    const [memberInput, setMemberInput] = useState('');
    const [error, setError] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
    const [isBagsOpen, setIsBagsOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const t = translations[language];

    useEffect(() => {
        const focus = () => {
            if (!isSearchOpen && !isStaffModalOpen && !isBagsOpen) {
                inputRef.current?.focus();
            }
        };
        focus();
        const interval = setInterval(focus, 1000);
        return () => clearInterval(interval);
    }, [isSearchOpen, isStaffModalOpen, isBagsOpen]);

    const handleScan = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!barcodeInput) return;
        const success = addItem(barcodeInput);
        if (!success) {
            setError(true);
            setTimeout(() => setError(false), 2000);
        }
        setBarcodeInput('');
    };

    const handleMemberSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (setMember(memberInput)) {
            setMemberInput('');
        } else {
            setError(true);
            setTimeout(() => setError(false), 2000);
        }
    };

    return (
        <div className="h-full flex flex-col bg-[#F8FAFC]">
            {/* Dynamic Action Header */}
            <div className="h-14 bg-white border-b border-slate-100 flex items-center justify-between px-8 shrink-0">
                <button
                    onClick={() => {
                        if (confirm('Are you sure you want to cancel this order?')) {
                            clearCart();
                            setView('WELCOME');
                        }
                    }}
                    className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold uppercase text-[9px] tracking-widest transition-colors"
                >
                    <ArrowLeft size={14} />
                    {t.back || 'Cancel Order'}
                </button>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Scanner Operational</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden p-6 gap-6">

                {/* Left: Interactive Control Tower */}
                <div className="w-[320px] flex flex-col gap-6 shrink-0">

                    {/* Main Scanning Pad */}
                    <div className="bg-white rounded-[28px] p-6 shadow-premium border border-slate-100 flex flex-col">
                        <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                            <ScanLine size={12} className="text-emerald-500" />
                            Capture Terminal
                        </h3>

                        <div className={`w-full aspect-video rounded-[20px] mb-4 flex flex-col items-center justify-center relative overflow-hidden transition-colors ${error ? 'bg-red-50 text-red-500' : 'bg-slate-50 text-slate-200'}`}>
                            <ScanLine size={40} className={`relative z-10 ${error ? 'animate-bounce' : 'animate-pulse text-emerald-500'}`} />
                            {error && <p className="text-[9px] font-black uppercase mt-3 tracking-widest">Invalid Barcode</p>}
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(16,185,129,0.1) 2px, transparent 2px), linear-gradient(90deg, rgba(16,185,129,0.1) 2px, transparent 2px)', backgroundSize: '15px 15px' }} />
                        </div>

                        <form onSubmit={handleScan} className="space-y-3">
                            <div className="relative group">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={barcodeInput}
                                    onChange={(e) => setBarcodeInput(e.target.value)}
                                    placeholder="SCAN SKU..."
                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-5 py-3.5 font-black text-base text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all placeholder:text-slate-300"
                                    autoFocus
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                    <Zap size={16} className="text-slate-200 group-focus-within:text-emerald-500 transition-colors" />
                                </div>
                            </div>
                            <button className="w-full h-14 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-800 transition-all shadow-lg">
                                Register Item
                            </button>
                        </form>
                    </div>

                    {/* Quick Access Grid */}
                    <div className="grid grid-cols-2 gap-3">
                        <button onClick={() => setIsSearchOpen(true)} className="bg-white hover:bg-slate-50 border border-slate-100 p-4 rounded-[20px] shadow-sm flex flex-col items-center gap-2 transition-all">
                            <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center"><Search size={20} /></div>
                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{t.search}</span>
                        </button>
                        <button onClick={() => setIsBagsOpen(true)} className="bg-white hover:bg-slate-50 border border-slate-100 p-4 rounded-[20px] shadow-sm flex flex-col items-center gap-2 transition-all relative">
                            <div className="w-10 h-10 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center"><Package size={20} /></div>
                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{t.bags}</span>
                            {bagCount > 0 && <div className="absolute top-2 right-2 bg-slate-900 text-white text-[8px] font-black w-5 h-5 rounded-lg flex items-center justify-center">{bagCount}</div>}
                        </button>
                    </div>

                    {/* Identity Widget */}
                    <div className="bg-slate-900 rounded-[24px] p-5 text-white group cursor-pointer hover:bg-slate-800 transition-all">
                        {member ? (
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center text-white"><User size={20} /></div>
                                <div>
                                    <p className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest leading-none mb-1">Premium Member</p>
                                    <p className="text-sm font-black truncate max-w-[150px] leading-tight">{member.name}</p>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleMemberSubmit} className="flex gap-2">
                                <input
                                    type="text"
                                    value={memberInput}
                                    onChange={(e) => setMemberInput(e.target.value)}
                                    placeholder="LOYALTY ID"
                                    className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 flex-1 text-xs font-bold focus:outline-none focus:border-white/20 transition-all"
                                />
                                <button className="bg-white text-slate-900 px-3 py-2 rounded-lg text-[8px] font-black uppercase">LINK</button>
                            </form>
                        )}
                    </div>

                    <button onClick={() => setIsStaffModalOpen(true)} className="mt-auto py-3 bg-white border border-slate-100 rounded-xl text-[8px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:text-red-500 transition-colors">
                        <HelpCircle size={12} />
                        {t.help}
                    </button>
                </div>

                {/* Right: Cart Manifest */}
                <div className="flex-1 bg-white rounded-[32px] shadow-premium border border-slate-100 overflow-hidden flex flex-col">
                    <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-900 text-white rounded-[12px] flex items-center justify-center shadow-lg"><ShoppingCart size={18} /></div>
                            <h3 className="text-lg font-black text-slate-900 tracking-tight">Active Manifest</h3>
                        </div>
                        <div className="px-4 py-2 bg-slate-50 rounded-full border border-slate-100">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{cart.length} SKU REGISTERED</span>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                        {cart.length === 0 ? (
                            <div className="h-full flex flex-col">
                                <div className="flex items-center justify-between mb-6 shrink-0">
                                    <div>
                                        <h4 className="text-base font-black text-slate-900 tracking-tight">Quick Select</h4>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Frequent items</p>
                                    </div>
                                    <List size={18} className="text-slate-200" />
                                </div>
                                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-y-auto pr-2 custom-scrollbar">
                                    {products.slice(0, 10).map((p) => (
                                        <motion.button
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            key={p.id}
                                            onClick={() => addItem(p.barcode)}
                                            className="bg-[#F8FAFC] border border-slate-100 rounded-[20px] p-4 flex flex-col items-center text-center group hover:border-emerald-500/20 hover:shadow-premium transition-all"
                                        >
                                            <div className="w-16 h-16 bg-white rounded-xl overflow-hidden mb-3 shadow-sm border border-slate-100 p-1.5 shrink-0">
                                                <img src={p.image} alt={p.name} className="w-full h-full object-cover rounded-md group-hover:scale-110 transition-transform" />
                                            </div>
                                            <span className="text-[11px] font-black text-slate-900 line-clamp-1 mb-0.5">
                                                {language === 'EN' ? p.name : language === 'SI' ? p.nameSi : p.nameTa}
                                            </span>
                                            <span className="text-[10px] font-bold text-emerald-500">Rs. {p.price}</span>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                <AnimatePresence initial={false}>
                                    {cart.map((item) => (
                                        <motion.div
                                            key={item.id} layout initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, x: 20 }}
                                            className="flex items-center gap-5 p-4 bg-[#F8FAFC] rounded-[20px] border border-slate-100 group hover:border-emerald-500/20 transition-all"
                                        >
                                            <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-black text-slate-900 text-sm leading-tight truncate">
                                                    {language === 'EN' ? item.name : language === 'SI' ? item.nameSi : item.nameTa}
                                                </h4>
                                                <p className="text-xs font-bold text-slate-400 mt-0.5">Rs. {item.price.toLocaleString()}</p>
                                            </div>
                                            <div className="flex items-center gap-3 bg-white p-1 rounded-xl shadow-sm border border-slate-100">
                                                <button onClick={() => updateQuantity(item.id, -1)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-slate-50 text-slate-400"><Minus size={14} /></button>
                                                <span className="w-5 text-center font-black text-base">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, 1)} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-slate-50 text-slate-400"><Plus size={14} /></button>
                                            </div>
                                            <div className="w-24 text-right">
                                                <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-0.5 leading-none">Total</p>
                                                <p className="text-base font-black text-slate-900 leading-none">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                                            </div>
                                            <button onClick={() => removeItem(item.id)} className="w-8 h-8 flex items-center justify-center text-slate-200 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Summary Checkout Bar */}
            <div className="h-28 bg-slate-900 shrink-0 flex items-center px-10 gap-12">
                <div className="flex-1 flex gap-12">
                    <SummaryStat label={t.subtotal} value={`Rs. ${getSubtotal().toLocaleString()}`} />
                    {getSavings() > 0 && <SummaryStat label={t.savings} value={`- Rs. ${getSavings().toLocaleString()}`} color="text-emerald-400" />}
                    <SummaryStat label={t.tax} value={`Rs. ${getTax().toLocaleString()}`} />
                </div>

                <div className="flex items-center gap-10">
                    <div className="text-right">
                        <p className="text-[8px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-1 leading-none">Payable Total</p>
                        <p className="text-3xl font-black text-white tracking-tighter tabular-nums leading-none">Rs. {getTotal().toLocaleString()}</p>
                    </div>
                    <button
                        disabled={cart.length === 0}
                        onClick={() => setView('PAYMENT')}
                        className={`h-16 px-10 rounded-xl font-black text-lg flex items-center gap-4 shadow-xl transition-all active:scale-95 ${cart.length === 0 ? 'bg-white/5 text-white/20 cursor-not-allowed' : 'bg-emerald-500 text-white hover:bg-emerald-400'
                            }`}
                    >
                        {t.pay_now}
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>

            {/* Modals */}
            <AnimatePresence>
                {isSearchOpen && <SearchModal products={products} language={language} t={t} onClose={() => setIsSearchOpen(false)} onAdd={addItem} />}
                {isBagsOpen && <BagModal count={bagCount} setCount={setBags} t={t} onClose={() => setIsBagsOpen(false)} />}
                {isStaffModalOpen && <StaffModal t={t} onClose={() => setIsStaffModalOpen(false)} />}
            </AnimatePresence>
        </div>
    );
}

function SummaryStat({ label, value, color = "text-white" }: any) {
    return (
        <div className="flex flex-col">
            <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">{label}</span>
            <span className={`text-lg font-bold ${color}`}>{value}</span>
        </div>
    )
}

function SearchModal({ products, language, t, onClose, onAdd }: any) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-slate-900/60 backdrop-blur-md">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-[28px] w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="text-xl font-black text-slate-900 uppercase">Inventory Lookup</h3>
                    <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-slate-50 flex items-center justify-center"><X size={20} /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 grid grid-cols-4 gap-4 custom-scrollbar">
                    {products.map((p: any) => (
                        <button key={p.id} onClick={() => { onAdd(p.barcode); onClose(); }} className="p-3 bg-slate-50 border border-slate-100 rounded-xl hover:border-emerald-500 transition-all text-center group text-xs">
                            <img src={p.image} className="w-16 h-16 object-cover mx-auto mb-3 rounded-lg" />
                            <p className="font-black text-slate-900 line-clamp-1">{language === 'EN' ? p.name : language === 'SI' ? p.nameSi : p.nameTa}</p>
                            <p className="font-bold text-emerald-500 mt-1">Rs. {p.price}</p>
                        </button>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}

function BagModal({ count, setCount, t, onClose }: any) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-slate-900/60 backdrop-blur-md">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-[28px] p-10 w-full max-w-sm text-center">
                <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4"><Package size={32} /></div>
                <h3 className="text-2xl font-black text-slate-900 mb-6">{t.bags}</h3>
                <div className="flex items-center justify-center gap-8 mb-10">
                    <button onClick={() => setCount(Math.max(0, count - 1))} className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-300 hover:text-slate-900 transition-all"><Minus size={20} /></button>
                    <span className="text-4xl font-black text-slate-900 w-12">{count}</span>
                    <button onClick={() => setCount(count + 1)} className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-300 hover:text-slate-900 transition-all"><Plus size={20} /></button>
                </div>
                <button onClick={onClose} className="w-full h-14 bg-slate-900 text-white rounded-xl font-black shadow-lg">CONFIRM</button>
            </motion.div>
        </div>
    );
}

function StaffModal({ t, onClose }: any) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-slate-900/80 backdrop-blur-lg">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-[28px] p-10 w-full max-w-md text-center">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse"><AlertCircle size={32} /></div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">{t.call_staff}</h3>
                <p className="text-slate-400 font-bold mb-8 text-sm leading-relaxed">{t.staff_desc}</p>
                <button onClick={onClose} className="w-full h-14 bg-slate-100 text-slate-900 rounded-xl font-black transition-all">DISMISS ALERT</button>
            </motion.div>
        </div>
    );
}
