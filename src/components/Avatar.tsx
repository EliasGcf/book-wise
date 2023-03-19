'use client';

import * as PrimitiveAvatar from '@radix-ui/react-avatar';
import { twMerge } from 'tailwind-merge';
import { wx } from 'windstitch';

type AvatarProps = {
  imageUrl?: string | null;
  name: string;
  size?: 'sm' | 'lg';
};

const avatarContainer = wx({
  className: 'rounded-full bg-gradient-vertical p-px',

  variants: {
    size: {
      sm: 'h-10 w-10',
      lg: 'h-18 w-18',
    },
  },

  defaultVariants: {
    size: 'sm',
  },
});

export function Avatar({ imageUrl, name, size }: AvatarProps) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('');

  console.log(avatarContainer('lg'));

  return (
    <PrimitiveAvatar.Root className={twMerge(avatarContainer({ size }))}>
      {imageUrl && (
        <PrimitiveAvatar.Image
          alt={name}
          src={imageUrl}
          className="h-full w-full rounded-full"
        />
      )}

      <PrimitiveAvatar.Fallback
        delayMs={600}
        className="flex h-full w-full items-center justify-center font-bold uppercase text-gray-07"
      >
        {initials}
      </PrimitiveAvatar.Fallback>
    </PrimitiveAvatar.Root>
  );
}
