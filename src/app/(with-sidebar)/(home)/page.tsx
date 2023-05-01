import { LastRead } from '@app/(with-sidebar)/(home)/LastRead';
import { PopularBooks } from '@app/(with-sidebar)/(home)/PopularBooks';
import { RecentFeedbacks } from '@app/(with-sidebar)/(home)/RecentFeedbacks';

import { ChartLineUp } from '@ui/icons';
import { Title } from '@ui/Title';

import { getServerSession } from '@libs/next-auth';
import { getPopularBooks, getUserLastFeedback } from '@libs/prisma';

export default async function Dashboard() {
  const [session, popularBooks] = await Promise.all([
    getServerSession(),
    getPopularBooks(),
  ]);

  const lastFeedback = session ? await getUserLastFeedback(session.user.id) : null;

  return (
    <div className="flex flex-col overflow-hidden">
      <header className="flex items-center gap-3">
        <ChartLineUp size={32} className="text-green-01" />
        <Title size="lg" className="text-gray-01">
          Início
        </Title>
      </header>

      <div className="mt-10 flex flex-col-reverse gap-10 overflow-y-auto xl:flex-row xl:justify-between xl:gap-16">
        <div className="flex w-full flex-col gap-10 xl:max-w-[608px]">
          {lastFeedback && (
            <LastRead
              user={session?.user}
              feedback={lastFeedback}
              book={lastFeedback.book}
            />
          )}
          <RecentFeedbacks />
        </div>

        <PopularBooks user={session?.user} books={popularBooks} />
      </div>
    </div>
  );
}
