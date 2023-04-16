import { PropsWithChildren } from 'react';

import { Sidebar } from '@components/Sidebar';

export default function AuthenticatedLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="mx-auto flex w-full max-w-5xl flex-col px-4 pb-5 pt-14">
        {children}
      </main>
    </div>
  );
}
