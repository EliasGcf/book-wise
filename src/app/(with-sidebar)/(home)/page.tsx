import { ChartLineUp } from '@ui/icons';
import { Title } from '@ui/Title';

import { LastRead } from '@app/(with-sidebar)/(home)/LastRead';
import { PopularBooks } from '@app/(with-sidebar)/(home)/PopularBooks';
import { RecentFeedbacks } from '@app/(with-sidebar)/(home)/RecentFeedbacks';

import { getServerSession } from '@libs/next-auth';
import { prisma } from '@libs/prisma';

export default async function Dashboard() {
  const session = await getServerSession();

  const popularBooks = await prisma.book.findMany({
    take: 4,
    orderBy: { feedbacks: { _count: 'desc' } },
    where: { feedbacks: { some: {} } },
  });

  const lastFeedback = session
    ? await prisma.feedback.findFirst({
        where: { author_id: session.user.id },
        include: { book: true },
      })
    : null;

  return (
    <div className="flex flex-col overflow-hidden">
      <header className="flex items-center gap-3">
        <ChartLineUp size={32} className="text-green-01" />
        <Title size="lg" className="text-gray-01">
          Início
        </Title>
      </header>

      <div className="mt-10 flex flex-col-reverse gap-10 overflow-y-auto xl:flex-row xl:justify-between xl:gap-16">
        <div className="flex flex-col gap-10 xl:max-w-[608px]">
          {lastFeedback && <LastRead feedback={lastFeedback} book={lastFeedback.book} />}
          <RecentFeedbacks />
        </div>

        <PopularBooks books={popularBooks} />
      </div>
    </div>
  );
}
