'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Session } from 'next-auth';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

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

  const [selectedBook, setSelectedBook] = useState<BookWithFeedbacks | null>(
    bookId ? books.find((book) => book.id === bookId) ?? null : null,
  );

  const isDialogOpen = !!selectedBook;

  function handleDialogChange(value: boolean) {
    if (!value) {
      setSelectedBook(null);
      if (bookId) router.push(pathname);
    }
  }

  function handleFormSubmit() {
    setSelectedBook(null);
    router.refresh();
  }

  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={handleDialogChange}>
      <div className="grid grid-cols-1 gap-5 overflow-y-auto lg:grid-cols-2 xl:grid-cols-3">
        {books.map((book) => (
          <BookCard.Compact
            key={book.id}
            book={book}
            onClick={() => setSelectedBook(book)}
          />
        ))}

        <BookDetailDialog onSubmit={handleFormSubmit} book={selectedBook} user={user} />
      </div>
    </Dialog.Root>
  );
}
