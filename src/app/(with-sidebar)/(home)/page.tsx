import { Suspense } from 'react';

import { LastRead, LastReadLoading } from '@app/(with-sidebar)/(home)/LastRead';
import {
  PopularBooks,
  PopularBooksLoading,
} from '@app/(with-sidebar)/(home)/PopularBooks';
import {
  RecentFeedbacks,
  RecentFeedbacksLoading,
} from '@app/(with-sidebar)/(home)/RecentFeedbacks';

import { ChartLineUp } from '@ui/icons';
import { Title } from '@ui/Title';

export default function Dashboard() {
  return (
    <div className="flex flex-col overflow-hidden">
      <header className="flex items-center gap-3">
        <ChartLineUp size={32} className="text-green-01" />
        <Title size="lg" className="text-gray-01">
          Início
        </Title>
      </header>

      <div className="mt-10 flex flex-col-reverse gap-10 overflow-y-auto xl:flex-row xl:justify-between xl:gap-16">
        <div className="flex w-full flex-col gap-10 xl:max-w-[608px]">
          <Suspense fallback={<LastReadLoading />}>
            <LastRead />
          </Suspense>

          <Suspense fallback={<RecentFeedbacksLoading />}>
            <RecentFeedbacks />
          </Suspense>
        </div>

        <Suspense fallback={<PopularBooksLoading />}>
          <PopularBooks />
        </Suspense>
      </div>
    </div>
  );
}
