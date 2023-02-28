import { Link } from '@ui/Link';
import { LineChart, LogIn } from 'lucide-react';
import Image from 'next/image';
import NextLink from 'next/link';

export function Sidebar() {
  return (
    <aside className="m-5 flex w-fit flex-col rounded-xl bg-[url('/svg/sidebar-background.svg')] p-10 pb-6">
      <header>
        <Image src="/svg/logo-with-name.svg" alt="" width={149} height={32} />
      </header>

      <nav className="mt-16">
        <Link
          href="/"
          as={NextLink}
          className="flex w-fit cursor-pointer items-center gap-3 text-gray-04 transition-colors hover:text-gray-01"
        >
          <LineChart size={18} />
          Início
        </Link>
      </nav>

      <footer className="mt-auto">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-3 transition-opacity hover:opacity-70"
        >
          <Link as="span" className="text-gray-02">
            Fazer login
          </Link>
          <LogIn size={20} className="text-green-01" />
        </button>
      </footer>
    </aside>
  );
}
