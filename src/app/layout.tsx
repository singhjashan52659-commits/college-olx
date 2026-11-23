import type { Metadata } from 'next';
import './globals.css';
import { MarketplaceProvider } from '../context/MarketplaceContext';

export const metadata: Metadata = {
  title: 'College OLX — Student Campus Marketplace',
  description: 'Buy and sell cycles, textbooks, calculators, furniture, and electronics within your college campus.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-slate-50 text-slate-900">
        <MarketplaceProvider>{children}</MarketplaceProvider>
      </body>
    </html>
  );
}
