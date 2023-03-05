import { ChartLineUp } from '@ui/icons';
import { Title } from '@ui/Title';

import { LastRead } from '@app/(authenticated)/dashboard/LastRead';
import { PopularBooks } from '@app/(authenticated)/dashboard/PopularBooks';
import { RecentFeedbacks } from '@app/(authenticated)/dashboard/RecentFeedbacks';

export default function Dashboard() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col px-4 pt-14 pb-5">
      <header className="flex items-center gap-3">
        <ChartLineUp size={32} className="text-green-01" />
        <Title size="lg" className="text-gray-01">
          Início
        </Title>
      </header>

      <div className="mt-10 flex flex-col-reverse gap-10 overflow-y-auto xl:flex-row xl:justify-between xl:gap-0">
        <div className="flex max-w-[608px] flex-col gap-10">
          <LastRead />
          <RecentFeedbacks />
        </div>

        <PopularBooks />
      </div>
    </div>
  );
}
