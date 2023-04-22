import { Book } from '@prisma/client';
import { Link } from '@ui/Link';
import { Text } from '@ui/Text';
import { Title } from '@ui/Title';
import NextLink from 'next/link';

import { Avatar } from '@components/Avatar';
import { Stars } from '@components/Stars';

import { dayjs } from '@libs/dayjs';

import { tw } from '@utils/tw';

type FeedbackCardProps = {
  author: {
    name: string;
    imageUrl?: string | null;
  };
  book?: Book;
  feedback: string;
  createdAt: Date;
  rating: number;
  className?: string;
};

export function FeedbackCard({
  author,
  book,
  feedback,
  rating,
  createdAt,
  className,
}: FeedbackCardProps) {
  return (
    <div
      className={tw('flex flex-col rounded-lg bg-gray-07 p-6', className, {
        'gap-8': !!book,
        'gap-5': !book,
      })}
    >
      <header className="flex justify-between">
        <div className="flex gap-4">
          {author.imageUrl && <Avatar imageUrl={author.imageUrl} name={author.name} />}
          <div>
            <Text size="md" className="text-gray-01">
              {author.name}
            </Text>
            <Text size="sm" className="text-gray-04 first-letter:capitalize">
              {dayjs(createdAt).fromNow()}
            </Text>
          </div>
        </div>

        <Stars votes={rating} />
      </header>

      <div className="flex gap-5">
        {book && (
          <Link as={NextLink} href={`/search?bookId=${book.id}`}>
            <img
              src={book.image_url}
              alt={book.title}
              className="max-h-[152px] min-w-[108px] rounded object-cover"
            />
          </Link>
        )}

        <div className="flex flex-col">
          {book && (
            <>
              <Link
                as={NextLink}
                href={`/search?bookId=${book.id}`}
                className="underline-offset-2 hover:underline"
              >
                <Title as="h3" size="xs" className="text-gray-01">
                  {book.title}
                </Title>
              </Link>
              <Text size="sm" className="text-gray-04">
                {book.author}
              </Text>
            </>
          )}

          <Text size="sm" className="mt-auto line-clamp-4 text-gray-04">
            {feedback}
          </Text>
        </div>
      </div>
    </div>
  );
}
