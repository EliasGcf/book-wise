import Image from 'next/image';
import { redirect } from 'next/navigation';

import { SigninButton } from '@components/SigninButton';

import { Text } from '@ui/Text';
import { Title } from '@ui/Title';

import { getServerSession } from '@libs/next-auth';

export default async function Login() {
  const session = await getServerSession();

  if (session) {
    redirect('/');
  }

  return (
    <main className="flex h-screen p-5">
      <div className="mx-auto flex w-full max-w-[1440px]">
        <Image
          src="/login-image.png"
          alt=""
          width={598}
          height={912}
          quality={100}
          className="my-auto hidden h-full max-h-[912px] w-auto animate-in fade-in duration-500 lg:block"
        />

        <aside className="flex w-full items-center justify-center">
          <div className="w-full max-w-[372px] animate-in fade-in slide-in-from-right duration-500">
            <Title className="text-2xl" size="lg">
              Boas vindas!
            </Title>

            <Text as="span">Faça seu login ou acesse como visitante.</Text>

            <div className="mt-10 flex flex-col gap-4">
              <SigninButton provider="google" />
              <SigninButton provider="github" />
              <SigninButton provider="visitor" />
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
