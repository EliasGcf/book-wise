/* eslint-disable no-use-before-define */
import { Text } from '@ui/Text';

import { FeedbackCard } from '@components/FeedbackCard';

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
