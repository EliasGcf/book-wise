/* eslint-disable no-use-before-define */

import { Book, Feedback, User } from '@prisma/client';

import { SearchContent } from '@app/(with-sidebar)/search/SearchContent';

import { getServerSession } from '@libs/next-auth';
import { prisma } from '@libs/prisma';

import { Replace } from '@shared/types/replace';

type FeedbackWithAuthor = Replace<Feedback, { created_at: string }> & {
  author: Replace<User, { createdAt?: Date }>;
};

export type BookWithFeedbacks = Book & {
  feedbacks: FeedbackWithAuthor[];
};

export default async function Search() {
  const [session, books, categories] = await Promise.all([
    getServerSession(),
    prisma.book.findMany({
      include: { feedbacks: { include: { author: true } } },
      orderBy: { feedbacks: { _count: 'desc' } },
    }),
    prisma.category.findMany(),
  ]);

  return (
    <SearchContent
      categories={categories}
      books={books.map((book) => ({
        ...book,
        feedbacks: book.feedbacks.map((feedback) => ({
          ...feedback,
          created_at: feedback.created_at.toISOString(),
          author: { ...feedback.author, createdAt: undefined },
        })),
      }))}
      user={session?.user}
    />
  );
}
