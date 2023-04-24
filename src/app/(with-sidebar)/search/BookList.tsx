'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Session } from 'next-auth';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { BookWithFeedbacks } from '@app/(with-sidebar)/search/page';

import { BookCard } from '@components/BookCard';
import { BookDetailDialog } from '@components/BookDetailDialog';

export type BookListProps = {
  user?: Session['user'];
  books: BookWithFeedbacks[];
};

export function BookList({ user, books }: BookListProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const bookId = searchParams.get('bookId');

  function handleDialogChange(value: boolean) {
    if (!value) {
      if (bookId) router.push(pathname);
    }
  }

  function handleFormSubmit() {
    router.refresh();
  }

  return (
    <div className="grid grid-cols-1 gap-5 overflow-y-auto lg:grid-cols-2 xl:grid-cols-3">
      {books.map((book) => (
        <Dialog.Root onOpenChange={handleDialogChange} defaultOpen={book.id === bookId}>
          <BookCard.Compact key={book.id} book={book} />
          <BookDetailDialog onSubmit={handleFormSubmit} book={book} user={user} />
        </Dialog.Root>
      ))}
    </div>
  );
}
