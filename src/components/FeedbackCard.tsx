'use client';

import { Book, Feedback, User } from '@prisma/client';
import * as Dialog from '@radix-ui/react-dialog';
import { Text } from '@ui/Text';
import { Title } from '@ui/Title';
import { Session } from 'next-auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Avatar } from '@components/Avatar';
import { BookDetailDialog } from '@components/BookDetailDialog';
import { Stars } from '@components/Stars';

import { dayjs } from '@libs/dayjs';

import { Replace } from '@shared/types/replace';

import { tw } from '@utils/tw';

type FeedbackWithAuthor = Replace<Feedback, { created_at: string }> & {
  author: Replace<User, { createdAt?: Date }>;
};

export type BookWithFeedbacks = Book & {
  feedbacks: FeedbackWithAuthor[];
};

type FeedbackCardProps = {
  author: Replace<User, { createdAt?: Date }>;
  book?: BookWithFeedbacks;
  feedback: Replace<Feedback, { created_at: string }>;
  className?: string;
  user?: Session['user'];
};

export function FeedbackCard({
  author,
  book,
  feedback,
  className,
  user,
}: FeedbackCardProps) {
  const router = useRouter();
  const authorIsUser = author.id === user?.id;

  return (
    <div
      className={tw('flex flex-col rounded-lg bg-gray-07 p-6', className, {
        'gap-8': !!book,
        'gap-5': !book,
      })}
    >
      <header className="flex justify-between">
        <div className="flex gap-4">
          {author.image && (
            <Avatar
              imageUrl={author.image}
              name={author.name ?? 'Anônimo'}
              userId={!authorIsUser ? author.id : undefined}
            />
          )}
          <div>
            <Text
              size="md"
              as={!authorIsUser ? Link : undefined}
              href={`/profile/${author.id}`}
              className={tw('text-gray-01', {
                'underline-offset-2 hover:underline': !authorIsUser,
              })}
            >
              {author.name}
            </Text>
            <Text size="sm" className="text-gray-04 first-letter:capitalize">
              {dayjs(feedback.created_at).fromNow()}
            </Text>
          </div>
        </div>

        <Stars votes={feedback.rating} />
      </header>

      <div className="flex gap-5">
        {book && (
          <BookDetailDialog onSubmit={router.refresh} user={user} book={book}>
            <Dialog.Trigger>
              <img
                src={book.image_url}
                alt={book.title}
                className="max-h-[152px] min-w-[108px] rounded object-cover"
              />
            </Dialog.Trigger>
          </BookDetailDialog>
        )}

        <div className="flex flex-col">
          {book && (
            <>
              <BookDetailDialog onSubmit={router.refresh} user={user} book={book}>
                <Dialog.Trigger className="flex text-left">
                  <Title
                    as="h3"
                    size="xs"
                    className="text-gray-01 underline-offset-2 hover:underline"
                  >
                    {book.title}
                  </Title>
                </Dialog.Trigger>
              </BookDetailDialog>
              <Text
                size="sm"
                className="text-gray-04 underline-offset-2 hover:underline"
                as={Link}
                href={`/search?search=${book.author}`}
              >
                {book.author}
              </Text>
            </>
          )}

          <Text size="sm" className="mt-auto line-clamp-4 text-gray-04">
            {feedback.description}
          </Text>
        </div>
      </div>
    </div>
  );
}
