'use client';

import { CircleNotch, IconProps } from '@phosphor-icons/react';

import { tw } from '@utils/tw';

export function LoadingIcon({ className, ...rest }: IconProps) {
  return (
    <CircleNotch
      size={32}
      weight="bold"
      className={tw('animate-spin text-purple-01', className)}
      {...rest}
    />
  );
}

export * from '@phosphor-icons/react';
