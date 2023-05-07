import { CardHeader } from '@components/CardHeader';
import { FeedbackCard } from '@components/FeedbackCard';
import { Loading } from '@components/Loading';

import { getServerSession } from '@libs/next-auth';
import { getFeedbacks } from '@libs/prisma';

import { asyncComponent } from '@utils/async-component';

export async function AsyncRecentFeedbacks() {
  const [session, feedbacks] = await Promise.all([getServerSession(), getFeedbacks()]);

  return (
    <section className="flex flex-col gap-4 overflow-hidden">
      <CardHeader title="Avaliações mais recentes" />

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

export function RecentFeedbacksLoading() {
  return (
    <section className="flex flex-col gap-4 overflow-hidden">
      <CardHeader title="Avaliações mais recentes" />
      <Loading />
    </section>
  );
}

export const RecentFeedbacks = asyncComponent(AsyncRecentFeedbacks);
