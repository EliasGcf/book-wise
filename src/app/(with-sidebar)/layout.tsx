import { PropsWithChildren } from 'react';

import { CommandMenu } from '@components/CommandMenu';
import { Sidebar } from '@components/Sidebar';
import { Toast } from '@components/Toast';

import { prisma } from '@libs/prisma';

export default async function AuthenticatedLayout({ children }: PropsWithChildren) {
  const books = await prisma.book.findMany({});

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <Toast />
      <main className="mx-auto flex w-full max-w-5xl flex-col px-4 pb-5 pt-14">
        {children}
      </main>

      <CommandMenu books={books} />
    </div>
  );
}
