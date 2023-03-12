'use client';

import * as PrimitiveAvatar from '@radix-ui/react-avatar';

type AvatarProps = {
  imageUrl: string;
  name: string;
};

export function Avatar({ imageUrl, name }: AvatarProps) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('');

  return (
    <PrimitiveAvatar.Root className="h-10 w-10 rounded-full bg-gradient-vertical p-px">
      <PrimitiveAvatar.Image
        alt={name}
        src={imageUrl}
        className="h-full w-full rounded-full"
      />

      <PrimitiveAvatar.Fallback
        delayMs={600}
        className="flex h-full w-full items-center justify-center font-bold uppercase text-gray-07"
      >
        {initials}
      </PrimitiveAvatar.Fallback>
    </PrimitiveAvatar.Root>
  );
}
