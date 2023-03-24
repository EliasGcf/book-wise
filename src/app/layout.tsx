import { Nunito_Sans } from 'next/font/google';

import '@shared/styles/global.css';

const nunito = Nunito_Sans({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--nunito-sans',
});

export const metadata = {
  title: 'BookWise',
  icons: [{ type: 'image/png', url: '/favicon.png' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={nunito.variable}>
      <body className="bg-gray-08 text-gray-03 antialiased">{children}</body>
    </html>
  );
}
