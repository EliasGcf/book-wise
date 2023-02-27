import { w } from 'windstitch';

export const Link = w.a('font-bold leading-[160%]', {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },

  defaultVariants: {
    size: 'md',
  },
});
