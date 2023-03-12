'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Binoculars } from '@ui/icons';
import { Title } from '@ui/Title';

import { Tags } from '@app/(authenticated)/search/Tags';

import { BookCard } from '@components/BookCard';
import { BookDetailDialog } from '@components/BookDetailDialog';
import { Input } from '@components/Form/Input';

export default function Search() {
  return (
    <div className="flex flex-col overflow-hidden">
      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Binoculars size={32} className="text-green-01" />
          <Title size="lg" className="text-gray-01">
            Explorar
          </Title>
        </div>

        <Input placeholder="Buscar livro ou autor" className="max-w-md" />
      </header>

      <div className="mt-5 flex flex-col gap-12 overflow-hidden">
        <Tags />

        <Dialog.Root>
          <div className="grid grid-cols-1 gap-5 overflow-y-auto lg:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 30 }).map((_, index) => (
              <BookCard.Compact
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                imageUrl="https://m.media-amazon.com/images/I/91BsZhxCRjL.jpg"
                title="A revolução dos bichos"
                author="George Orwell"
              />
            ))}
            <BookDetailDialog />
          </div>
        </Dialog.Root>
      </div>
    </div>
  );
}
