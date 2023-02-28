import { Link } from '@ui/Link';
import styled from 'windstitch';

export const NavLink = styled(Link, {
  className: `flex w-fit cursor-pointer items-center gap-3 text-gray-04 transition-colors hover:text-gray-01 relative h-10`,

  variants: {
    active: {
      false: '',
      true: `text-gray-01 font-bold before:w-1 before:h-6 before:absolute before:rounded-full before:bg-gradient-vertical before:-left-4`,
    },
  },

  defaultVariants: {
    active: 'false',
  },
});
