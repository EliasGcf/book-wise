'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Session } from 'next-auth';
import Link from 'next/link';

import { BookCardFull } from '@components/BookCard';
import { BookDetailDialog } from '@components/BookDetailDialog';

import { CaretRight } from '@ui/icons';
import { Text } from '@ui/Text';

import { Book, Feedback, User } from '@libs/prisma';

type FeedbackWithAuthor = Feedback & { author: User };
type BookWithFeedbacks = Book & { feedbacks: FeedbackWithAuthor[] };

type LastReadProps = {
  book: BookWithFeedbacks;
  feedback: Feedback;
  user?: Session['user'];
};

export function LastRead({ book, feedback, user }: LastReadProps) {
  return (
    <section>
      <header className="mb-4 flex items-center justify-between">
        <Text size="sm" className="text-gray-01">
          Sua última leitura
        </Text>

        <Text
          variant="link"
          as={Link}
          size="sm"
          href="/profile"
          className="flex items-center gap-2 text-purple-01 transition-opacity hover:opacity-70"
          title="Ver todas as suas leituras"
        >
          Ver todas
          <CaretRight size={16} />
        </Text>
      </header>

      <BookDetailDialog book={book} user={user}>
        <Dialog.Trigger className="flex text-left">
          <BookCardFull
            stars={feedback.rating}
            title={book.title}
            author={book.author}
            imageUrl={book.image_url}
            description={book.description}
          />
        </Dialog.Trigger>
      </BookDetailDialog>
    </section>
  );
}
