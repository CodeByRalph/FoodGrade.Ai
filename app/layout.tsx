import './globals.css';
import type { Metadata } from 'next';
import { Manrope, Space_Grotesk } from 'next/font/google';
import { cn } from '@/lib/utils';

const manrope = Manrope({ subsets: ['latin'] });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FoodGradeAI - AI-Powered Food Safety Audits',
  description: 'Streamline food safety compliance with intelligent automation powered by AI.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(
        manrope.className, 
        'antialiased min-h-screen overflow-x-hidden'
      )}>
        {children}
      </body>
    </html>
  );
}
