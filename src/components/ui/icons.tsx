'use client';

import { CircleNotch, IconProps } from '@phosphor-icons/react';

export function LoadingIcon(props: IconProps) {
  return (
    <CircleNotch
      size={32}
      weight="bold"
      {...props}
      className="animate-spin text-purple-01"
    />
  );
}

export * from '@phosphor-icons/react';
