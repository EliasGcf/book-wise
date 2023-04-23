import { w } from 'windstitch';

export const Text = w.p('leading-[160%]', {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: '',
    },

    variant: {
      body: 'font-normal',
      link: 'font-bold',
    },
  },

  defaultVariants: {
    variant: 'body',
    size: 'md',
  },

  compoundVariants: [
    {
      variant: 'body',
      size: 'lg',
      class: 'text-xl',
    },
    {
      variant: 'link',
      size: 'lg',
      class: 'text-lg',
    },
  ],
});
