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
            <div className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-10 shrink-0">
                <button
                    onClick={() => {
                        if (confirm('Are you sure you want to cancel this order?')) {
                            clearCart();
                            setView('WELCOME');
                        }
                    }}
                    className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold uppercase text-[10px] tracking-[0.2em] transition-colors"
                >
                    <ArrowLeft size={16} />
                    {t.back || 'Cancel Order'}
                </button>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Scanner Ready</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden p-8 gap-8">

                {/* Left: Interactive Control Tower */}
                <div className="w-[400px] flex flex-col gap-6 shrink-0">

                    {/* Main Scanning Pad */}
                    <div className="bg-white rounded-[32px] p-8 shadow-premium border border-slate-100 flex flex-col">
                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                            <ScanLine size={14} className="text-emerald-500" />
                            Capture Terminal
                        </h3>

                        <div className={`w-full aspect-video rounded-[24px] mb-6 flex flex-col items-center justify-center relative overflow-hidden transition-colors ${error ? 'bg-red-50 text-red-500' : 'bg-slate-50 text-slate-200'}`}>
                            <ScanLine size={48} className={`relative z-10 ${error ? 'animate-bounce' : 'animate-pulse text-emerald-500'}`} />
                            {error && <p className="text-[10px] font-black uppercase mt-4 tracking-widest">Invalid Barcode</p>}
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(16,185,129,0.1) 2px, transparent 2px), linear-gradient(90deg, rgba(16,185,129,0.1) 2px, transparent 2px)', backgroundSize: '20px 20px' }} />
                        </div>

                        <form onSubmit={handleScan} className="space-y-4">
                            <div className="relative group">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={barcodeInput}
                                    onChange={(e) => setBarcodeInput(e.target.value)}
                                    placeholder="ENTER BARCODE..."
                                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 font-black text-lg text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all placeholder:text-slate-300"
                                    autoFocus
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                    <Zap size={20} className="text-slate-200 group-focus-within:text-emerald-500 transition-colors" />
                                </div>
                            </div>
                            <button className="w-full h-16 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10">
                                Register Item
                            </button>
                        </form>
                    </div>

                    {/* Quick Access Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => setIsSearchOpen(true)} className="bg-white hover:bg-slate-50 border border-slate-100 p-6 rounded-[28px] shadow-sm flex flex-col items-center gap-3 transition-all">
                            <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center"><Search size={24} /></div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.search}</span>
                        </button>
                        <button onClick={() => setIsBagsOpen(true)} className="bg-white hover:bg-slate-50 border border-slate-100 p-6 rounded-[28px] shadow-sm flex flex-col items-center gap-3 transition-all relative">
                            <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center"><Package size={24} /></div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.bags}</span>
                            {bagCount > 0 && <div className="absolute top-4 right-4 bg-slate-900 text-white text-[10px] font-black w-6 h-6 rounded-lg flex items-center justify-center">{bagCount}</div>}
                        </button>
                    </div>

                    {/* Identity Widget */}
                    <div className="bg-slate-900 rounded-[28px] p-6 text-white group cursor-pointer hover:bg-slate-800 transition-all">
                        {member ? (
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white"><User size={24} /></div>
                                <div>
                                    <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest leading-none mb-1">Premium Member</p>
                                    <p className="text-base font-black truncate max-w-[200px] leading-tight">{member.name}</p>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleMemberSubmit} className="flex gap-2">
                                <input
                                    type="text"
                                    value={memberInput}
                                    onChange={(e) => setMemberInput(e.target.value)}
                                    placeholder="MEMBER ID"
                                    className="bg-white/5 border border-white/10 rounded-xl px-4 flex-1 text-sm font-bold focus:outline-none focus:border-white/20 transition-all"
                                />
                                <button className="bg-white text-slate-900 px-4 py-3 rounded-xl text-[10px] font-black uppercase">LINK</button>
                            </form>
                        )}
                    </div>

                    <button onClick={() => setIsStaffModalOpen(true)} className="mt-auto py-4 bg-white border border-slate-100 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center justify-center gap-2 hover:text-red-500 transition-colors">
                        <HelpCircle size={14} />
                        {t.help}
                    </button>
                </div>

                {/* Right: Cart Manifest */}
                <div className="flex-1 bg-white rounded-[40px] shadow-premium border border-slate-100 overflow-hidden flex flex-col">
                    <div className="px-10 py-8 border-b border-slate-50 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-4">
                            <div className="w-11 h-11 bg-slate-900 text-white rounded-[14px] flex items-center justify-center shadow-lg shadow-slate-900/10"><ShoppingCart size={20} /></div>
                            <h3 className="text-xl font-black text-slate-900 tracking-tight">Active Manifest</h3>
                        </div>
                        <div className="px-5 py-2.5 bg-slate-50 rounded-full border border-slate-100">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{cart.length} SKU REGISTERED</span>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                        {cart.length === 0 ? (
                            <div className="h-full flex flex-col">
                                <div className="flex items-center justify-between mb-8 shrink-0">
                                    <div>
                                        <h4 className="text-lg font-black text-slate-900 tracking-tight">Quick Select</h4>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Add common items without barcodes</p>
                                    </div>
                                    <List size={20} className="text-slate-200" />
                                </div>
                                <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-6 overflow-y-auto pr-2 custom-scrollbar">
                                    {products.slice(0, 8).map((p) => (
                                        <motion.button
                                            whileHover={{ scale: 1.02, y: -4 }}
                                            whileTap={{ scale: 0.98 }}
                                            key={p.id}
                                            onClick={() => addItem(p.barcode)}
                                            className="bg-[#F8FAFC] border border-slate-100 rounded-[28px] p-5 flex flex-col items-center text-center group hover:border-emerald-500/20 hover:shadow-premium transition-all"
                                        >
                                            <div className="w-20 h-20 bg-white rounded-2xl overflow-hidden mb-4 shadow-sm border border-slate-100 p-2">
                                                <img src={p.image} alt={p.name} className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform" />
                                            </div>
                                            <span className="text-sm font-black text-slate-900 line-clamp-1 mb-1">
                                                {language === 'EN' ? p.name : language === 'SI' ? p.nameSi : p.nameTa}
                                            </span>
                                            <span className="text-xs font-bold text-emerald-500">Rs. {p.price}</span>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                <AnimatePresence initial={false}>
                                    {cart.map((item) => (
                                        <motion.div
                                            key={item.id} layout initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, x: 20 }}
                                            className="flex items-center gap-6 p-5 bg-[#F8FAFC] rounded-[24px] border border-slate-100 group hover:border-emerald-500/20 transition-all"
                                        >
                                            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white border border-slate-200 shrink-0">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-black text-slate-900 text-base leading-tight">
                                                    {language === 'EN' ? item.name : language === 'SI' ? item.nameSi : item.nameTa}
                                                </h4>
                                                <p className="text-sm font-bold text-slate-400 mt-1">Rs. {item.price.toLocaleString()}</p>
                                            </div>
                                            <div className="flex items-center gap-4 bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100">
                                                <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-50 text-slate-400"><Minus size={16} /></button>
                                                <span className="w-6 text-center font-black text-lg">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-50 text-slate-400"><Plus size={16} /></button>
                                            </div>
                                            <div className="w-32 text-right">
                                                <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1 leading-none">Total</p>
                                                <p className="text-lg font-black text-slate-900 leading-none">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                                            </div>
                                            <button onClick={() => removeItem(item.id)} className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={20} /></button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Summary Checkout Bar */}
            <div className="h-32 bg-slate-900 shrink-0 flex items-center px-12 gap-16">
                <div className="flex-1 flex gap-16">
                    <SummaryStat label={t.subtotal} value={`Rs. ${getSubtotal().toLocaleString()}`} />
                    {getSavings() > 0 && <SummaryStat label={t.savings} value={`- Rs. ${getSavings().toLocaleString()}`} color="text-emerald-400" />}
                    <SummaryStat label={t.tax} value={`Rs. ${getTax().toLocaleString()}`} />
                </div>

                <div className="flex items-center gap-12">
                    <div className="text-right">
                        <p className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.4em] mb-1 leading-none">Payable Total</p>
                        <p className="text-4xl font-black text-white tracking-tighter tabular-nums leading-none">Rs. {getTotal().toLocaleString()}</p>
                    </div>
                    <button
                        disabled={cart.length === 0}
                        onClick={() => setView('PAYMENT')}
                        className={`h-20 px-12 rounded-2xl font-black text-xl flex items-center gap-4 shadow-2xl transition-all active:scale-95 ${cart.length === 0 ? 'bg-white/5 text-white/20 cursor-not-allowed' : 'bg-emerald-500 text-white hover:bg-emerald-400 shadow-emerald-500/20'
                            }`}
                    >
                        {t.pay_now}
                        <ChevronRight size={20} />
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
            <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-1">{label}</span>
            <span className={`text-xl font-bold ${color}`}>{value}</span>
        </div>
    )
}

function SearchModal({ products, language, t, onClose, onAdd }: any) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-slate-900/60 backdrop-blur-md">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-[32px] w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
                <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="text-2xl font-black text-slate-900 uppercase">Inventory Lookup</h3>
                    <button onClick={onClose} className="w-12 h-12 rounded-full hover:bg-slate-50 flex items-center justify-center"><X /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-8 grid grid-cols-4 gap-6 custom-scrollbar">
                    {products.map((p: any) => (
                        <button key={p.id} onClick={() => { onAdd(p.barcode); onClose(); }} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-emerald-500 transition-all text-center group">
                            <img src={p.image} className="w-20 h-20 object-cover mx-auto mb-4 rounded-xl" />
                            <p className="text-sm font-black text-slate-900 line-clamp-1">{language === 'EN' ? p.name : language === 'SI' ? p.nameSi : p.nameTa}</p>
                            <p className="text-xs font-bold text-emerald-500 mt-1">Rs. {p.price}</p>
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
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-[32px] p-12 w-full max-w-md text-center">
                <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6"><Package size={40} /></div>
                <h3 className="text-3xl font-black text-slate-900 mb-8">{t.bags}</h3>
                <div className="flex items-center justify-center gap-10 mb-12">
                    <button onClick={() => setCount(Math.max(0, count - 1))} className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 hover:text-slate-900 transition-all"><Minus size={24} /></button>
                    <span className="text-6xl font-black text-slate-900 w-16">{count}</span>
                    <button onClick={() => setCount(count + 1)} className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 hover:text-slate-900 transition-all"><Plus size={24} /></button>
                </div>
                <button onClick={onClose} className="w-full h-16 bg-slate-900 text-white rounded-2xl font-black shadow-xl shadow-slate-900/10">CONFIRM</button>
            </motion.div>
        </div>
    );
}

function StaffModal({ t, onClose }: any) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-slate-900/80 backdrop-blur-lg">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-[32px] p-12 w-full max-w-lg text-center">
                <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse"><AlertCircle size={40} /></div>
                <h3 className="text-3xl font-black text-slate-900 mb-4">{t.call_staff}</h3>
                <p className="text-slate-400 font-bold mb-10 leading-relaxed">{t.staff_desc}</p>
                <button onClick={onClose} className="w-full h-16 bg-slate-100 text-slate-900 rounded-2xl font-black transition-all">DISMISS ALERT</button>
            </motion.div>
        </div>
    );
}
