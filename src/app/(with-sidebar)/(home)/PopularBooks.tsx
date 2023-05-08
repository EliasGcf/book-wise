import { BookCardCompact } from '@components/BookCard';
import { BookDetailDialog } from '@components/BookDetailDialog';
import { CardHeader } from '@components/CardHeader';
import { Loading } from '@components/Loading';

import { getPopularBooks } from '@libs/prisma';

import { asyncComponent } from '@utils/async-component';

async function AsyncPopularBooks() {
  const popularBooks = await getPopularBooks();

  return (
    <aside className="flex min-w-[324px] flex-col gap-4">
      <CardHeader
        title="Livros populares"
        href="/search"
        linkTitle="Ver todos os livros"
      />

      <ul className="grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-1">
        {popularBooks.map((book) => (
          <li key={book.id} className="flex flex-col">
            <BookDetailDialog book={book} trigger={<BookCardCompact book={book} />} />
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function PopularBooksLoading() {
  return (
    <aside className="flex min-w-[324px] flex-col gap-4">
      <CardHeader
        title="Livros populares"
        href="/search"
        linkTitle="Ver todos os livros"
      />

      <Loading />
    </aside>
  );
}

export const PopularBooks = asyncComponent(AsyncPopularBooks);
