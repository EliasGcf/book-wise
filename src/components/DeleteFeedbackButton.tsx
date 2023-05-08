'use client';

import { Feedback, User } from '@prisma/client';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

import { Trash } from '@ui/icons';

import { deleteFeedback } from '@utils/delete-feedback';

type Props = {
  user: Required<Session>['user'];
  author: User;
  feedback: Feedback;
};

export function DeleteFeedbackButton({ author, user, feedback }: Props) {
  const router = useRouter();
  const authorIsUser = author.id === user.id;

  async function handleDeleteFeedback() {
    if (!authorIsUser) return;

    // TODO: Replace with a confirmation dialog
    // eslint-disable-next-line no-alert
    if (!window.confirm('Tem certeza que deseja excluir essa avaliação?')) return;

    await deleteFeedback(feedback.id, user.id);

    toast.success('Avaliação excluída com sucesso!', { position: 'top-left' });

    router.refresh();
  }

  return (
    <button
      type="button"
      title="Excluir avaliação"
      className="text-danger-light transition-all hover:scale-125"
      onClick={handleDeleteFeedback}
    >
      <Trash size={16} />
    </button>
  );
}
