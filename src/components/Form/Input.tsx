'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { forwardRef, InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

import { MagnifyingGlass } from '@ui/icons';

type InputProps =
  | (InputHTMLAttributes<HTMLInputElement> & { setInSearchParams?: false })
  | (InputHTMLAttributes<HTMLInputElement> & {
      setInSearchParams: true;
      name: string;
    });

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, setInSearchParams, ...rest }, ref) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      if (!setInSearchParams) return;

      const query = new URLSearchParams(searchParams.toString());

      if (event.target.value) {
        query.set(event.target.name, event.target.value);
      } else {
        query.delete(event.target.name);
      }

      router.push(`${pathname}?${query.toString()}`);

      if (rest.onChange) rest.onChange(event);
    }

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
          onChange={handleChange}
        />

        <MagnifyingGlass
          size={20}
          className="text-gray-05 transition-colors peer-focus:text-green-02"
        />
      </div>
    );
  },
);
