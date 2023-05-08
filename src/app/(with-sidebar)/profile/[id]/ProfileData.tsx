import { User } from 'next-auth';

import { Avatar } from '@components/Avatar';

import { BookmarkSimple, BookOpen, Books, UserList } from '@ui/icons';
import { Text } from '@ui/Text';
import { Title } from '@ui/Title';

import { dayjs } from '@libs/dayjs';
import { prisma } from '@libs/prisma';

import { asyncComponent } from '@utils/async-component';
import { getHighestOccurrenceAndNum } from '@utils/get-highest-occurrence-and-num';

interface ProfileDataProps {
  user: User;
}

async function AsyncProfileData({ user }: ProfileDataProps) {
  const feedbacks = await prisma.feedback.findMany({
    where: { author_id: user.id },
    include: { book: true },
  });

  const userMetrics = feedbacks.reduce(
    (acc, feedback) => {
      acc.pagesRead += feedback.book.pages_amount;
      acc.booksRead += 1;
      acc.authorsRead += 1;
      acc.categories.push(feedback.book.category_name);

      return acc;
    },
    {
      pagesRead: 0,
      booksRead: 0,
      authorsRead: 0,
      categories: [] as string[],
    },
  );

  const [mostReadCategory] = getHighestOccurrenceAndNum(userMetrics.categories);

  return (
    <aside className="mb-6 flex flex-col items-center border-b border-gray-07 xl:mb-0 xl:border-b-0 xl:border-l">
      <header className="flex flex-col items-center">
        <Avatar size="lg" imageUrl={user.image} name={user.name ?? '??'} />

        <Title size="md" as="h2" className="mt-5 text-gray-01">
          {user.name}
        </Title>

        <Text size="sm" className="text-gray-04">
          membro desde {dayjs(user.createdAt).get('year')}
        </Text>
      </header>

      <div className="my-8 h-1 w-8 rounded-full bg-gradient-horizontal" />

      <div className="grid grid-cols-1 gap-10 px-14 py-5 md:grid-cols-2 xl:grid-cols-1">
        <div className="flex items-center gap-5">
          <BookOpen size={32} className="text-green-01" />
          <div>
            <Title size="xs" as="span">
              {userMetrics.pagesRead}
            </Title>
            <Text size="sm" className="text-gray-03">
              Páginas lidas
            </Text>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <Books size={32} className="text-green-01" />
          <div>
            <Title size="xs" as="span">
              {userMetrics.booksRead}
            </Title>
            <Text size="sm" className="text-gray-03">
              Livros avaliados
            </Text>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <UserList size={32} className="text-green-01" />
          <div>
            <Title size="xs" as="span">
              {userMetrics.authorsRead}
            </Title>
            <Text size="sm" className="text-gray-03">
              Autores lidos
            </Text>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <BookmarkSimple size={32} className="text-green-01" />
          <div>
            <Title size="xs" as="span">
              {mostReadCategory}
            </Title>
            <Text size="sm" className="text-gray-03">
              Categoria mais lida
            </Text>
          </div>
        </div>
      </div>
    </aside>
  );
}

export const ProfileData = asyncComponent(AsyncProfileData);
