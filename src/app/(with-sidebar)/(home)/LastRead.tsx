import Link from 'next/link';

import { BookCardFull } from '@components/BookCard';
import { BookDetailDialog } from '@components/BookDetailDialog';
import { Loading } from '@components/Loading';

import { CaretRight } from '@ui/icons';
import { Text } from '@ui/Text';

import { getServerSession } from '@libs/next-auth';
import { getUserLastFeedback } from '@libs/prisma';

import { asyncComponent } from '@utils/async-component';

async function AsyncLastRead() {
  const session = await getServerSession();

  if (!session?.user) return null;

  const feedback = await getUserLastFeedback(session.user.id);

  if (!feedback) return null;

  return (
    <section>
      <header className="mb-4 flex items-center justify-between">
        <Text size="sm" className="text-gray-01">
          Sua última leitura
        </Text>

        <Text
          variant="link"
          as={Link}
          size="sm"
          href="/profile"
          className="flex items-center gap-2 text-purple-01 transition-opacity hover:opacity-70"
          title="Ver todas as suas leituras"
        >
          Ver todas
          <CaretRight size={16} />
        </Text>
      </header>

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
    <section>
      <header className="mb-4 flex items-center justify-between">
        <Text size="sm" className="text-gray-01">
          Sua última leitura
        </Text>

        <Text
          variant="link"
          as={Link}
          size="sm"
          href="/profile"
          className="flex items-center gap-2 text-purple-01 transition-opacity hover:opacity-70"
          title="Ver todas as suas leituras"
        >
          Ver todas
          <CaretRight size={16} />
        </Text>
      </header>

      <Loading />
    </section>
  );
}

export const LastRead = asyncComponent(AsyncLastRead);
