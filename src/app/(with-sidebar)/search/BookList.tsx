'use client';

import { Session } from 'next-auth';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { BookCard } from '@components/BookCard';
import { BookDetailDialog } from '@components/BookDetailDialog';

import { Book, Feedback, User } from '@libs/prisma';

type FeedbackWithAuthor = Feedback & { author: User };
type BookWithFeedbacks = Book & { feedbacks: FeedbackWithAuthor[] };

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

  return (
    <div className="grid grid-cols-1 gap-5 overflow-y-auto lg:grid-cols-2 xl:grid-cols-3">
      {books.map((book) => (
        <BookDetailDialog
          key={book.id}
          onOpenChange={handleDialogChange}
          defaultOpen={book.id === bookId}
          book={book}
          user={user}
        >
          <BookCard.Compact key={book.id} book={book} />
        </BookDetailDialog>
      ))}
    </div>
  );
}
