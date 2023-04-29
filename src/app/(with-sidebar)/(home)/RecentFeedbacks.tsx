/* eslint-disable no-use-before-define */
import { Text } from '@ui/Text';

import { FeedbackCard } from '@components/FeedbackCard';

import { getServerSession } from '@libs/next-auth';
import { prisma } from '@libs/prisma';

import { asyncComponent } from '@utils/async-component';

export async function AsyncRecentFeedbacks() {
  const session = await getServerSession();

  const feedbacks = await prisma.feedback.findMany({
    include: {
      author: true,
      book: {
        include: {
          feedbacks: {
            include: { author: true },
          },
        },
      },
    },
    orderBy: { created_at: 'desc' },
  });

  return (
    <section className="flex flex-col overflow-hidden">
      <header className="mb-4 flex items-center justify-between">
        <Text size="sm" className="text-gray-01">
          Avaliações mais recentes
        </Text>
      </header>

      <ul className="flex flex-col gap-3 overflow-y-auto rounded-lg">
        {feedbacks.map((feedback) => (
          <li key={feedback.id}>
            <FeedbackCard
              user={session?.user}
              author={{ ...feedback.author, createdAt: undefined }}
              book={{
                ...feedback.book,
                feedbacks: feedback.book.feedbacks.map((f) => ({
                  ...f,
                  created_at: f.created_at.toISOString(),
                  author: { ...f.author, createdAt: undefined },
                })),
              }}
              feedback={{
                author_id: feedback.author_id,
                book_id: feedback.book_id,
                rating: feedback.rating,
                created_at: feedback.created_at.toISOString(),
                description: feedback.description,
                id: feedback.id,
              }}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export const RecentFeedbacks = asyncComponent(AsyncRecentFeedbacks);
