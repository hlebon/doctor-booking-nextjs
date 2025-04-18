import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { QueryProvider } from '../providers/query-provider';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-poppins',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  title: {
    template: 'Doctor Booking',
    default: 'Doctor Booking | Find and Book Your Doctor',
  },
  description: 'Find and book appointments with the best doctors in your area',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
