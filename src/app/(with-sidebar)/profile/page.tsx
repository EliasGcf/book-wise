import { BookmarkSimple, BookOpen, Books, User, UserList } from '@ui/icons';
import { Text } from '@ui/Text';
import { Title } from '@ui/Title';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { UserBookList } from '@app/(with-sidebar)/profile/UserBookList';

import { Avatar } from '@components/Avatar';
import { Input } from '@components/Form/Input';

export default async function Search() {
  const session = await getServerSession();

  if (!session || !session.user) {
    return redirect('/login');
  }

  return (
    <div className="flex flex-col overflow-hidden">
      <header className="flex flex-col justify-between gap-4">
        <User size={32} className="text-green-01" />
        <Title size="lg" className="text-gray-01">
          Perfil
        </Title>
      </header>

      <div className="mt-10 flex flex-col-reverse overflow-y-auto xl:flex-row xl:justify-between">
        <div className="flex w-full flex-col xl:max-w-[624px]">
          <Input placeholder="Buscar livro avaliado" />

          <UserBookList />
        </div>

        <aside className="flex flex-col items-center border-l border-gray-07">
          <header className="flex flex-col items-center">
            <Avatar
              size="lg"
              imageUrl={session.user.image}
              name={session.user.name ?? '??'}
            />

            <Title size="md" as="h2" className="mt-5 text-gray-01">
              {session.user.name}
            </Title>

            <Text size="sm" className="text-gray-04">
              membro desde 2023
            </Text>
          </header>

          <div className="my-8 h-1 w-8 rounded-full bg-gradient-horizontal" />

          <div className="flex flex-col gap-10 py-5 px-14">
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
      </div>
    </div>
  );
}
