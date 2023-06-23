import {
  PrismaClient,
  Feedback as PrismaFeedback,
  User as PrismaUser,
  Book as PrismaBook,
  Category as PrismaCategory,
} from '@prisma/client';

import { Replace } from '@shared/types/replace';

export type AppPrismaClient = ReturnType<typeof generatePrismaClient>;

// eslint-disable-next-line import/no-mutable-exports
export let prisma: AppPrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = generatePrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = generatePrismaClient();
  }

  prisma = global.prisma;
}

export type Feedback = Replace<PrismaFeedback, { created_at: string }>;
export type User = Replace<PrismaUser, { createdAt: string }>;
export type Book = PrismaBook;
export type Category = PrismaCategory;

export async function getUser(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) return null;

  return user;
}

export async function getUserLastFeedback(userId: string) {
  const feedback = await prisma.feedback.findFirst({
    where: { author_id: userId },
    include: { book: true },
  });

  return feedback;
}

export async function getPopularBooks() {
  const books = await prisma.book.findMany({
    take: 4,
    orderBy: { feedbacks: { _count: 'desc' } },
    where: { feedbacks: { some: {} } },
  });

  return books;
}

export async function getFeedbacks() {
  const feedbacks = await prisma.feedback.findMany({
    orderBy: { created_at: 'desc' },
    include: {
      author: true,
      book: {
        include: {
          feedbacks: {
            include: {
              author: true,
            },
          },
        },
      },
    },
  });

  return feedbacks;
}

export async function getBooks() {
  const books = await prisma.book.findMany({
    include: { feedbacks: { include: { author: true } } },
    orderBy: { feedbacks: { _count: 'desc' } },
  });

  return books;
}

export async function getCategories() {
  const categories = await prisma.category.findMany();

  return categories;
}

function generatePrismaClient() {
  return new PrismaClient().$extends({
    result: {
      user: {
        createdAt: {
          needs: { createdAt: true },
          compute: (data) => data.createdAt.toISOString(),
        },
      },
      feedback: {
        created_at: {
          needs: { created_at: true },
          compute: (data) => data.created_at.toISOString(),
        },
      },
    },
  });
}
