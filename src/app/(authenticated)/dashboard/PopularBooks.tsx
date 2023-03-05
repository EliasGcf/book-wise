import { CaretRight } from '@ui/icons';
import { Link } from '@ui/Link';
import { Text } from '@ui/Text';

import { BookCard } from '@components/BookCard';

export function PopularBooks() {
  return (
    <aside className="max-w-[608px] xl:max-w-xs">
      <header className="mb-4 flex items-center justify-between">
        <Text size="sm" className="text-gray-01">
          Livros populares
        </Text>

        <Link
          size="sm"
          href="/"
          className="flex items-center gap-2 text-purple-01 transition-opacity hover:opacity-70"
        >
          Ver todos
          <CaretRight size={16} />
        </Link>
      </header>

      <ul className="flex flex-col gap-3">
        <li>
          <BookCard.Compact
            imageUrl="https://m.media-amazon.com/images/I/91BsZhxCRjL.jpg"
            title="A revolução dos bichos"
            author="George Orwell"
          />
        </li>
        <li>
          <BookCard.Compact
            title="14 Hábitos de Desenvolvedores Altamente produtivos"
            author="Zeno Rocha"
            imageUrl="https://m.media-amazon.com/images/I/41Xkqy2rMDL.jpg"
          />
        </li>
        <li>
          <BookCard.Compact
            title="O Fim da Eternidade"
            author="Isaac Asimov"
            imageUrl="https://m.media-amazon.com/images/I/71tgD4z8zAL.jpg"
          />
        </li>
        <li>
          <BookCard.Compact
            title="Entendendo Algoritmos"
            author="Aditya Bhargava"
            imageUrl="https://m.media-amazon.com/images/I/71Vkg7GfPFL.jpg"
          />
        </li>
      </ul>
    </aside>
  );
}
