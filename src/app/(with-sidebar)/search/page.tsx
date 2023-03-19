import { Binoculars } from '@ui/icons';
import { Title } from '@ui/Title';
import { getServerSession } from 'next-auth';

import { BookList } from '@app/(with-sidebar)/search/BookList';
import { Tags } from '@app/(with-sidebar)/search/Tags';

import { Input } from '@components/Form/Input';

export default async function Search() {
  const session = await getServerSession();

  return (
    <div className="flex flex-col overflow-hidden">
      <header className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
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
        <BookList user={session?.user} />
      </div>
    </div>
  );
}
