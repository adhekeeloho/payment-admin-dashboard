import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Providers from './providers';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'Payment Admin Dashboard',
    description: 'Stripe-inspired admin experience for payments and payouts.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${poppins.className} min-h-screen bg-slate-50 text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}