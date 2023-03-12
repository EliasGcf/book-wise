import { Binoculars } from '@ui/icons';
import { Title } from '@ui/Title';

import { BookList } from '@app/(authenticated)/search/BookList';
import { Tags } from '@app/(authenticated)/search/Tags';

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
        <BookList />
      </div>
    </div>
  );
}
