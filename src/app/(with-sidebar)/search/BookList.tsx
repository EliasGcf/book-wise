import { Session } from 'next-auth';

import { BookCardCompact } from '@components/BookCard';
import { BookDetailDialog } from '@components/BookDetailDialog';

import { getBooks } from '@libs/prisma';

import { asyncComponent } from '@utils/async-component';

export type BookListProps = {
  user?: Session['user'];
  searchParams: { category?: string; search?: string };
};

async function AsyncBookList({ user, searchParams }: BookListProps) {
  const books = await getBooks();

  const { search = '', category = '' } = searchParams;

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
          <BookCardCompact key={book.id} book={book} />
        </BookDetailDialog>
      ))}
    </div>
  );
}

export const BookList = asyncComponent(AsyncBookList);
