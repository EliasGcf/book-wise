import { w } from 'windstitch';

export const Title = w.h2('font-bold leading-[140%] text-gray-01', {
  variants: {
    size: {
      xs: 'text-base',
      sm: 'text-lg',
      md: 'text-xl',
      lg: 'text-2xl',
    },
  },

  defaultVariants: {
    size: 'md',
  },
});
