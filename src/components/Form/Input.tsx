/* eslint-disable @typescript-eslint/no-non-null-assertion */

'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ComponentProps, forwardRef, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { MagnifyingGlass, X } from '@ui/icons';

type InputProps =
  | (ComponentProps<'input'> & { setInSearchParams?: false })
  | (ComponentProps<'input'> & { setInSearchParams: true; name: string });

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, setInSearchParams, ...rest }, ref) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [value, setValue] = useState(rest.value);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      setValue(event.target.value || undefined);

      if (rest.onChange) rest.onChange(event);

      if (!setInSearchParams || !rest.name) return;

      const query = new URLSearchParams(searchParams.toString());

      if (event.target.value) {
        query.set(rest.name, event.target.value);
      } else {
        query.delete(rest.name);
      }

      router.push(`${pathname}?${query.toString()}`);
    }

    function handleCleanValue() {
      setValue('');

      if (!setInSearchParams || !rest.name) return;

      const query = new URLSearchParams(searchParams.toString());

      if (query.get(rest.name)) {
        query.delete(rest.name);
        router.push(`${pathname}?${query.toString()}`);
      }
    }

    useEffect(() => {
      if (!setInSearchParams || !rest.name) return;

      const query = new URLSearchParams(searchParams.toString());

      setValue(query.get(rest.name) ?? '');
    }, [rest.name, searchParams, setInSearchParams]);

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
          value={value}
          className="peer w-full bg-gray-08 text-base text-gray-02 outline-none placeholder:text-gray-04"
          onChange={handleChange}
        />

        {value || rest.defaultValue ? (
          <button
            type="button"
            onClick={handleCleanValue}
            title="Limpar"
            className="animate-in zoom-in"
          >
            <X size={20} className="text-danger-light" />
          </button>
        ) : (
          <MagnifyingGlass
            size={20}
            className="text-gray-05 transition-colors animate-in zoom-in peer-focus:text-green-02"
          />
        )}
      </div>
    );
  },
);
