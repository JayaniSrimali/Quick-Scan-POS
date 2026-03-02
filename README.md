# Supermarket Self-Checkout POS Kiosk System

A premium, touch-optimized Self-Checkout Kiosk system built with Next.js 15, TypeScript, and Tailwind CSS. Designed for university final project portfolios with focus on UX, accessibility, and modern aesthetics.

## 🚀 Features
- **Portrait Kiosk Layout:** Optimized for 1080x1920 touchscreen displays.
- **Bilingual Support:** Full English and Sinhala (සිංහල) language support.
- **Smart Barcode Scannnig:** Simulated barcode scanner with auto-focus and instant feedback.
- **Dynamic Cart Management:** Real-time totals, quantity controls, and smooth animations.
- **Secure Payment Simulation:** Multi-step workflow for Card, QR, and Cash payments.
- **Digital Receipting:** Professional invoice preview with printable layout.
- **Modern Tech Stack:** Zustand for state, Framer Motion for animations, Lucide for icons.

## 🛠️ Setup Instructions

### 1. Prerequisites
- Node.js (v18 or higher)
- MongoDB Database (Local or Atlas)

### 2. Installation & DB Setup
1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env.local` file in the root and add your MongoDB connection string:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   ```
3. Seed the database with sample products by visiting:
   `http://localhost:3000/api/seed`

### 3. Running Locally
Start the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Barcode Simulation
While in the "Scanning" screen, focus is trapped on a hidden input. You can type the following barcodes to simulate scanning:
- `1001` - Fresh Red Apple
- `1002` - Loaf of White Bread
- `1003` - Amul Fresh Milk
- `1004` - Basmati Rice
- `1005` - Red Onions
- `1006` - Potato Chips

## 📂 Project Structure
- `app/`: Next.js App Router (Layout, Routing, API)
- `components/`: UI Components (Header, Scanner, Cart, Payment, etc.)
- `store/`: Zustand State Store
- `lib/`: Mock data and translations
- `types/`: TypeScript interfaces
- `public/`: Assets and Images

## 🎨 Design System
- **Primary Color:** #004aad (Supermarket Blue)
- **Secondary Color:** #4CAF50 (Fresh Green)
- **Typography:** Inter (Accessible Sans-serif)
- **Aesthetics:** Glassmorphism, Rounded Cards, Soft Shadows.

## 🎓 Academic Credit
Developed as a high-fidelity demonstration for a Supermarket POS System.
