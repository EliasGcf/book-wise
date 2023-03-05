import { Link } from '@ui/Link';
import { Text } from '@ui/Text';
import { LineChart, LogIn, Search, User, LogOut } from 'lucide-react';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import NextLink from 'next/link';

import { NavLink } from '@components/NavLink';

import { asyncComponent } from '@utils/async-component';

async function BaseSidebar() {
  const session = await getServerSession();

  return (
    <aside className="m-5 flex w-fit flex-col rounded-xl bg-[url('/svg/sidebar-background.svg')] p-10 pb-6">
      <header>
        <Image src="/svg/logo-with-name.svg" alt="" width={149} height={32} />
      </header>

      <nav className="mt-16 flex flex-col gap-4">
        <NavLink href="/" icon={<LineChart size={18} />} title="Início" />
        <NavLink href="/search" icon={<Search size={18} />} title="Explorar" />
        <NavLink href="/profile" icon={<User size={18} />} title="Perfil" />
      </nav>

      <footer className="mt-auto flex items-center gap-3">
        {session && session.user ? (
          <>
            {session.user.image && (
              <Image
                src={session.user.image}
                width={32}
                height={32}
                alt={session.user.name ?? ''}
                className="rounded-full"
              />
            )}
            <Text size="sm" className="text-gray-02">
              {session.user.name}
            </Text>
            <NextLink href="/api/auth/signout" className="text-danger-light">
              <LogOut size={20} />
            </NextLink>
          </>
        ) : (
          <Link
            as={NextLink}
            href="/login"
            className="flex w-full items-center justify-center gap-3 text-gray-02 transition-opacity hover:opacity-70"
          >
            Fazer login
            <LogIn size={20} className="text-green-01" />
          </Link>
        )}
      </footer>
    </aside>
  );
}

export const Sidebar = asyncComponent(BaseSidebar);
