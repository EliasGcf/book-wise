'use client';

import { Book } from '@prisma/client';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';

import { Avatar } from '@components/Avatar';
import { Textarea } from '@components/Form/Textarea';
import { Stars } from '@components/Stars';

import { Check, CircleNotch, X } from '@ui/icons';
import { Title } from '@ui/Title';

import { createFeedback } from '@utils/create-feedback';

type FeedbackFormProps = {
  user: Required<Session>['user'];
  book: Book;
  createAction: typeof createFeedback;
};

export function FeedbackForm({ user, book, createAction }: FeedbackFormProps) {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState(0);

  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const description = formData.get('description')?.toString() || '';

    try {
      await createAction({ description, rating, bookId: book.id });

      toast.success('Avaliação enviada com sucesso!', {
        icon: '✅',
        position: 'top-left',
      });

      setRating(0);
      if (descriptionRef.current) descriptionRef.current.value = '';

      router.refresh();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('handleSubmit ~ error:', error);

      toast.error('Ocorreu um erro ao enviar a avaliação!', {
        position: 'top-left',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col rounded-lg bg-gray-07 p-6">
      <header className="flex w-full justify-between">
        <div className="flex items-center gap-4">
          {user.image && user.name && <Avatar imageUrl={user.image} name={user.name} />}
          {user.name && (
            <Title as="span" size="xs" className="text-gray-01">
              {user.name}
            </Title>
          )}
        </div>
        <Stars
          isClickable
          disabled={isSubmitting}
          votes={rating}
          onChange={setRating}
          size={28}
        />
      </header>

      <Textarea
        ref={descriptionRef}
        maxLength={450}
        name="description"
        disabled={isSubmitting}
      />

      <footer className="mt-3 flex justify-end gap-2">
        <button
          disabled={isSubmitting}
          type="reset"
          className="rounded bg-gray-06 p-2 transition-colors enabled:hover:bg-gray-05 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <X size={24} className="text-purple-01" />
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded bg-gray-06 p-2 transition-colors enabled:hover:bg-gray-05 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isSubmitting ? (
            <CircleNotch size={24} className="animate-spin text-green-01" />
          ) : (
            <Check size={24} className="text-green-01" />
          )}
        </button>
      </footer>
    </form>
  );
}
