'use client';

import { Book, Feedback, User } from '@prisma/client';
import * as Dialog from '@radix-ui/react-dialog';
import { CaretRight } from '@ui/icons';
import { Text } from '@ui/Text';
import { Session } from 'next-auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { BookCardFull } from '@components/BookCard';
import { BookDetailDialog } from '@components/BookDetailDialog';

import { Replace } from '@shared/types/replace';

type FeedbackWithAuthor = Replace<Feedback, { created_at: string }> & {
  author: Replace<User, { createdAt?: Date }>;
};

export type BookWithFeedbacks = Book & {
  feedbacks: FeedbackWithAuthor[];
};

type LastReadProps = {
  book: BookWithFeedbacks;
  feedback: Replace<Feedback, { created_at: string }>;
  user?: Session['user'];
};

export function LastRead({ book, feedback, user }: LastReadProps) {
  const router = useRouter();

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

      <BookDetailDialog book={book} user={user} onSubmit={router.refresh}>
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
