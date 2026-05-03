import { Aleo } from 'next/font/google';
import '@/styles/reset.css';
import '@/styles/global.css';

const base = Aleo({ subsets: ['latin'], variable: '--font-family-base' });

export const metadata = {
  title: 'KOFUN',
  description:
    'An app that tracks tasks and times them with a theme of a cute little ancient Japanese haniwa (terracotta clay figure from the Kofun period) that helps cheer you along',
  icons: {
    icon: '/favicon.svg',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={base.variable}>{children}</body>
    </html>
  );
}

export const viewport = {
  viewportFit: 'cover',
  themeColor: 'oklch(76.658% 0.14238 233.664)',
};
