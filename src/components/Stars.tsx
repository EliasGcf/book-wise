import { Star } from '@ui/icons';
import { twMerge } from 'tailwind-merge';

type StarsProps = {
  votes: number;
  className?: string;
};

export function Stars({ votes, className }: StarsProps) {
  return (
    <div className={twMerge('flex gap-1 text-purple-01', className)}>
      <Star weight={votes >= 1 ? 'fill' : 'regular'} size={16} />
      <Star weight={votes >= 2 ? 'fill' : 'regular'} size={16} />
      <Star weight={votes >= 3 ? 'fill' : 'regular'} size={16} />
      <Star weight={votes >= 4 ? 'fill' : 'regular'} size={16} />
      <Star weight={votes >= 5 ? 'fill' : 'regular'} size={16} />
    </div>
  );
}
