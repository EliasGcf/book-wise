import { Binoculars, ChartLineUp, SignIn, SignOut, User } from '@ui/icons';
import { Link } from '@ui/Link';
import { Text } from '@ui/Text';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import NextLink from 'next/link';

import { Avatar } from '@components/Avatar';
import { NavLink } from '@components/NavLink';

import { asyncComponent } from '@utils/async-component';

async function BaseSidebar() {
  const session = await getServerSession();

  return (
    <aside className="m-5 flex w-fit flex-col rounded-xl bg-[url('/svg/sidebar-background.svg')] bg-cover p-10 pb-6">
      <header>
        <Image
          src="/svg/logo-with-name.svg"
          alt=""
          width={149}
          height={32}
          className="min-h-[32px] min-w-[149px]"
        />
      </header>

      <nav className="mt-16 flex flex-col gap-4">
        <NavLink href="/" icon={<ChartLineUp size={24} />} title="Início" />
        <NavLink href="/search" icon={<Binoculars size={24} />} title="Explorar" />
        {session && <NavLink href="/profile" icon={<User size={24} />} title="Perfil" />}
      </nav>

      <footer className="mt-auto flex items-center justify-center gap-3 whitespace-nowrap">
        {session && session.user ? (
          <>
            {session.user.image && <Avatar imageUrl={session.user.image} />}
            <Text size="sm" className="text-gray-02">
              {session.user.name}
            </Text>
            <NextLink href="/api/auth/signout" className="text-danger-light">
              <SignOut size={20} />
            </NextLink>
          </>
        ) : (
          <Link
            as={NextLink}
            href="/login"
            className="flex w-full items-center justify-center gap-3 text-gray-02 transition-opacity hover:opacity-70"
          >
            Fazer login
            <SignIn size={20} className="text-green-01" />
          </Link>
        )}
      </footer>
    </aside>
  );
}

export const Sidebar = asyncComponent(BaseSidebar);
