'use server';

import { getServerSession } from '@libs/next-auth';
import { prisma } from '@libs/prisma';

type Data = {
  rating: number;
  description: string;
  bookId: string;
};

export async function createFeedback({ bookId, description, rating }: Data) {
  const session = await getServerSession();

  if (!session) throw new Error('Unauthorized');

  const book = await prisma.book.findUnique({
    where: { id: bookId },
    include: { feedbacks: true },
  });

  if (!book) throw new Error('Book not found');

  await prisma.feedback.create({
    data: {
      description,
      rating,
      author_id: session.user.id,
      book_id: book.id,
    },
  });

  const totalRating = book.feedbacks.reduce((acc, feedback) => acc + feedback.rating, 0);

  const newRating = Math.trunc((totalRating + rating) / (book.feedbacks.length + 1));

  await prisma.book.update({
    where: { id: book.id },
    data: { rating: newRating },
  });
}
