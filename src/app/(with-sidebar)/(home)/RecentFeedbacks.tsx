/* eslint-disable no-use-before-define */
import { Text } from '@ui/Text';

import { FeedbackCard } from '@components/FeedbackCard';

import { prisma } from '@libs/prisma';

import { asyncComponent } from '@utils/async-component';

export async function AsyncRecentFeedbacks() {
  const feedbacks = await prisma.feedback.findMany({
    include: { author: true, book: true },
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
              rating={feedback.rating}
              author={{
                name: feedback.author.name ?? feedback.author.email ?? 'Autor sem nome',
                imageUrl: feedback.author.image,
              }}
              book={feedback.book}
              createdAt={feedback.created_at}
              feedback={feedback.description}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export const RecentFeedbacks = asyncComponent(AsyncRecentFeedbacks);
