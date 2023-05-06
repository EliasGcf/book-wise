'use client';

import { Session } from 'next-auth';
import { useSearchParams } from 'next/navigation';

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

  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';

  const filteredBooks = books.filter((book) => {
    const titleMatch = book.title.toLowerCase().includes(search.toLowerCase());
    const authorMatch = book.author.toLowerCase().includes(search.toLowerCase());
    const categoryMatch = category ? book.category_name === category : true;

    return (titleMatch || authorMatch) && categoryMatch;
  });

  return (
    <div className="grid grid-cols-1 gap-5 overflow-y-auto lg:grid-cols-2 xl:grid-cols-3">
      {filteredBooks.map((book) => (
        <BookDetailDialog key={book.id} book={book} user={user}>
          <BookCard.Compact key={book.id} book={book} />
        </BookDetailDialog>
      ))}
    </div>
  );
}
