'use client';

import { Text } from '@ui/Text';
import { Title } from '@ui/Title';
import { useState } from 'react';

import { Input } from '@components/Form/Input';
import { Stars } from '@components/Stars';

type Book = {
  id: number;
  title: string;
  author: string;
  description: string;
  stars: number;
  created_at: Date;
  image_url: string;
};

type UserBookListProps = {
  books: Book[];
};

export function UserBookList({ books }: UserBookListProps) {
  const [search, setSearch] = useState('');

  const filteredBooks = books.filter((book) => {
    return book.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="flex w-full flex-col xl:max-w-[624px]">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value.trim())}
        placeholder="Buscar livro avaliado"
      />

      <section className="mt-8 flex flex-col gap-6 overflow-y-auto">
        {filteredBooks.map((book) => (
          <div key={book.id}>
            <Text size="sm" className="mb-2 text-gray-03">
              Há 2 dias
            </Text>

            <div className="rounded-lg bg-gray-07 p-6">
              <div className="flex gap-6">
                <img
                  src="https://m.media-amazon.com/images/I/91M9xPIf10L.jpg"
                  alt=""
                  className="max-h-[134px] min-w-[98px] rounded object-cover"
                />

                <div className="flex flex-col justify-between">
                  <div>
                    <Title size="sm" as="h3" className="text-gray-01">
                      {book.title}
                    </Title>
                    <Text size="sm" className="text-gray-04">
                      {book.author}
                    </Text>
                  </div>

                  <Stars votes={4} size={16} />
                </div>
              </div>

              <Text size="sm" className="mt-6 text-gray-03" as="p">
                {book.description}
              </Text>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
