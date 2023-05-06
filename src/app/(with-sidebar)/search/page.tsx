import { Suspense } from 'react';

import { BookList } from '@app/(with-sidebar)/search/BookList';
import { Tags } from '@app/(with-sidebar)/search/Tags';

import { Input } from '@components/Form/Input';
import { Loading } from '@components/Loading';

import { Binoculars } from '@ui/icons';
import { Title } from '@ui/Title';

import { getServerSession } from '@libs/next-auth';
import { getCategories } from '@libs/prisma';

type SearchProps = {
  searchParams: { category?: string; search?: string };
};

export default async function Search({ searchParams }: SearchProps) {
  const [session, categories] = await Promise.all([getServerSession(), getCategories()]);

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
        <Tags categories={categories} />

        <Suspense fallback={<Loading />}>
          <BookList user={session?.user} searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
