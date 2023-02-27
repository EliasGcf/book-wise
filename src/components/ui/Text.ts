import { w } from 'windstitch';

export const Text = w.p('font-normal leading-[160%]', {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-xl',
    },
  },

  defaultVariants: {
    size: 'md',
  },
});
