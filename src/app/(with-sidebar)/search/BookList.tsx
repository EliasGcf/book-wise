import { BookCardCompact } from '@components/BookCard';
import { BookDetailDialog } from '@components/BookDetailDialog';

import { getBooks } from '@libs/prisma';

import { asyncComponent } from '@utils/async-component';

export type BookListProps = {
  searchParams: { category?: string; search?: string; book: string };
};

async function AsyncBookList({ searchParams }: BookListProps) {
  const books = await getBooks();

  const { search = '', category = '', book: bookSlug } = searchParams;

  const filteredBooks = books.filter((book) => {
    const titleMatch = book.title.toLowerCase().includes(search.toLowerCase());
    const authorMatch = book.author.toLowerCase().includes(search.toLowerCase());
    const categoryMatch = category ? book.category_name === category : true;

    return (titleMatch || authorMatch) && categoryMatch;
  });

  return (
    <div className="grid grid-cols-1 gap-5 overflow-y-auto lg:grid-cols-2 xl:grid-cols-3">
      {filteredBooks.map((book) => (
        <BookDetailDialog
          trigger={<BookCardCompact key={book.id} book={book} />}
          key={book.id}
          book={book}
          defaultOpen={bookSlug === book.slug}
        />
      ))}
    </div>
  );
}

export const BookList = asyncComponent(AsyncBookList);
