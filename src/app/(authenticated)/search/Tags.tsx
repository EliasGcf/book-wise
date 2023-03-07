'use client';

import * as ToggleGroup from '@radix-ui/react-toggle-group';

const TAGS = [
  {
    title: 'Tudo',
    value: 'all',
  },
  {
    title: 'Computação',
    value: 'tech',
  },
  {
    title: 'Educação',
    value: 'education',
  },

  {
    title: 'Fantasia',
    value: 'fantasy',
  },
  {
    title: 'Ficção científica',
    value: 'science-fiction',
  },
  {
    title: 'Horror',
    value: 'horror',
  },
  {
    title: 'HQs',
    value: 'comics',
  },
  {
    title: 'Suspense',
    value: 'thriller',
  },
];

export function Tags() {
  return (
    <ToggleGroup.Root type="single" className="flex gap-3">
      {TAGS.map((tag) => (
        <ToggleGroup.Item
          key={tag.value}
          className="whitespace-nowrap rounded-full border border-purple-01 px-4 py-1 text-purple-01 transition-colors hover:border-purple-01 hover:bg-purple-02 hover:text-gray-01 data-[state=on]:border-purple-02 data-[state=on]:bg-purple-02 data-[state=on]:text-gray-01"
          value={tag.value}
        >
          {tag.title}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
}
