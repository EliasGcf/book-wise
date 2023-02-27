import { exhaustive } from 'exhaustive';
import Image from 'next/image';

type Provider = 'google' | 'github' | 'visitor';

type Props = {
  provider: Provider;
};

export function SigninButton({ provider }: Props) {
  const { text, iconUrl } = exhaustive(provider, {
    github: () => ({ iconUrl: '/svg/github.svg', text: 'Entrar com GitHub' }),
    google: () => ({ iconUrl: '/svg/google.svg', text: 'Entrar com Google' }),
    visitor: () => ({ iconUrl: '/svg/logo.svg', text: 'Acessar como visitante' }),
  });

  return (
    <button
      type="button"
      className="flex w-full items-center gap-5 rounded-lg bg-gray-06 py-5 px-6 text-lg font-bold leading-[160%] transition-colors hover:bg-gray-05"
    >
      <Image src={iconUrl} alt="" width={32} height={32} />
      {text}
    </button>
  );
}
