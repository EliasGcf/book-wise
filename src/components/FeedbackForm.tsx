import { Check, X } from '@ui/icons';
import { Title } from '@ui/Title';
import { DefaultSession } from 'next-auth';

import { Avatar } from '@components/Avatar';
import { Stars } from '@components/Stars';

type FeedbackFormProps = {
  user: Required<DefaultSession>['user'];
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

      <textarea
        className="mt-6 h-40 resize-none rounded border border-gray-05 bg-gray-08 py-3 px-5 text-gray-02 outline-none transition-colors placeholder:text-gray-04 focus:border-green-02"
        placeholder="Escreva sua avaliação"
      />

      <footer className="mt-3 flex justify-end gap-2">
        <button
          type="button"
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
