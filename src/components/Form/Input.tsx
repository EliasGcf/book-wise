import { MagnifyingGlass } from '@ui/icons';
import { forwardRef, InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...rest }, ref) => {
    return (
      <div
        className={twMerge(
          'flex min-h-[3rem] h-12 w-full items-center rounded border border-gray-05 bg-gray-08 px-5 focus-within:border-green-02 justify-between transition-colors gap-4',
          className,
        )}
      >
        <input
          {...rest}
          ref={ref}
          className="peer w-full bg-gray-08 text-base text-gray-02 outline-none placeholder:text-gray-04"
        />

        <MagnifyingGlass
          size={20}
          className="text-gray-05 transition-colors peer-focus:text-green-02"
        />
      </div>
    );
  },
);
