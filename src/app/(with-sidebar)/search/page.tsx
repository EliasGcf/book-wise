import { SearchContent } from '@app/(with-sidebar)/search/SearchContent';

import { getServerSession } from '@libs/next-auth';
import { getBooks, getCategories } from '@libs/prisma';

export default async function Search() {
  const [session, books, categories] = await Promise.all([
    getServerSession(),
    getBooks(),
    getCategories(),
  ]);

  return <SearchContent categories={categories} books={books} user={session?.user} />;
}
