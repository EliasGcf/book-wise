import { Session } from 'next-auth';
import Link from 'next/link';

import { BookDetailDialog } from '@components/BookDetailDialog';
import { Input } from '@components/Form/Input';
import { Stars } from '@components/Stars';

import { Text } from '@ui/Text';
import { Title } from '@ui/Title';

import { dayjs } from '@libs/dayjs';
import { Book, Feedback, User } from '@libs/prisma';

type FeedbackWithAuthor = Feedback & { author: User };
type BookWithFeedbacks = Book & { feedbacks: FeedbackWithAuthor[] };
type FeedbackWithBook = Feedback & { book: BookWithFeedbacks };

type UserBookListProps = {
  user?: Session['user'];
  feedbacks: FeedbackWithBook[];
  search?: string;
};

export function UserBookList({ feedbacks, user, search = '' }: UserBookListProps) {
  const filteredFeedbacks = feedbacks.filter((feedback) => {
    return (
      feedback.book.title.toLowerCase().includes(search.toLowerCase()) ||
      feedback.book.author.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="flex w-full flex-col xl:max-w-[624px]">
      <Input name="search" setInSearchParams placeholder="Buscar livro avaliado" />

      <section className="mt-8 flex flex-col gap-6 overflow-y-auto">
        {filteredFeedbacks.map((feedback) => (
          <div key={feedback.id}>
            <Text size="sm" className="mb-2 text-gray-03 first-letter:capitalize">
              {dayjs(feedback.created_at).fromNow()}
            </Text>

            <div className="rounded-lg bg-gray-07 p-6">
              <div className="flex gap-6">
                <BookDetailDialog user={user} book={feedback.book}>
                  <img
                    src={feedback.book.image_url}
                    alt={feedback.book.title}
                    className="max-h-[134px] min-w-[98px] rounded object-cover"
                  />
                </BookDetailDialog>

                <div className="flex flex-col justify-between">
                  <div className="flex flex-col">
                    <BookDetailDialog user={user} book={feedback.book}>
                      <Title
                        size="sm"
                        as="h3"
                        className="text-gray-01 underline-offset-2 hover:underline"
                      >
                        {feedback.book.title}
                      </Title>
                    </BookDetailDialog>

                    <Text
                      size="sm"
                      className="text-gray-04 underline-offset-2 hover:underline"
                      as={Link}
                      href={`/search?search=${feedback.book.author}`}
                    >
                      {feedback.book.author}
                    </Text>
                  </div>

                  <Stars votes={feedback.rating} size={16} />
                </div>
              </div>

              <Text size="sm" className="mt-6 text-gray-03" as="p">
                {feedback.description}
              </Text>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
