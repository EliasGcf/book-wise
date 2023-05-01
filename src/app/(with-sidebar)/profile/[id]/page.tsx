import { redirect } from 'next/navigation';

import { ProfileData } from '@app/(with-sidebar)/profile/[id]/ProfileData';
import { UserBookList } from '@app/(with-sidebar)/profile/[id]/UserBookList';

import { User } from '@ui/icons';
import { Title } from '@ui/Title';

import { getUserWithFeedbacks } from '@libs/prisma';

type ProfileProps = {
  params: {
    id: string;
  };
};

export default async function Profile({ params }: ProfileProps) {
  const userId = params.id;

  const user = await getUserWithFeedbacks(userId);

  if (!user) return redirect('/404');

  return (
    <div className="flex flex-col overflow-hidden">
      <header className="flex flex-col justify-between gap-4">
        <User size={32} className="text-green-01" />
        <Title size="lg" className="text-gray-01">
          Perfil
        </Title>
      </header>

      <div className="mt-10 flex flex-col-reverse overflow-y-auto xl:flex-row xl:justify-between">
        <UserBookList user={user} feedbacks={user.feedbacks} />
        <ProfileData feedbacks={user.feedbacks} user={user} />
      </div>
    </div>
  );
}
