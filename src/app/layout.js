import { Roboto, Playfair_Display } from 'next/font/google';
import '@/styles/reset.css';
import '@/styles/global.css';

const body = Roboto({ subsets: ['latin'], variable: '--font-body' });
const header = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata = {
  title: 'KOFUN',
  description:
    'An app that tracks tasks and times them with a theme of a cute little ancient Japanese haniwa (terracotta clay figure from the Kofun period) that helps cheer you along',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${body.variable} ${header.variable}`}>{children}</body>
    </html>
  );
}
