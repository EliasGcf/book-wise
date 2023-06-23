import { AppPrismaClient } from '@libs/prisma';

declare global {
  // eslint-disable-next-line vars-on-top, no-var
  var prisma: AppPrismaClient | undefined;
}
