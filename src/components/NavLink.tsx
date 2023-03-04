'use client';

import { Link } from '@ui/Link';
import NextLink from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { wx } from 'windstitch';

const navLink = wx({
  className: `flex w-fit cursor-pointer items-center gap-3 transition-colors hover:text-gray-01 relative h-10`,

  variants: {
    active: (yes: boolean) =>
      yes
        ? 'text-gray-01 font-bold before:w-1 before:h-6 before:absolute before:rounded-full before:bg-gradient-vertical before:-left-4'
        : 'font-normal text-gray-04',
  },

  defaultVariants: {
    active: false,
  },
});

type NavLinkProps = {
  href: string;
  icon: React.ReactNode;
  title: string;
};

export function NavLink({ href, icon, title }: NavLinkProps) {
  const activeSegment = useSelectedLayoutSegment();

  const segment = href.split('/')[1] || null;

  return (
    <Link
      href={href}
      as={NextLink}
      className={navLink({ active: segment === activeSegment })}
    >
      {icon}
      {title}
    </Link>
  );
}
