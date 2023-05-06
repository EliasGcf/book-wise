import {
  PrismaClient,
  Feedback as PrismaFeedback,
  User as PrismaUser,
  Book as PrismaBook,
  Category as PrismaCategory,
} from '@prisma/client';

import { Replace } from '@shared/types/replace';

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;

  // Add a delay to all requests to the database
  prisma.$use(async (params, next) => {
    // eslint-disable-next-line no-promise-executor-return
    // await new Promise((resolve) => setTimeout(resolve, 1500));

    return next(params);
  });
}

export type Feedback = Replace<PrismaFeedback, { created_at: string }>;
export type User = Replace<PrismaUser, { createdAt: string }>;
export type Book = PrismaBook;
export type Category = PrismaCategory;

function mapUser(user: PrismaUser) {
  return {
    ...user,
    createdAt: user.createdAt.toISOString(),
  };
}

function mapFeedback(feedback: PrismaFeedback) {
  return {
    ...feedback,
    created_at: feedback.created_at.toISOString(),
  };
}

export async function getUserWithFeedbacks(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      feedbacks: {
        include: {
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
      },
    },
  });

  if (!user) return null;

  return {
    ...mapUser(user),
    feedbacks: user.feedbacks.map((feedback) => ({
      ...mapFeedback(feedback),
      book: {
        ...feedback.book,
        feedbacks: feedback.book.feedbacks.map((f) => ({
          ...mapFeedback(f),
          author: mapUser(f.author),
        })),
      },
    })),
  };
}

export async function getUserLastFeedback(userId: string) {
  const feedback = await prisma.feedback.findFirst({
    where: { author_id: userId },
    include: {
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

  if (!feedback) return null;

  return {
    ...mapFeedback(feedback),
    book: {
      ...feedback.book,
      feedbacks: feedback.book.feedbacks.map((f) => ({
        ...mapFeedback(f),
        author: mapUser(f.author),
      })),
    },
  };
}

export async function getPopularBooks() {
  const books = await prisma.book.findMany({
    take: 4,
    orderBy: { feedbacks: { _count: 'desc' } },
    where: { feedbacks: { some: {} } },
    include: { feedbacks: { include: { author: true } } },
  });

  return books.map((book) => ({
    ...book,
    feedbacks: book.feedbacks.map((feedback) => ({
      ...mapFeedback(feedback),
      author: mapUser(feedback.author),
    })),
  }));
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

  return feedbacks.map((feedback) => ({
    ...mapFeedback(feedback),
    author: mapUser(feedback.author),
    book: {
      ...feedback.book,
      feedbacks: feedback.book.feedbacks.map((f) => ({
        ...mapFeedback(f),
        author: mapUser(f.author),
      })),
    },
  }));
}

export async function getBooks() {
  const books = await prisma.book.findMany({
    include: { feedbacks: { include: { author: true } } },
    orderBy: { feedbacks: { _count: 'desc' } },
  });

  return books.map((book) => ({
    ...book,
    feedbacks: book.feedbacks.map((feedback) => ({
      ...mapFeedback(feedback),
      author: mapUser(feedback.author),
    })),
  }));
}

export async function getCategories() {
  const categories = await prisma.category.findMany();

  return categories;
}
