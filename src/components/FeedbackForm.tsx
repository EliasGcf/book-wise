import { Check, X } from '@ui/icons';
import { Title } from '@ui/Title';
import { Session } from 'next-auth';

import { Avatar } from '@components/Avatar';
import { Textarea } from '@components/Form/Textarea';
import { Stars } from '@components/Stars';

type FeedbackFormProps = {
  user: Required<Session>['user'];
};

export function FeedbackForm({ user }: FeedbackFormProps) {
  return (
    <form className="flex flex-col rounded-lg bg-gray-07 p-6">
      <header className="flex w-full justify-between">
        <div className="flex items-center gap-4">
          {user.image && user.name && <Avatar imageUrl={user.image} name={user.name} />}
          {user.name && (
            <Title as="span" size="xs" className="text-gray-01">
              {user.name}
            </Title>
          )}
        </div>
        <Stars votes={0} size={28} />
      </header>

      <Textarea maxLength={450} />

      <footer className="mt-3 flex justify-end gap-2">
        <button
          type="reset"
          className="rounded bg-gray-06 p-2 transition-colors hover:bg-gray-05"
        >
          <X size={24} className="text-purple-01" />
        </button>

        <button
          type="submit"
          className="rounded bg-gray-06 p-2 transition-colors hover:bg-gray-05"
        >
          <Check size={24} className="text-green-01" />
        </button>
      </footer>
    </form>
  );
}
