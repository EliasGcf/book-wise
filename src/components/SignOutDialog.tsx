'use client';

import { signOut } from 'next-auth/react';
import { useState } from 'react';

import { DialogOverlay } from '@components/DialogOverlay';

import { Dialog } from '@ui/Dialog';
import { Check, SignOut, X } from '@ui/icons';
import { Text } from '@ui/Text';
import { Title } from '@ui/Title';

export function SignOutDialog() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignOut() {
    setIsLoading(true);
    await signOut();
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <SignOut size={20} className="text-danger-light" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <DialogOverlay />

        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-gray-07 px-18 py-14">
          <Dialog.Close
            className="absolute right-4 top-4 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isLoading}
          >
            <X size={24} className="text-gray-04" weight="bold" />
          </Dialog.Close>

          <Dialog.Title asChild>
            <Title as="h3" size="xs" className="text-center text-gray-02">
              Deseja realmente sair?
            </Title>
          </Dialog.Title>

          <div className="mt-10 flex min-w-[372px] gap-4">
            <Dialog.Close
              disabled={isLoading}
              className="flex w-full items-center gap-5 rounded-lg bg-danger-light px-6 py-5 text-gray-06 transition-opacity enabled:hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <X size={32} />
              <Text variant="link" size="lg" as="span">
                Não
              </Text>
            </Dialog.Close>

            <button
              disabled={isLoading}
              type="button"
              className="flex w-full items-center gap-5 rounded-lg bg-gray-06 px-6 py-5 transition-colors enabled:hover:bg-gray-05 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={handleSignOut}
            >
              <Check size={32} weight="bold" />
              <Text variant="link" size="lg" as="span">
                Sim
              </Text>
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
