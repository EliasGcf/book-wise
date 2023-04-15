'use client';

import { Binoculars } from '@ui/icons';
import { Title } from '@ui/Title';
import { Session } from 'next-auth';
import { useState } from 'react';

import { BookList, BookListProps } from '@app/(with-sidebar)/search/BookList';
import { Tags } from '@app/(with-sidebar)/search/Tags';

import { Input } from '@components/Form/Input';

interface SearchContentProps {
  user: Session['user'];
  books: BookListProps['books'];
}

export function SearchContent({ user, books }: SearchContentProps) {
  const [search, setSearch] = useState('');

  const filteredBooks = books.filter((book) => {
    return (
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
    );
  });

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
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar livro ou autor"
          className="max-w-md"
        />
      </header>

      <div className="mt-5 flex flex-col gap-12 overflow-hidden">
        <Tags />
        <BookList books={filteredBooks} user={user} />
      </div>
    </div>
  );
}
