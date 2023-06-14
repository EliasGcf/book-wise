import { Session } from 'next-auth';
import Link from 'next/link';

import { Avatar } from '@components/Avatar';
import { BookDetailDialog } from '@components/BookDetailDialog';
import { DeleteFeedbackButton } from '@components/DeleteFeedbackButton';
import { Stars } from '@components/Stars';

import { Text } from '@ui/Text';
import { Title } from '@ui/Title';

import { dayjs } from '@libs/dayjs';
import { Book, Feedback, User } from '@libs/prisma';

import { deleteFeedback } from '@utils/delete-feedback';
import { tw } from '@utils/tw';

type FeedbackCardProps = {
  author: User;
  book?: Book;
  feedback: Feedback;
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
  const authorIsUser = author.id === user?.id;

  return (
    <div
      className={tw('flex flex-col rounded-lg bg-gray-07 p-6', className, {
        'gap-8': !!book,
        'gap-5': !book && feedback.description.length > 0,
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

        <div className="flex h-fit gap-2">
          {user && authorIsUser && (
            <DeleteFeedbackButton
              deleteAction={deleteFeedback}
              user={user}
              feedback={feedback}
              author={author}
            />
          )}
          <Stars votes={feedback.rating} />
        </div>
      </header>

      <div className="flex gap-5">
        {book && (
          <BookDetailDialog
            book={book}
            trigger={
              <img
                src={book.image_url}
                alt={book.title}
                className="max-h-[152px] min-w-[108px] rounded object-cover"
              />
            }
          />
        )}

        <div className="flex flex-col">
          {book && (
            <>
              <BookDetailDialog
                book={book}
                trigger={
                  <Title
                    as="h3"
                    size="xs"
                    className="text-left text-gray-01 underline-offset-2 hover:underline"
                  >
                    {book.title}
                  </Title>
                }
              />

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
