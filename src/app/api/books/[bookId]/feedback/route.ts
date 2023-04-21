import { z } from 'zod';

import { getServerSession } from '@libs/next-auth';
import { prisma } from '@libs/prisma';

const bodySchema = z.object({
  rating: z.number().min(0).max(5),
  description: z.string().min(1).max(450),
});

const paramsSchema = z.object({
  bookId: z.string(),
});

export async function POST(
  request: Request,
  { params }: { params: z.infer<typeof paramsSchema> },
) {
  const session = await getServerSession();

  if (!session) return new Response(undefined, { status: 401 });

  const body = await request.json();

  const { rating, description } = bodySchema.parse(body);
  const { bookId } = paramsSchema.parse(params);

  await prisma.feedback.create({
    data: {
      description,
      rating,
      author_id: session.user.id,
      book_id: bookId,
    },
  });

  return new Response(undefined, { status: 201 });
}
