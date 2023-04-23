import { Book, Feedback } from '@prisma/client';
import { CaretRight } from '@ui/icons';
import { Text } from '@ui/Text';
import Link from 'next/link';

import { BookCardFull } from '@components/BookCard';

type LastReadProps = {
  book: Book;
  feedback: Feedback;
};

export function LastRead({ book, feedback }: LastReadProps) {
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

      <Text
        variant="link"
        as={Link}
        href={`/search?bookId=${book.id}`}
        title={`Ver mais feedbacks sobre o livro: ${book.title}`}
      >
        <BookCardFull
          stars={feedback.rating}
          title={book.title}
          author={book.author}
          imageUrl={book.image_url}
          description={book.description}
        />
      </Text>
    </section>
  );
}
