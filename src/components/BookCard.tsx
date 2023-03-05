/* eslint-disable @next/next/no-img-element */
import { Text } from '@ui/Text';
import { Title } from '@ui/Title';

import { Stars } from '@components/Stars';

type BookCardFullProps = {
  title: string;
  author: string;
  imageUrl: string;
  description: string;
  stars: number;
};

function BookCardFull({
  title,
  author,
  imageUrl,
  description,
  stars,
}: BookCardFullProps) {
  return (
    <div className="flex h-[192px] gap-6 rounded-lg border-2 border-gray-06 bg-gray-06 px-6 py-5 transition-colors hover:border-gray-05">
      <img src={imageUrl} alt="" className="h-[152px] w-[108px] rounded" />

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
          <Text size="sm" as="p" className="mt-auto text-gray-03 line-clamp-2">
            {description}
          </Text>
        )}
      </div>
    </div>
  );
}

type BookCardCompactProps = {
  title: string;
  author: string;
  imageUrl: string;
};

function BookCardCompact({ title, author, imageUrl }: BookCardCompactProps) {
  return (
    <div className="flex h-[130px] gap-5 rounded-lg border-2 border-gray-07 bg-gray-07 px-5 py-4 transition-colors hover:border-gray-06">
      <img src={imageUrl} alt="" className="h-[94px] w-[64px] rounded" />

      <div className="flex h-full flex-col">
        <header>
          <Title size="xs" className="text-gray-01 line-clamp-2">
            {title}
          </Title>
          <Text size="sm" className="text-gray-04">
            {author}
          </Text>
        </header>

        <Stars votes={3} className="mt-auto" />
      </div>
    </div>
  );
}

export const BookCard = {
  Full: BookCardFull,
  Compact: BookCardCompact,
};
