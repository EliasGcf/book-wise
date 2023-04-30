'use client';

import { Book, Feedback, User } from '@prisma/client';
import { Session } from 'next-auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { BookCard } from '@components/BookCard';
import { BookDetailDialog } from '@components/BookDetailDialog';

import { CaretRight } from '@ui/icons';
import { Text } from '@ui/Text';

import { Replace } from '@shared/types/replace';

type FeedbackWithAuthor = Replace<Feedback, { created_at: string }> & {
  author: Replace<User, { createdAt?: Date }>;
};

export type BookWithFeedbacks = Book & {
  feedbacks: FeedbackWithAuthor[];
};

type PopularBooksProps = {
  books: BookWithFeedbacks[];
  user?: Session['user'];
};

export function PopularBooks({ books, user }: PopularBooksProps) {
  const router = useRouter();

  return (
    <aside className="min-w-[324px]">
      <header className="mb-4 flex items-center justify-between">
        <Text size="sm" className="text-gray-01">
          Livros populares
        </Text>

        <Text
          variant="link"
          as={Link}
          size="sm"
          href="/search"
          className="flex items-center gap-2 text-purple-01 transition-opacity hover:opacity-70"
          title="Ver todos os livros"
        >
          Ver todos
          <CaretRight size={16} />
        </Text>
      </header>

      <ul className="grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-1">
        {books.map((book) => (
          <li key={book.id}>
            <BookDetailDialog onSubmit={router.refresh} user={user} book={book}>
              <BookCard.Compact book={book} />
            </BookDetailDialog>
          </li>
        ))}
      </ul>
    </aside>
  );
}
