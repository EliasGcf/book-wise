/* eslint-disable no-use-before-define */

import { SearchContent } from '@app/(with-sidebar)/search/SearchContent';

import { getServerSession } from '@libs/next-auth';
import { prisma } from '@libs/prisma';

// Exclude keys from user
// function exclude<T, Key extends keyof T>(arrOrObj: T, keys: Key[]): Omit<T, Key> {
//   // eslint-disable-next-line no-param-reassign
//   keys.forEach((key) => delete arrOrObj[key]);

//   return arrOrObj;
// }

export default async function Search() {
  const [session, books, categories] = await Promise.all([
    getServerSession(),
    prisma.book.findMany(),
    prisma.category.findMany(),
  ]);

  return <SearchContent categories={categories} books={books} user={session?.user} />;
}
