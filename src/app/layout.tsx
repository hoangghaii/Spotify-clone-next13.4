import { Figtree } from 'next/font/google';

import Sidebar from '@/components/sidebars/Sidebar';
import SupabaseProvider from '@/providers/SupabaseProvider';

import './globals.css';

const font = Figtree({ subsets: ['latin'] });

export const metadata = {
  title: 'Spotify Clone',
  description: 'Spotify Clone',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <SupabaseProvider>
          <Sidebar songs={[]}>{children}</Sidebar>
        </SupabaseProvider>
      </body>
    </html>
  );
}
