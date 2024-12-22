import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata = {
  title: "floop.co.in | Modern Fashion Essentials",
  description: "Discover trendy and sustainable fashion at floop.co.in",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geist.variable}`}>
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
