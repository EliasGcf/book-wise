'use client';

/* eslint-disable @next/next/no-img-element */
import { Book } from '@prisma/client';

import { Stars } from '@components/Stars';

import { Text } from '@ui/Text';
import { Title } from '@ui/Title';

type BookCardFullProps = {
  title: string;
  author: string;
  imageUrl: string;
  description: string;
  stars: number;
};

export function BookCardFull({
  title,
  author,
  imageUrl,
  description,
  stars,
}: BookCardFullProps) {
  return (
    <div className="flex h-[192px] gap-6 rounded-lg border-2 border-gray-06 bg-gray-06 px-6 py-5 text-left transition-colors hover:border-gray-05">
      <img
        src={imageUrl}
        alt=""
        className="max-h-[152px] min-w-[108px] rounded object-cover"
      />

      <div className="flex h-full w-full flex-col">
        <header>
          <div className="mb-3 flex w-full items-center justify-between">
            <Text size="sm" as="span" className="text-gray-03">
              Hoje
            </Text>

            <Stars votes={stars} />
          </div>

          <Title size="xs" className="text-gray-01">
            {title}
          </Title>

          <Text size="sm" className="text-gray-04">
            {author}
          </Text>
        </header>

        {description && (
          <Text size="sm" as="p" className="mt-auto line-clamp-2 text-gray-03">
            {description}
          </Text>
        )}
      </div>
    </div>
  );
}

type BookCardCompactProps = {
  book: Book;
};

export function BookCardCompact({ book }: BookCardCompactProps) {
  return (
    <div className="flex h-[130px] w-full gap-5 rounded-lg border-2 border-gray-07 bg-gray-07 px-5 py-4 outline-none transition-colors hover:border-gray-06 focus:border-gray-06">
      <img
        src={book.image_url}
        alt={book.title}
        className="max-h-[94px] min-w-[64px] rounded object-cover"
      />

      <div className="flex h-full flex-col">
        <header className="text-left">
          <Title size="xs" className="line-clamp-2 text-gray-01">
            {book.title}
          </Title>
          <Text as="span" size="sm" className="text-gray-04">
            {book.author}
          </Text>
        </header>

        <Stars votes={book.rating} className="mt-auto" />
      </div>
    </div>
  );
}

export const BookCard = {
  Full: BookCardFull,
  Compact: BookCardCompact,
};
