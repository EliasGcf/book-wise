import Link from 'next/link';
import { Suspense } from 'react';

import { BookList } from '@app/(with-sidebar)/search/BookList';
import { CategoryList } from '@app/(with-sidebar)/search/CategoryList';

import { Input } from '@components/Form/Input';
import { Loading } from '@components/Loading';

import { Binoculars } from '@ui/icons';
import { Text } from '@ui/Text';
import { Title } from '@ui/Title';

import { tw } from '@utils/tw';

type SearchProps = {
  searchParams: { category?: string; search?: string; book: string };
};

export default async function Search({ searchParams }: SearchProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <header className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <Binoculars size={32} className="text-green-01" />
          <Title size="lg" className="text-gray-01">
            Explorar
          </Title>
        </div>

        <div className="flex w-full flex-row items-baseline justify-end gap-6">
          {(searchParams.search || searchParams.category) && (
            <Text
              variant="link"
              size="sm"
              className="text-danger-light animate-in fade-in"
              as={Link}
              href="/search"
            >
              Limpar filtros
            </Text>
          )}

          <Input
            name="search"
            setInSearchParams
            defaultValue={searchParams.search}
            className="max-w-md"
            placeholder="Buscar livro ou autor"
          />
        </div>
      </header>

      <div className="mt-5 flex h-full flex-col gap-12 overflow-hidden">
        <Suspense fallback={<CategoryLoading />}>
          <CategoryList value={searchParams.category} />
        </Suspense>

        <Suspense fallback={<Loading />}>
          <BookList searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}

function CategoryLoading() {
  return (
    <div
      className={tw(
        'mr-3 mt-5 whitespace-nowrap rounded-full border border-purple-01 px-4 py-1 text-purple-01 outline-none transition-colors w-fit',
        'hover:border-purple-01 hover:bg-purple-02 hover:text-gray-01',
        'focus:bg-purple-02 focus:text-gray-01',
        'data-[state=on]:border-purple-02 data-[state=on]:bg-purple-02 data-[state=on]:text-gray-01',
        'data-[state=on]:hover:border-purple-01 data-[state=on]:focus:border-purple-01',
      )}
    >
      Carregando...
    </div>
  );
}
