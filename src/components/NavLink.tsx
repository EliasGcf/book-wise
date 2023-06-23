'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { wx } from 'windstitch';

import { Text } from '@ui/Text';

const navLink = wx({
  className: `flex w-fit cursor-pointer items-center gap-3 transition-colors hover:text-gray-01 relative h-10 w-full`,

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
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Text variant="link" href={href} as={Link} className={navLink({ active: isActive })}>
      {icon}
      {title}
    </Text>
  );
}
