import { cva } from 'class-variance-authority';

const title = cva('font-bold leading-[140%] text-gray-01', {
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
  } as const,
});

const text = cva('font-normal leading-[160%]', {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-xl',
    },
  },

  defaultVariants: {
    size: 'md',
  } as const,
});

const link = cva('font-bold leading-[160%]', {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },

  defaultVariants: {
    size: 'md',
  } as const,
});

export const styles = {
  title,
  link,
  text,
};
