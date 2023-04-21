'use client';

import { Book } from '@prisma/client';
import { Check, CircleNotch, X } from '@ui/icons';
import { Title } from '@ui/Title';
import { Session } from 'next-auth';
import { useState } from 'react';

import { Avatar } from '@components/Avatar';
import { Textarea } from '@components/Form/Textarea';
import { Stars } from '@components/Stars';

type FeedbackFormProps = {
  user: Required<Session>['user'];
  book: Book;
};

export function FeedbackForm({ user, book }: FeedbackFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState(0);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const body = Object.fromEntries(formData.entries());

    try {
      await fetch(`/api/books/${book.id}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...body, rating }),
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('handleSubmit ~ error:', error);
      // TODO: Show toast
      // eslint-disable-next-line no-alert
      alert('Erro ao enviar feedback');
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

      <Textarea maxLength={450} name="description" disabled={isSubmitting} />

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
