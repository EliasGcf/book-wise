import { Suspense } from 'react';

import { BookList } from '@app/(with-sidebar)/search/BookList';
import { CategoryList } from '@app/(with-sidebar)/search/CategoryList';

import { Input } from '@components/Form/Input';
import { Loading } from '@components/Loading';

import { Binoculars } from '@ui/icons';
import { Title } from '@ui/Title';

import { getServerSession } from '@libs/next-auth';

import { tw } from '@utils/tw';

type SearchProps = {
  searchParams: { category?: string; search?: string };
};

export default async function Search({ searchParams }: SearchProps) {
  const session = await getServerSession();

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <header className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <Binoculars size={32} className="text-green-01" />
          <Title size="lg" className="text-gray-01">
            Explorar
          </Title>
        </div>

        <Input
          name="search"
          setInSearchParams
          className="max-w-md"
          placeholder="Buscar livro ou autor"
        />
      </header>

      <div className="mt-5 flex h-full flex-col gap-12 overflow-hidden">
        <Suspense fallback={<CategoryLoading />}>
          <CategoryList value={searchParams.category} />
        </Suspense>

        <Suspense fallback={<Loading />}>
          <BookList user={session?.user} searchParams={searchParams} />
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
