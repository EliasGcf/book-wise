/* eslint-disable no-use-before-define */
import { User } from '@ui/icons';
import { Title } from '@ui/Title';
import { redirect } from 'next/navigation';

import { ProfileData } from '@app/(with-sidebar)/profile/ProfileData';
import { UserBookList } from '@app/(with-sidebar)/profile/UserBookList';

import { getServerSession } from '@libs/next-auth';
import { prisma } from '@libs/prisma';

export default async function Search() {
  const session = await getServerSession();

  if (!session || !session.user) {
    return redirect('/login');
  }

  const feedbacks = await prisma.feedback.findMany({
    where: { author_id: session.user.id },
    include: { book: true },
  });

  return (
    <div className="flex flex-col overflow-hidden">
      <header className="flex flex-col justify-between gap-4">
        <User size={32} className="text-green-01" />
        <Title size="lg" className="text-gray-01">
          Perfil
        </Title>
      </header>

      <div className="mt-10 flex flex-col-reverse overflow-y-auto xl:flex-row xl:justify-between">
        <UserBookList
          feedbacks={feedbacks.map((feedback) => ({
            ...feedback,
            created_at: feedback.created_at.toISOString(),
          }))}
        />
        <ProfileData
          feedbacks={feedbacks.map((feedback) => ({
            ...feedback,
            created_at: feedback.created_at.toISOString(),
          }))}
          session={session}
        />
      </div>
    </div>
  );
}
