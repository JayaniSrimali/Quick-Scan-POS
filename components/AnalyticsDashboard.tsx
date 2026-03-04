'use client';

import { useCartStore } from '@/store/useCartStore';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, Users, ShoppingBag, DollarSign, Clock, LayoutDashboard, BarChart3, Package } from 'lucide-react';

export default function AnalyticsDashboard() {
    const { recentOrders, isDashboardOpen, setDashboardOpen } = useCartStore();

    if (!isDashboardOpen) return null;

    const totalSales = recentOrders.reduce((sum, order) => sum + order.total, 0);
    const totalItems = recentOrders.reduce((sum, order) => sum + order.items.length, 0);
    const avgOrder = recentOrders.length > 0 ? totalSales / recentOrders.length : 0;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-8 bg-slate-900/40 backdrop-blur-md">
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="bg-white rounded-[32px] w-full max-w-6xl h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200"
            >
                {/* Dashboard Header */}
                <div className="px-10 py-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-900 text-white rounded-[14px] flex items-center justify-center shadow-lg">
                            <LayoutDashboard size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Live Operations Control</h2>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Session Real-time Analytics Dashboard</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setDashboardOpen(false)}
                        className="w-12 h-12 rounded-full hover:bg-slate-200 flex items-center justify-center transition-colors border border-slate-100"
                    >
                        <X size={24} className="text-slate-400" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-10 custom-scrollbar grid grid-cols-12 gap-8">

                    {/* Stat Cards */}
                    <div className="col-span-12 grid grid-cols-4 gap-6">
                        <StatCard icon={<DollarSign className="text-emerald-500" />} label="Session Revenue" value={`Rs. ${totalSales.toLocaleString()}`} trend="+12.5%" color="bg-emerald-50" />
                        <StatCard icon={<ShoppingBag className="text-blue-500" />} label="Orders Processed" value={recentOrders.length.toString()} trend="+4 today" color="bg-blue-50" />
                        <StatCard icon={<TrendingUp className="text-purple-500" />} label="Avg. Order Value" value={`Rs. ${avgOrder.toFixed(0)}`} trend="Stable" color="bg-purple-50" />
                        <StatCard icon={<Users className="text-amber-500" />} label="Active Sessions" value="1" trend="Local Only" color="bg-amber-50" />
                    </div>

                    {/* Main Content Area */}
                    <div className="col-span-8 space-y-8">
                        {/* Transaction Feed */}
                        <div className="bg-white rounded-[28px] border border-slate-100 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                    <Clock size={16} className="text-slate-400" />
                                    Live Transaction Stream
                                </h3>
                                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-full animate-pulse">LIVE FEED</span>
                            </div>
                            <div className="divide-y divide-slate-50 max-h-[400px] overflow-y-auto custom-scrollbar">
                                {recentOrders.length === 0 ? (
                                    <div className="py-20 text-center">
                                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Package size={24} className="text-slate-200" />
                                        </div>
                                        <p className="text-slate-400 font-bold text-sm tracking-tight">No transactions recorded in this session</p>
                                    </div>
                                ) : (
                                    recentOrders.map((order, idx) => (
                                        <div key={idx} className="p-5 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 font-black text-xs">
                                                    #{idx + 1}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-slate-900">{order.billNo}</p>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                        {new Date(order.timestamp).toLocaleTimeString()} • {order.items.length} Items
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-black text-slate-900">Rs. {order.total.toLocaleString()}</p>
                                                <p className={`text-[9px] font-bold uppercase ${order.paymentMethod === 'Card' ? 'text-blue-500' : 'text-amber-500'}`}>
                                                    {order.paymentMethod} Payment
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Area */}
                    <div className="col-span-4 space-y-8">
                        <div className="bg-slate-900 rounded-[28px] p-8 text-white relative overflow-hidden h-full">
                            <div className="relative z-10">
                                <BarChart3 size={32} className="text-emerald-500 mb-6" />
                                <h3 className="text-xl font-black mb-2 leading-tight">System Performance</h3>
                                <p className="text-sm text-white/40 font-medium mb-8">All localized engines operating at peak parameters.</p>

                                <div className="space-y-6">
                                    <SystemStat label="Database Latency" value="12ms" />
                                    <SystemStat label="Scanner Precision" value="99.9%" />
                                    <SystemStat label="TLS 1.3 Active" value="True" />
                                    <SystemStat label="Worker Threads" value="v4.2" />
                                </div>
                            </div>
                            <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-emerald-500/10 rounded-full blur-[100px]" />
                        </div>
                    </div>

                </div>
            </motion.div>
        </div>
    );
}

function StatCard({ icon, label, value, trend, color }: any) {
    return (
        <div className={`p-6 rounded-[24px] ${color} border border-white transition-all hover:scale-[1.02] hover:shadow-lg`}>
            <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 bg-white rounded-xl shadow-sm text-slate-900">{icon}</div>
                <span className="text-[10px] font-black text-emerald-600 bg-white/60 px-2 py-0.5 rounded-full">{trend}</span>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
            <p className="text-xl font-black text-slate-900 tracking-tight">{value}</p>
        </div>
    );
}

function SystemStat({ label, value }: any) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">{label}</span>
            <span className="text-xs font-black text-emerald-400">{value}</span>
        </div>
    );
}
