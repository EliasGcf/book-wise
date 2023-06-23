'use client';

import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

import { Trash } from '@ui/icons';

import { Feedback, User } from '@libs/prisma';

import { deleteFeedback } from '@utils/delete-feedback';

type Props = {
  user: Required<Session>['user'];
  author: User;
  feedback: Feedback;
  deleteAction: typeof deleteFeedback;
};

export function DeleteFeedbackButton({ author, user, feedback, deleteAction }: Props) {
  const router = useRouter();
  const authorIsUser = author.id === user.id;

  async function handleDeleteFeedback() {
    if (!authorIsUser) return;

    // TODO: Replace with a confirmation dialog
    // eslint-disable-next-line no-alert
    if (!window.confirm('Tem certeza que deseja excluir essa avaliação?')) return;

    await deleteAction(feedback.id);

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
