'use client';

import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Category } from '@libs/prisma';

import { tw } from '@utils/tw';

type Props = {
  categories: Category[];
  value?: string;
};

export function CategoriesToggleGroup({ categories, value = '' }: Props) {
  const router = useRouter();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleSelectCategory(categoryName: string) {
    const query = new URLSearchParams(searchParams.toString());

    if (categoryName) {
      query.set('category', categoryName);
    } else {
      query.delete('category');
    }

    router.push(`${pathname}?${query.toString()}`);
  }

  return (
    <ToggleGroup.Root type="single" value={value} onValueChange={handleSelectCategory}>
      {categories.map((category) => (
        <ToggleGroup.Item
          key={category.id}
          className={tw(
            'mr-3 mt-5 whitespace-nowrap rounded-full border border-purple-01 px-4 py-1 text-purple-01 outline-none transition-colors',
            'hover:border-purple-01 hover:bg-purple-02 hover:text-gray-01',
            'focus:bg-purple-02 focus:text-gray-01',
            'data-[state=on]:border-purple-02 data-[state=on]:bg-purple-02 data-[state=on]:text-gray-01',
            'data-[state=on]:hover:border-purple-01 data-[state=on]:focus:border-purple-01',
          )}
          value={category.name}
        >
          {category.name}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
}
