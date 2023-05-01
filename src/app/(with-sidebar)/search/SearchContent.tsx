'use client';

import { Category } from '@prisma/client';
import { Session } from 'next-auth';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { BookList } from '@app/(with-sidebar)/search/BookList';
import { Tags } from '@app/(with-sidebar)/search/Tags';

import { Input } from '@components/Form/Input';

import { Binoculars } from '@ui/icons';
import { Title } from '@ui/Title';

import { Book, Feedback, User } from '@libs/prisma';

type FeedbackWithAuthor = Feedback & { author: User };
type BookWithFeedbacks = Book & { feedbacks: FeedbackWithAuthor[] };

interface SearchContentProps {
  user?: Session['user'];
  books: BookWithFeedbacks[];
  categories: Category[];
}

export function SearchContent({ user, books, categories }: SearchContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const defaultSearch = searchParams.get('search') ?? '';
  const defaultCategory = searchParams.get('category') ?? '';

  const [search, setSearch] = useState(defaultSearch);
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);

  useEffect(() => {
    setSearch(defaultSearch);
    setSelectedCategory(defaultCategory);
  }, [defaultCategory, defaultSearch]);

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

    const query = new URLSearchParams(searchParams);

    if (event.target.value) {
      query.set('search', event.target.value);
    } else {
      query.delete('search');
    }

    router.push(`${pathname}?${query.toString()}`);
  }

  function handleSelectCategory(category: string) {
    setSelectedCategory(category);

    const query = new URLSearchParams(searchParams);

    if (category) {
      query.set('category', category);
    } else {
      query.delete('category');
    }

    router.push(`${pathname}?${query.toString()}`);
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
        <Tags
          categories={categories}
          onChange={handleSelectCategory}
          value={selectedCategory}
        />
        <BookList books={filteredBooks} user={user} />
      </div>
    </div>
  );
}
