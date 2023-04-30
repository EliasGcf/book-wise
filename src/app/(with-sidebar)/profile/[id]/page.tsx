import { redirect } from 'next/navigation';

import { ProfileData } from '@app/(with-sidebar)/profile/[id]/ProfileData';
import { UserBookList } from '@app/(with-sidebar)/profile/[id]/UserBookList';

import { User as UserIcon } from '@ui/icons';
import { Title } from '@ui/Title';

import { prisma } from '@libs/prisma';

type ProfileProps = {
  params: {
    id: string;
  };
};

export default async function Profile({ params }: ProfileProps) {
  const userId = params.id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) return redirect('/404');

  const feedbacks = await prisma.feedback.findMany({
    where: { author_id: user.id },
    include: { book: { include: { feedbacks: { include: { author: true } } } } },
  });

  return (
    <div className="flex flex-col overflow-hidden">
      <header className="flex flex-col justify-between gap-4">
        <UserIcon size={32} className="text-green-01" />
        <Title size="lg" className="text-gray-01">
          Perfil
        </Title>
      </header>

      <div className="mt-10 flex flex-col-reverse overflow-y-auto xl:flex-row xl:justify-between">
        <UserBookList
          user={{ ...user, createdAt: user.createdAt.toISOString() }}
          feedbacks={feedbacks.map((feedback) => ({
            ...feedback,
            created_at: feedback.created_at.toISOString(),
            book: {
              ...feedback.book,
              feedbacks: feedback.book.feedbacks.map((f) => ({
                ...f,
                created_at: f.created_at.toISOString(),
                author: {
                  ...f.author,
                  createdAt: undefined,
                },
              })),
            },
          }))}
        />
        <ProfileData
          feedbacks={feedbacks.map((feedback) => ({
            ...feedback,
            created_at: feedback.created_at.toISOString(),
          }))}
          user={{ ...user, createdAt: user.createdAt.toISOString() }}
        />
      </div>
    </div>
  );
}
