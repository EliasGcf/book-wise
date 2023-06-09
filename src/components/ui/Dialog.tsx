'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export * as Dialog from '@radix-ui/react-dialog';
export * from '@radix-ui/react-dialog';

export function DialogRoot({ defaultOpen, ...rest }: Dialog.DialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  function handleOpenChange(isOpen: boolean) {
    setInternalOpen(isOpen);

    const query = new URLSearchParams(searchParams.toString());

    if (query.get('book')) {
      query.delete('book');
      router.push(`${pathname}?${query.toString()}`);
    }

    if (rest.onOpenChange) rest.onOpenChange(isOpen);
  }

  useEffect(() => {
    if (defaultOpen !== undefined) {
      setInternalOpen(defaultOpen);
    }
  }, [defaultOpen]);

  return <Dialog.Root open={internalOpen} {...rest} onOpenChange={handleOpenChange} />;
}
