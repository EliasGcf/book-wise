'use client';

import { Book, Category } from '@prisma/client';
import { Binoculars } from '@ui/icons';
import { Title } from '@ui/Title';
import { Session } from 'next-auth';
import { useState } from 'react';

import { BookList } from '@app/(with-sidebar)/search/BookList';
import { Tags } from '@app/(with-sidebar)/search/Tags';

import { Input } from '@components/Form/Input';

interface SearchContentProps {
  user?: Session['user'];
  books: Book[];
  categories: Category[];
}

export function SearchContent({ user, books, categories }: SearchContentProps) {
  // const router = useRouter();
  // const pathname = usePathname();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const filteredBooks = books.filter((book) => {
    const titleMatch = book.title.toLowerCase().includes(search.toLowerCase());
    const authorMatch = book.author.toLowerCase().includes(search.toLowerCase());
    const categoryMatch = selectedCategory
      ? book.category_name === selectedCategory
      : true;

    return (titleMatch || authorMatch) && categoryMatch;
  });

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  return (
    <div className="flex flex-col overflow-hidden">
      <header className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <Binoculars size={32} className="text-green-01" />
          <Title size="lg" className="text-gray-01">
            Explorar
          </Title>
        </div>

        <Input
          value={search}
          onChange={handleSearch}
          placeholder="Buscar livro ou autor"
          className="max-w-md"
        />
      </header>

      <div className="mt-5 flex flex-col gap-12 overflow-hidden">
        <Tags categories={categories} onChange={setSelectedCategory} />
        <BookList books={filteredBooks} user={user} />
      </div>
    </div>
  );
}
