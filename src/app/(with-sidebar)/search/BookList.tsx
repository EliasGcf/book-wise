'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { DefaultSession } from 'next-auth';

import { BookCard } from '@components/BookCard';
import { BookDetailDialog } from '@components/BookDetailDialog';

type BookListProps = {
  user?: DefaultSession['user'];
};

export function BookList({ user }: BookListProps) {
  return (
    <Dialog.Root>
      <div className="grid grid-cols-1 gap-5 overflow-y-auto lg:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 30 }).map((_, index) => (
          <BookCard.Compact
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            imageUrl="https://m.media-amazon.com/images/I/91BsZhxCRjL.jpg"
            title="A revolução dos bichos"
            author="George Orwell"
          />
        ))}

        <BookDetailDialog user={user} />
      </div>
    </Dialog.Root>
  );
}
