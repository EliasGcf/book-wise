'use client';

import { Book } from '@prisma/client';
import * as Dialog from '@radix-ui/react-dialog';
import { CaretRight } from '@ui/icons';
import { Link } from '@ui/Link';
import { Text } from '@ui/Text';
import NextLink from 'next/link';

import { BookCard } from '@components/BookCard';

type PopularBooksProps = {
  books: Book[];
};

export function PopularBooks({ books }: PopularBooksProps) {
  return (
    <Dialog.Root>
      <aside className="min-w-[324px]">
        <header className="mb-4 flex items-center justify-between">
          <Text size="sm" className="text-gray-01">
            Livros populares
          </Text>

          <Link
            as={NextLink}
            size="sm"
            href="/search"
            className="flex items-center gap-2 text-purple-01 transition-opacity hover:opacity-70"
            title="Ver todos os livros"
          >
            Ver todos
            <CaretRight size={16} />
          </Link>
        </header>

        <ul className="grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-1">
          {books.map((book) => (
            <li key={book.id}>
              <Link
                as={NextLink}
                href={`/search?bookId=${book.id}`}
                title={`Ver mais feedbacks sobre o livro: ${book.title}`}
              >
                <BookCard.Compact book={book} />
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </Dialog.Root>
  );
}
