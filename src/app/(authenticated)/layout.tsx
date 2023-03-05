import { PropsWithChildren } from 'react';

import { Sidebar } from '@components/Sidebar';

export default function AuthenticatedLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex h-screen overflow-hidden">
      <Sidebar />
      {children}
    </main>
  );
}
