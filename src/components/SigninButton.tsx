'use client';

import { Link } from '@ui/Link';
import { exhaustive } from 'exhaustive';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type Provider = 'google' | 'github' | 'visitor';

type Props = {
  provider: Provider;
};

export function SigninButton({ provider }: Props) {
  const router = useRouter();

  const { text, iconUrl, onClick } = exhaustive(provider, {
    github: () => ({
      iconUrl: '/svg/github.svg',
      text: 'Entrar com GitHub',
      onClick: () => signIn('github'),
    }),
    google: () => ({
      iconUrl: '/svg/google.svg',
      text: 'Entrar com Google',
      onClick: false as const,
    }),
    visitor: () => ({
      iconUrl: '/svg/logo.svg',
      text: 'Acessar como visitante',
      onClick: () => router.push('/'),
    }),
  });

  return (
    <button
      type="button"
      disabled={onClick === false}
      className="flex w-full items-center gap-5 rounded-lg bg-gray-06 py-5 px-6 transition-colors enabled:hover:bg-gray-05 disabled:cursor-not-allowed disabled:opacity-50"
      onClick={onClick === false ? undefined : onClick}
    >
      <Image src={iconUrl} alt="" width={32} height={32} />
      <Link size="lg" as="span">
        {text}
      </Link>
    </button>
  );
}
