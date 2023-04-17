'use client';

import { Book } from '@prisma/client';
import * as Dialog from '@radix-ui/react-dialog';
import { Session } from 'next-auth';

import { BookCard } from '@components/BookCard';
import { BookDetailDialog } from '@components/BookDetailDialog';

export type BookListProps = {
  user?: Session['user'];
  books: Book[];
};

export function BookList({ user, books }: BookListProps) {
  return (
    <Dialog.Root>
      <div className="grid grid-cols-1 gap-5 overflow-y-auto lg:grid-cols-2 xl:grid-cols-3">
        {books.map((book) => (
          <BookCard.Compact
            key={book.id}
            imageUrl={book.image_url}
            title={book.title}
            author={book.author}
          />
        ))}

        <BookDetailDialog user={user} />
      </div>
    </Dialog.Root>
  );
}
