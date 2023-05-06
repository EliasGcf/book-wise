import { CircleNotch } from '@ui/icons';

export function Loading() {
  return (
    <div className="flex h-full items-center justify-center">
      <CircleNotch size={32} weight="bold" className="animate-spin text-purple-01" />
    </div>
  );
}
