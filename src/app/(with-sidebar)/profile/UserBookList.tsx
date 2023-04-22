'use client';

import { Book, Feedback } from '@prisma/client';
import { Text } from '@ui/Text';
import { Title } from '@ui/Title';
import { useState } from 'react';

import { Input } from '@components/Form/Input';
import { Stars } from '@components/Stars';

import { dayjs } from '@libs/dayjs';

import { Replace } from '@shared/types/replace';

type FeedbackWithBook = Feedback & {
  created_at: string;
  book: Book;
};

type UserBookListProps = {
  feedbacks: Array<Replace<FeedbackWithBook, { created_at: string }>>;
};

export function UserBookList({ feedbacks }: UserBookListProps) {
  const [search, setSearch] = useState('');

  const filteredFeedbacks = feedbacks.filter((feedback) => {
    return (
      feedback.book.title.toLowerCase().includes(search.toLowerCase()) ||
      feedback.book.author.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="flex w-full flex-col xl:max-w-[624px]">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value.trim())}
        placeholder="Buscar livro avaliado"
      />

      <section className="mt-8 flex flex-col gap-6 overflow-y-auto">
        {filteredFeedbacks.map((feedback) => (
          <div key={feedback.id}>
            <Text size="sm" className="mb-2 text-gray-03 first-letter:capitalize">
              {dayjs(feedback.created_at).fromNow()}
            </Text>

            <div className="rounded-lg bg-gray-07 p-6">
              <div className="flex gap-6">
                <img
                  src={feedback.book.image_url}
                  alt=""
                  className="max-h-[134px] min-w-[98px] rounded object-cover"
                />

                <div className="flex flex-col justify-between">
                  <div>
                    <Title size="sm" as="h3" className="text-gray-01">
                      {feedback.book.title}
                    </Title>
                    <Text size="sm" className="text-gray-04">
                      {feedback.book.author}
                    </Text>
                  </div>

                  <Stars votes={feedback.rating} size={16} />
                </div>
              </div>

              <Text size="sm" className="mt-6 text-gray-03" as="p">
                {feedback.description}
              </Text>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
