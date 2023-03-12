import { Star } from '@ui/icons';
import { twMerge } from 'tailwind-merge';

type StarsProps = {
  votes: number;
  size?: number;
  className?: string;
};

export function Stars({ votes, className, size = 16 }: StarsProps) {
  return (
    <div className={twMerge('flex gap-1 text-purple-01', className)}>
      <Star weight={votes >= 1 ? 'fill' : 'regular'} size={size} />
      <Star weight={votes >= 2 ? 'fill' : 'regular'} size={size} />
      <Star weight={votes >= 3 ? 'fill' : 'regular'} size={size} />
      <Star weight={votes >= 4 ? 'fill' : 'regular'} size={size} />
      <Star weight={votes >= 5 ? 'fill' : 'regular'} size={size} />
    </div>
  );
}
