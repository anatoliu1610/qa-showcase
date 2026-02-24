import './globals.css';
import { Inter, Space_Grotesk } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });

export const metadata: Metadata = {
  title: 'Oleksandr Pyavchyk — QA Engineer',
  description: 'QA Engineer portfolio with interactive skills web app and evidence coverage map.',
  openGraph: { title: 'Oleksandr Pyavchyk — QA Engineer', description: 'QA portfolio website', type: 'website' }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${space.variable}`}>
      <body className="font-[var(--font-inter)]">{children}</body>
    </html>
  );
}
