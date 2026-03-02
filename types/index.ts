export interface Product {
  id: string;
  barcode: string;
  name: string;
  nameSi: string;
  nameTa: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface LoyaltyMember {
  id: string;
  name: string;
  points: number;
  discount: number; // Percentage
}

export type PaymentMethod = 'CARD' | 'QR' | 'CASH';

export type Language = 'EN' | 'SI' | 'TA';
