export const metadata = {
  title: 'RocketBooks',
  icons: [{ type: 'image/png', url: '/favicon.png' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
