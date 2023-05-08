'use client';

import { forwardRef } from 'react';

import { Dialog } from '@ui/Dialog';

export const DialogOverlay = forwardRef<HTMLDivElement, Dialog.DialogOverlayProps>(() => {
  return (
    <Dialog.Overlay className="fixed inset-0 bg-black/60 data-[state=open]:animate-in data-[state=open]:fade-in" />
  );
});
