import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// prisma.$use(async (params, next) => {
//   // Manipulate params here
//   const result = await next(params);

//   if (params.model === 'Book') {
//     if (params.action === 'findMany') {
//       return result.map((book: Book) => ({
//         ...book,
//         rating: book?.rating?.toNumber(),
//       }));
//     }
//     if (params.action === 'findUnique' || params.action === 'findFirst') {
//       return {
//         ...result,
//         rating: result?.rating?.toNumber(),
//       };
//     }
//   } else if (params.model === 'Feedback') {
//     if (params.action === 'findMany') {
//       return result.map((feedback: Feedback) => ({
//         ...feedback,
//         rating: feedback?.rating?.toNumber(),
//       }));
//     }
//     if (params.action === 'findUnique' || params.action === 'findFirst') {
//       return {
//         ...result,
//         rating: result?.rating?.toNumber(),
//       };
//     }
//   }

//   // See results here
//   return result;
// });
