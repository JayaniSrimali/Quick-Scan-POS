'use client';

import { useCartStore } from '@/store/useCartStore';
import WelcomeScreen from '@/components/WelcomeScreen';
import ScanningView from '@/components/ScanningView';
import PaymentModal from '@/components/PaymentModal';
import ReceiptView from '@/components/ReceiptView';
import StatusBanner from '@/components/StatusBanner';
import Header from '@/components/Header';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

export default function KioskPage() {
  const { view, fetchProducts } = useCartStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <main className="kiosk-container font-sans text-slate-800">
      <Header />
      <StatusBanner />

      <div className="flex-1 relative overflow-hidden bg-slate-50">
        <AnimatePresence mode="wait">
          {view === 'WELCOME' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full"
            >
              <WelcomeScreen />
            </motion.div>
          )}

          {view === 'SCANNING' && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full"
            >
              <ScanningView />
            </motion.div>
          )}

          {view === 'PAYMENT' && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="h-full"
            >
              <PaymentModal />
            </motion.div>
          )}

          {view === 'RECEIPT' && (
            <motion.div
              key="receipt"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="h-full"
            >
              <ReceiptView />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Help Button */}
      <button
        className="fixed bottom-8 right-8 w-20 h-20 bg-amber-500 hover:bg-amber-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-transform active:scale-90 z-50"
        onClick={() => alert('Assistance is on the way!')}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
      </button>

      <AnalyticsDashboard />
    </main>
  );
}
