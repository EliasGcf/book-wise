'use client';

import * as ToggleGroup from '@radix-ui/react-toggle-group';

import { Star } from '@ui/icons';

import { tw } from '@utils/tw';

type StarsProps = {
  votes: number;
  size?: number;
  className?: string;
  disabled?: boolean;
  isClickable?: boolean;
  onChange?: (value: number) => void;
};

export function Stars({
  votes,
  className,
  size = 16,
  disabled = true,
  isClickable = false,
  onChange,
}: StarsProps) {
  function handleItemClick(value: string) {
    if (onChange) {
      onChange(Number(value));
    }
  }

  return (
    <ToggleGroup.Root
      type="single"
      defaultValue={votes ? String(votes) : '0'}
      className={tw('flex gap-1 text-purple-01', className)}
      disabled={disabled}
      onValueChange={handleItemClick}
    >
      {[1, 2, 3, 4, 5].map((value) => (
        <ToggleGroup.Item
          value={String(value)}
          asChild={!isClickable}
          key={value}
          className={tw({ 'data-[disabled]:opacity-40': isClickable })}
        >
          <Star weight={votes >= value ? 'fill' : 'regular'} size={size} />
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
}
