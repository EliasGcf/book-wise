import { ChartLineUp } from '@ui/icons';
import { Title } from '@ui/Title';
import { getServerSession } from 'next-auth';

import { LastRead } from '@app/(with-sidebar)/(home)/LastRead';
import { PopularBooks } from '@app/(with-sidebar)/(home)/PopularBooks';
import { RecentFeedbacks } from '@app/(with-sidebar)/(home)/RecentFeedbacks';

export default async function Dashboard() {
  const session = await getServerSession();

  return (
    <div className="flex flex-col overflow-hidden">
      <header className="flex items-center gap-3">
        <ChartLineUp size={32} className="text-green-01" />
        <Title size="lg" className="text-gray-01">
          Início
        </Title>
      </header>

      <div className="mt-10 flex flex-col-reverse gap-10 overflow-y-auto xl:flex-row xl:justify-between xl:gap-16">
        <div className="flex flex-col gap-10 xl:max-w-[608px]">
          {session && <LastRead />}
          <RecentFeedbacks />
        </div>

        <PopularBooks />
      </div>
    </div>
  );
}
