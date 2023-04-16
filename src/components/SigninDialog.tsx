import * as Dialog from '@radix-ui/react-dialog';
import { X } from '@ui/icons';
import { Title } from '@ui/Title';

import { DialogOverlay } from '@components/DialogOverlay';
import { SigninButton } from '@components/SigninButton';

export function SigninDialog() {
  return (
    <Dialog.Portal>
      <DialogOverlay />

      <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-gray-07 px-18 py-14">
        <Dialog.Close className="absolute right-4 top-4">
          <X size={24} className="text-gray-04" weight="bold" />
        </Dialog.Close>

        <Dialog.Title asChild>
          <Title as="h3" size="xs" className="text-center text-gray-02">
            Faça login para deixar sua avaliação
          </Title>
        </Dialog.Title>

        <div className="mt-10 flex min-w-[372px] flex-col gap-4">
          <SigninButton provider="google" />
          <SigninButton provider="github" />
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
