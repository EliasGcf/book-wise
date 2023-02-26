import Image from 'next/image';

import { SigninButton } from '@components/SigninButton';

import { styles } from '@shared/styles';

export default function Login() {
  return (
    <main className="flex h-screen p-5">
      <div className="mx-auto flex w-full max-w-[1440px]">
        <Image
          src="/login-image.png"
          alt=""
          width={598}
          height={912}
          quality={100}
          className="my-auto hidden max-h-[912px] lg:block"
        />

        <aside className="flex w-full items-center justify-center">
          <div className="w-full max-w-[372px]">
            <h1 className={styles.title({ size: 'lg' })}>Boas vindas!</h1>

            <span className={styles.text({ size: 'md' })}>
              Faça seu login ou acesse como visitante.
            </span>

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
