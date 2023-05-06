'use client';

import { Session } from 'next-auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

import { Avatar } from '@components/Avatar';
import { BookDetailDialog } from '@components/BookDetailDialog';
import { Stars } from '@components/Stars';

import { Trash } from '@ui/icons';
import { Text } from '@ui/Text';
import { Title } from '@ui/Title';

import { dayjs } from '@libs/dayjs';
import { Book, Feedback, User } from '@libs/prisma';

import { deleteFeedback } from '@utils/delete-feedback';
import { tw } from '@utils/tw';

type FeedbackWithAuthor = Feedback & { author: User };
type BookWithFeedbacks = Book & { feedbacks: FeedbackWithAuthor[] };

type FeedbackCardProps = {
  author: User;
  book?: BookWithFeedbacks;
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
  const router = useRouter();

  const authorIsUser = author.id === user?.id;

  async function handleDeleteFeedback() {
    if (!user || !authorIsUser) return;

    // TODO: Replace with a confirmation dialog
    // eslint-disable-next-line no-alert
    if (!window.confirm('Tem certeza que deseja excluir essa avaliação?')) return;

    await deleteFeedback(feedback.id, user.id);

    toast.success('Avaliação excluída com sucesso!', { position: 'top-left' });

    router.refresh();
  }

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

        <div className="flex h-fit gap-2">
          {authorIsUser && (
            <button
              type="button"
              title="Excluir avaliação"
              className="text-danger-light transition-all hover:scale-125"
              onClick={handleDeleteFeedback}
            >
              <Trash size={16} />
            </button>
          )}
          <Stars votes={feedback.rating} />
        </div>
      </header>

      <div className="flex gap-5">
        {book && (
          <BookDetailDialog user={user} book={book}>
            <img
              src={book.image_url}
              alt={book.title}
              className="max-h-[152px] min-w-[108px] rounded object-cover"
            />
          </BookDetailDialog>
        )}

        <div className="flex flex-col">
          {book && (
            <>
              <BookDetailDialog user={user} book={book}>
                <Title
                  as="h3"
                  size="xs"
                  className="text-left text-gray-01 underline-offset-2 hover:underline"
                >
                  {book.title}
                </Title>
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
