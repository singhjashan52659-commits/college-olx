import type { Metadata, Viewport } from 'next';
import './globals.css';
import { MarketplaceProvider } from '../context/MarketplaceContext';

export const metadata: Metadata = {
  title: 'College OLX — Student Campus Marketplace',
  description: 'Buy and sell cycles, textbooks, calculators, furniture, and electronics within your college campus.',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'College OLX',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b1120' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="font-sans antialiased bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-full flex flex-col transition-colors selection:bg-blue-500 selection:text-white">
        <MarketplaceProvider>{children}</MarketplaceProvider>
      </body>
    </html>
  );
}
