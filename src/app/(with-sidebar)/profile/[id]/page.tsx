import { redirect } from 'next/navigation';

import { ProfileData } from '@app/(with-sidebar)/profile/[id]/ProfileData';
import { UserBookList } from '@app/(with-sidebar)/profile/[id]/UserBookList';

import { User } from '@ui/icons';
import { Title } from '@ui/Title';

import { getUser } from '@libs/prisma';

type ProfileProps = {
  params: {
    id: string;
  };
  searchParams: {
    search?: string;
  };
};

export default async function Profile({ params, searchParams }: ProfileProps) {
  const userId = params.id;
  const { search } = searchParams;

  const user = await getUser(userId);

  if (!user) return redirect('/404');

  return (
    <div className="flex flex-col overflow-hidden">
      <header className="flex w-fit justify-between gap-4">
        <User size={32} className="text-green-01" />
        <Title size="lg" className="text-gray-01">
          Perfil
        </Title>
      </header>

      <div className="mt-10 flex flex-col-reverse overflow-y-auto xl:flex-row xl:justify-between">
        <UserBookList userId={userId} search={search} />
        <ProfileData user={user} />
      </div>
    </div>
  );
}
