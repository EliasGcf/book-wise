import { CaretRight } from '@ui/icons';
import { Link } from '@ui/Link';
import { Text } from '@ui/Text';

import { BookCard } from '@components/BookCard';

export function LastRead() {
  return (
    <section>
      <header className="mb-4 flex items-center justify-between">
        <Text size="sm" className="text-gray-01">
          Sua última leitura
        </Text>

        <Link
          size="sm"
          href="/"
          className="flex items-center gap-2 text-purple-01 transition-opacity hover:opacity-70"
        >
          Ver todas
          <CaretRight size={16} />
        </Link>
      </header>

      <BookCard.Full
        stars={3}
        title="Entendendo Algoritmos"
        author="Aditya Bhargava"
        imageUrl="https://m.media-amazon.com/images/I/71Vkg7GfPFL.jpg"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, sequi nisi iste libero consectetur eum unde, ipsum, nihil totam labore praesentium distinctio maiores numquam? Distinctio explicabo incidunt totam perspiciatis facilis."
      />
    </section>
  );
}
