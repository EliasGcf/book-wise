import * as Dialog from '@radix-ui/react-dialog';

export function DialogOverlay() {
  return (
    <Dialog.Overlay className="fixed inset-0 bg-black/60 data-[state=open]:animate-in data-[state=open]:fade-in" />
  );
}
