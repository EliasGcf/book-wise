import { BookmarkSimple, BookOpen, Books, UserList } from '@ui/icons';
import { Text } from '@ui/Text';
import { Title } from '@ui/Title';
import { Session } from 'next-auth';

import { Avatar } from '@components/Avatar';

interface ProfileDataProps {
  session: Session;
}

export function ProfileData({ session }: ProfileDataProps) {
  return (
    <aside className="mb-6 flex flex-col items-center border-b border-gray-07 xl:mb-0 xl:border-l xl:border-b-0">
      <header className="flex flex-col items-center">
        <Avatar
          size="lg"
          imageUrl={session.user?.image}
          name={session.user?.name ?? '??'}
        />

        <Title size="md" as="h2" className="mt-5 text-gray-01">
          {session.user?.name}
        </Title>

        <Text size="sm" className="text-gray-04">
          membro desde 2023
        </Text>
      </header>

      <div className="my-8 h-1 w-8 rounded-full bg-gradient-horizontal" />

      <div className="grid grid-cols-1 gap-10 py-5 px-14 md:grid-cols-2 xl:grid-cols-1">
        <div className="flex items-center gap-5">
          <BookOpen size={32} className="text-green-01" />
          <div>
            <Title size="xs" as="span">
              3853
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
              10
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
              8
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
              Computação
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
