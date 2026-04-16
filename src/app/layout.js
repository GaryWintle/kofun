import { Aleo } from 'next/font/google';
import '@/styles/reset.css';
import '@/styles/global.css';

const base = Aleo({ subsets: ['latin'], variable: '--font-family-base' });

export const metadata = {
  title: 'KOFUN',
  description:
    'An app that tracks tasks and times them with a theme of a cute little ancient Japanese haniwa (terracotta clay figure from the Kofun period) that helps cheer you along',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={base.variable}>{children}</body>
    </html>
  );
}
