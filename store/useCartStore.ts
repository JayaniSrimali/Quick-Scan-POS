import { create } from 'zustand';
import { Product, CartItem, Language, LoyaltyMember } from '@/types';
import { products, members } from '@/lib/data';

interface CartState {
    cart: CartItem[];
    language: Language;
    view: 'WELCOME' | 'SCANNING' | 'PAYMENT' | 'RECEIPT';
    allProducts: Product[];
    isLoading: boolean;
    lastScannedItem: Product | null;
    paymentMethod: string | null;
    member: LoyaltyMember | null;
    bagCount: number;

    // Actions
    fetchProducts: () => Promise<void>;
    addItem: (barcode: string) => boolean;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, delta: number) => void;
    clearCart: () => void;
    setLanguage: (lang: Language) => void;
    setView: (view: 'WELCOME' | 'SCANNING' | 'PAYMENT' | 'RECEIPT') => void;
    setPaymentMethod: (method: string | null) => void;
    setMember: (id: string) => boolean;
    setBags: (count: number) => void;
    saveOrder: () => Promise<boolean>;

    // Computed
    getSubtotal: () => number;
    getSavings: () => number;
    getTax: () => number;
    getTotal: () => number;
}

const VAT_RATE = 0.15;
const BAG_PRICE = 10;

export const useCartStore = create<CartState>((set, get) => ({
    cart: [],
    allProducts: [],
    isLoading: false,
    language: 'EN',
    view: 'WELCOME',
    lastScannedItem: null,
    paymentMethod: null,
    member: null,
    bagCount: 0,

    fetchProducts: async () => {
        set({ isLoading: true });
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            // If DB is empty, use initial data from lib/data.ts as fallback
            if (data.length === 0) {
                set({ allProducts: products });
            } else {
                set({ allProducts: data });
            }
        } catch (error) {
            console.error('Failed to fetch products:', error);
            set({ allProducts: products }); // Fallback to local data
        } finally {
            set({ isLoading: false });
        }
    },

    addItem: (barcode) => {
        const product = get().allProducts.find(p => p.barcode === barcode);
        if (!product) return false;

        set((state) => {
            const existingItem = state.cart.find(item => item.barcode === product.barcode);
            if (existingItem) {
                return {
                    cart: state.cart.map(item =>
                        item.barcode === product.barcode ? { ...item, quantity: item.quantity + 1 } : item
                    ),
                    lastScannedItem: product
                };
            }
            return {
                cart: [...state.cart, { ...product, quantity: 1 }],
                lastScannedItem: product
            };
        });
        return true;
    },

    removeItem: (id) => set((state) => ({
        cart: state.cart.filter(item => item.id !== id)
    })),

    updateQuantity: (id, delta) => set((state) => ({
        cart: state.cart.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
        )
    })),

    clearCart: () => set({ cart: [], lastScannedItem: null, paymentMethod: null, member: null, bagCount: 0 }),

    setLanguage: (lang) => set({ language: lang }),

    setView: (view) => set({ view: view }),

    setPaymentMethod: (method) => set({ paymentMethod: method }),

    setMember: (id) => {
        const memberData = members[id as keyof typeof members];
        if (memberData) {
            set({ member: { id, ...memberData } });
            return true;
        }
        return false;
    },

    setBags: (count) => set({ bagCount: count }),

    saveOrder: async () => {
        const state = get();
        const orderData = {
            billNo: `R:${Math.floor(1000000 + Math.random() * 9000000)}`,
            items: state.cart.map(item => ({
                barcode: item.barcode,
                name: state.language === 'EN' ? item.name : state.language === 'SI' ? item.nameSi : item.nameTa,
                price: item.price,
                quantity: item.quantity,
                total: item.price * item.quantity
            })),
            subtotal: state.getSubtotal(),
            tax: state.getTax(),
            savings: state.getSavings(),
            total: state.getTotal(),
            paymentMethod: state.paymentMethod,
            memberId: state.member?.id,
        };

        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });
            return res.ok;
        } catch (error) {
            console.error('Failed to save order:', error);
            return false;
        }
    },

    getSubtotal: () => {
        const itemsTotal = get().cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const bagsTotal = get().bagCount * BAG_PRICE;
        return itemsTotal + bagsTotal;
    },

    getSavings: () => {
        const subtotal = get().getSubtotal();
        const discount = get().member?.discount || 0;
        return (subtotal * discount) / 100;
    },

    getTax: () => {
        const taxableAmount = get().getSubtotal() - get().getSavings();
        return taxableAmount * VAT_RATE;
    },

    getTotal: () => {
        return get().getSubtotal() - get().getSavings() + get().getTax();
    }
}));
