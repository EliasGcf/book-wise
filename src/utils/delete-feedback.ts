'use server';

import { getServerSession } from '@libs/next-auth';
import { prisma } from '@libs/prisma';

export async function deleteFeedback(feedbackId: string) {
  const session = await getServerSession();

  if (!session) throw new Error('Unauthorized');

  const feedback = await prisma.feedback.findUnique({
    where: { id: feedbackId },
  });

  if (!feedback) {
    throw new Error('Feedback not found');
  }

  if (feedback.author_id !== session.user.id) {
    throw new Error('You are not authorized to delete this feedback');
  }

  await prisma.feedback.delete({
    where: { id: feedbackId },
  });

  // calculate book rating

  const book = await prisma.book.findUnique({
    where: { id: feedback.book_id },
    include: { feedbacks: true },
  });

  if (!book) {
    throw new Error('Book not found');
  }

  if (book.feedbacks.length === 0) {
    await prisma.book.update({
      where: { id: book.id },
      data: { rating: 0 },
    });

    return;
  }

  const totalRating = book.feedbacks.reduce((acc, f) => acc + f.rating, 0);

  const newRating = Math.trunc(totalRating / book.feedbacks.length);

  await prisma.book.update({
    where: { id: book.id },
    data: { rating: newRating },
  });
}
