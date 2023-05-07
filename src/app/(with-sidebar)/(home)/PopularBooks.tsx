import Link from 'next/link';

import { BookCardCompact } from '@components/BookCard';
import { BookDetailDialog } from '@components/BookDetailDialog';
import { Loading } from '@components/Loading';

import { CaretRight } from '@ui/icons';
import { Text } from '@ui/Text';

import { getServerSession } from '@libs/next-auth';
import { getPopularBooks } from '@libs/prisma';

import { asyncComponent } from '@utils/async-component';

async function AsyncPopularBooks() {
  const [session, popularBooks] = await Promise.all([
    getServerSession(),
    getPopularBooks(),
  ]);

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
        {popularBooks.map((book) => (
          <li key={book.id} className="flex flex-col">
            <BookDetailDialog user={session?.user} book={book}>
              <BookCardCompact book={book} />
            </BookDetailDialog>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function PopularBooksLoading() {
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
        <li className="flex flex-col">
          <Loading />
        </li>
      </ul>
    </aside>
  );
}

export const PopularBooks = asyncComponent(AsyncPopularBooks);
