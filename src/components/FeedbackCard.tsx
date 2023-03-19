import { Text } from '@ui/Text';
import { Title } from '@ui/Title';
import clsx from 'clsx';

import { Avatar } from '@components/Avatar';
import { Stars } from '@components/Stars';

import { dayjs } from '@libs/dayjs';

type FeedbackCardProps = {
  author: {
    name: string;
    imageUrl: string;
  };
  book?: {
    title: string;
    imageUrl: string;
    author: string;
  };
  feedback: string;
  createdAt: Date;
};

export function FeedbackCard({ author, book, feedback, createdAt }: FeedbackCardProps) {
  return (
    <div
      className={clsx('flex flex-col rounded-lg bg-gray-07 p-6', {
        'gap-8': !!book,
        'gap-5': !book,
      })}
    >
      <header className="flex justify-between">
        <div className="flex gap-4">
          <Avatar imageUrl={author.imageUrl} name={author.name} />
          <div>
            <Text size="md" className="text-gray-01">
              {author.name}
            </Text>
            <Text size="sm" className="text-gray-04">
              {dayjs(createdAt).fromNow()}
            </Text>
          </div>
        </div>

        <Stars votes={4} />
      </header>

      <div className="flex gap-5">
        {book && (
          <img
            src={book.imageUrl}
            alt={book.title}
            className="max-h-[152px] min-w-[108px] rounded object-cover"
          />
        )}

        <div className="flex flex-col">
          {book && (
            <>
              <Title as="h3" size="xs" className="text-gray-01">
                {book.title}
              </Title>
              <Text size="sm" className="text-gray-04">
                {book.author}
              </Text>
            </>
          )}

          <Text size="sm" className="mt-auto text-gray-04 line-clamp-4">
            {feedback}
          </Text>
        </div>
      </div>
    </div>
  );
}
