/* eslint-disable no-use-before-define */
import { Text } from '@ui/Text';
import { Title } from '@ui/Title';

import { Avatar } from '@components/Avatar';
import { Stars } from '@components/Stars';

export function RecentFeedbacks() {
  return (
    <section className="flex flex-col overflow-hidden">
      <header className="mb-4 flex items-center justify-between">
        <Text size="sm" className="text-gray-01">
          Avaliações mais recentes
        </Text>
      </header>

      <ul className="flex flex-col gap-3 overflow-y-auto rounded-lg">
        <li>
          <FeedbackCard
            author={{
              name: 'Elias Gabriel',
              imageUrl: 'https://github.com/eliasgcf.png',
            }}
            book={{
              imageUrl: 'https://m.media-amazon.com/images/I/91M9xPIf10L.jpg',
              title: 'O Hobbit',
              author: 'J.R.R. Tolkien',
            }}
            createdAt={new Date()}
            feedback="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa laboriosam quo error consequatur voluptatem animi a nobis aperiam atque quos ut facilis quasi suscipit laudantium eligendi iure, repudiandae tempore! Fugit."
          />
        </li>
        <li>
          <FeedbackCard
            author={{
              name: 'Elias Gabriel',
              imageUrl: 'https://github.com/eliasgcf.png',
            }}
            book={{
              imageUrl: 'https://m.media-amazon.com/images/I/91M9xPIf10L.jpg',
              title: 'O Hobbit',
              author: 'J.R.R. Tolkien',
            }}
            createdAt={new Date()}
            feedback="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa laboriosam quo error consequatur voluptatem animi a nobis aperiam atque quos ut facilis quasi suscipit laudantium eligendi iure, repudiandae tempore! Fugit."
          />
        </li>
        <li>
          <FeedbackCard
            author={{
              name: 'Elias Gabriel',
              imageUrl: 'https://github.com/eliasgcf.png',
            }}
            book={{
              imageUrl: 'https://m.media-amazon.com/images/I/91M9xPIf10L.jpg',
              title: 'O Hobbit',
              author: 'J.R.R. Tolkien',
            }}
            createdAt={new Date()}
            feedback="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa laboriosam quo error consequatur voluptatem animi a nobis aperiam atque quos ut facilis quasi suscipit laudantium eligendi iure, repudiandae tempore! Fugit."
          />
        </li>
      </ul>
    </section>
  );
}

type FeedbackCardProps = {
  author: {
    name: string;
    imageUrl: string;
  };
  book: {
    title: string;
    imageUrl: string;
    author: string;
  };
  feedback: string;
  createdAt: Date;
};

function FeedbackCard({ author, book, feedback, createdAt }: FeedbackCardProps) {
  return (
    <div className="flex flex-col gap-8 rounded-lg bg-gray-07 p-6">
      <header className="flex justify-between">
        <div className="flex gap-4">
          <Avatar imageUrl={author.imageUrl} />
          <div>
            <Text size="md" className="text-gray-01">
              {author.name}
            </Text>
            <Text size="sm" className="text-gray-04">
              {createdAt.toLocaleDateString()}
            </Text>
          </div>
        </div>

        <Stars votes={4} />
      </header>

      <div className="flex gap-5">
        <img
          src={book.imageUrl}
          alt={book.title}
          className="max-h-[152px] min-w-[108px] rounded object-cover"
        />

        <div className="flex flex-col">
          <Title as="h3" size="xs" className="text-gray-01">
            {book.title}
          </Title>
          <Text size="sm" className="text-gray-04">
            {book.author}
          </Text>

          <Text size="sm" className="mt-auto text-gray-04 line-clamp-4">
            {feedback}
          </Text>
        </div>
      </div>
    </div>
  );
}
