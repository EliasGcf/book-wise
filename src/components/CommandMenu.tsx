'use client';

import { Command } from 'cmdk';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { BookCardCompact } from '@components/BookCard';
import { DialogOverlay } from '@components/DialogOverlay';
import { Input } from '@components/Form/Input';

import { Dialog } from '@ui/Dialog';

import { Book } from '@libs/prisma';

type CommandMenuProps = {
  books: Book[];
};

export function CommandMenu({ books }: CommandMenuProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const router = useRouter();

  const filteredBooks = books.filter((book) => {
    const titleMatch = book.title.toLowerCase().includes(search.toLowerCase());
    const authorMatch = book.author.toLowerCase().includes(search.toLowerCase());

    return titleMatch || authorMatch;
  });

  function handleSelectItem(bookSlug: string) {
    setOpen(false);
    setSearch('');
    router.push(`/search?book=${bookSlug}`);
  }

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener('keydown', down);

    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <DialogOverlay />

        <Dialog.Content className="dialog-center fixed w-full max-w-lg rounded bg-gray-07 p-4">
          <Command label="Global Command Menu" shouldFilter={false}>
            <Input
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por um livro ou author..."
              autoFocus
            />

            <Command.List className="mt-2 max-h-96 overflow-scroll">
              <Command.Empty className="mt-4 text-center">
                Nenhum resultado encontrado.
              </Command.Empty>

              {filteredBooks.map((book) => (
                <Command.Item
                  className="mt-2 cursor-pointer rounded-lg border-2 border-transparent data-[selected=true]:border-gray-06"
                  key={book.id}
                  value={book.slug}
                  onSelect={handleSelectItem}
                >
                  <Link href={`/search?book=${book.slug}`}>
                    <BookCardCompact book={book} withHoverStyle={false} />
                  </Link>
                </Command.Item>
              ))}
            </Command.List>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
