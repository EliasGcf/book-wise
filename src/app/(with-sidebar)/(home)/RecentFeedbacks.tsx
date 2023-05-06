import { FeedbackCard } from '@components/FeedbackCard';

import { Text } from '@ui/Text';

import { getServerSession } from '@libs/next-auth';
import { getFeedbacks } from '@libs/prisma';

import { asyncComponent } from '@utils/async-component';

export async function AsyncRecentFeedbacks() {
  const [session, feedbacks] = await Promise.all([getServerSession(), getFeedbacks()]);

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
              author={feedback.author}
              book={feedback.book}
              feedback={feedback}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export const RecentFeedbacks = asyncComponent(AsyncRecentFeedbacks);
