import { BookCardFull } from '@components/BookCard';
import { BookDetailDialog } from '@components/BookDetailDialog';
import { CardHeader } from '@components/CardHeader';
import { Loading } from '@components/Loading';

import { getServerSession } from '@libs/next-auth';
import { getUserLastFeedback } from '@libs/prisma';

import { asyncComponent } from '@utils/async-component';

async function AsyncLastRead() {
  const session = await getServerSession();

  if (!session?.user) return null;

  const feedback = await getUserLastFeedback(session.user.id);

  if (!feedback) return null;

  return (
    <section className="flex flex-col gap-4">
      <CardHeader
        title="Sua última leitura"
        href={`/profile/${session.user.id}`}
        linkTitle="Ver todas as suas leituras"
      />

      <BookDetailDialog book={feedback.book} user={session.user}>
        <BookCardFull
          stars={feedback.rating}
          title={feedback.book.title}
          author={feedback.book.author}
          imageUrl={feedback.book.image_url}
          description={feedback.book.description}
        />
      </BookDetailDialog>
    </section>
  );
}

export function LastReadLoading() {
  return (
    <section className="flex flex-col gap-4">
      <CardHeader
        title="Sua última leitura"
        href="/profile"
        linkTitle="Ver todas as suas leituras"
      />

      <Loading />
    </section>
  );
}

export const LastRead = asyncComponent(AsyncLastRead);
