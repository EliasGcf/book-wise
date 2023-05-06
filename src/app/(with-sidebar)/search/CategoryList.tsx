import { CategoriesToggleGroup } from '@app/(with-sidebar)/search/CategoriesToggleGroup';

import { getCategories } from '@libs/prisma';

import { asyncComponent } from '@utils/async-component';

type TagsProps = {
  value?: string;
};

async function AsyncCategoryList({ value }: TagsProps) {
  const categories = await getCategories();

  return <CategoriesToggleGroup value={value} categories={categories} />;
}

export const CategoryList = asyncComponent(AsyncCategoryList);
