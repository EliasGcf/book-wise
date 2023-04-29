import { ChartLineUp } from '@ui/icons';
import { Title } from '@ui/Title';

import { LastRead } from '@app/(with-sidebar)/(home)/LastRead';
import { PopularBooks } from '@app/(with-sidebar)/(home)/PopularBooks';
import { RecentFeedbacks } from '@app/(with-sidebar)/(home)/RecentFeedbacks';

import { getServerSession } from '@libs/next-auth';
import { prisma } from '@libs/prisma';

export default async function Dashboard() {
  const [session, popularBooks] = await Promise.all([
    getServerSession(),
    prisma.book.findMany({
      take: 4,
      orderBy: { feedbacks: { _count: 'desc' } },
      where: { feedbacks: { some: {} } },
      include: { feedbacks: { include: { author: true } } },
    }),
  ]);

  const lastFeedback = session
    ? await prisma.feedback.findFirst({
        where: { author_id: session.user.id },
        include: {
          book: {
            include: {
              feedbacks: {
                include: { author: true },
              },
            },
          },
        },
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
        <div className="flex w-full flex-col gap-10 xl:max-w-[608px]">
          {lastFeedback && (
            <LastRead
              user={session?.user}
              feedback={{
                author_id: lastFeedback.author_id,
                book_id: lastFeedback.book_id,
                rating: lastFeedback.rating,
                created_at: lastFeedback.created_at.toISOString(),
                description: lastFeedback.description,
                id: lastFeedback.id,
              }}
              book={{
                ...lastFeedback.book,
                feedbacks: lastFeedback.book.feedbacks.map((f) => ({
                  ...f,
                  created_at: f.created_at.toISOString(),
                  author: { ...f.author, createdAt: undefined },
                })),
              }}
            />
          )}
          <RecentFeedbacks />
        </div>

        <PopularBooks
          user={session?.user}
          books={popularBooks.map((book) => ({
            ...book,
            feedbacks: book.feedbacks.map((feedback) => ({
              ...feedback,
              created_at: feedback.created_at.toISOString(),
              author: { ...feedback.author, createdAt: undefined },
            })),
          }))}
        />
      </div>
    </div>
  );
}
