import * as Dialog from '@radix-ui/react-dialog';
import { Session } from 'next-auth';
import Link from 'next/link';

import { DialogOverlay } from '@components/DialogOverlay';
import { FeedbackCard } from '@components/FeedbackCard';
import { FeedbackForm } from '@components/FeedbackForm';
import { SigninDialog } from '@components/SigninDialog';
import { Stars } from '@components/Stars';

import { BookmarkSimple, BookOpen, X } from '@ui/icons';
import { Text } from '@ui/Text';
import { Title } from '@ui/Title';

import { Book, Feedback, User } from '@libs/prisma';

import { tw } from '@utils/tw';

type FeedbackWithAuthor = Feedback & { author: User };
type BookWithFeedbacks = Book & { feedbacks: FeedbackWithAuthor[] };

type BookDetailDialogProps = Dialog.DialogProps & {
  user?: Session['user'];
  book: BookWithFeedbacks;
};

export function BookDetailDialog({
  user,
  book,
  children,
  ...rest
}: BookDetailDialogProps) {
  const hasUserFeedback = book.feedbacks.some((feedback) => {
    return feedback.author_id === user?.id;
  });

  return (
    <Dialog.Root {...rest}>
      {children}

      <Dialog.Portal>
        <DialogOverlay />

        <Dialog.Content className="fixed inset-y-0 right-0 flex h-screen w-full max-w-[660px] flex-col overflow-y-auto bg-gray-08 px-12 py-6 data-[state=open]:animate-in data-[state=open]:slide-in-from-right">
          <Dialog.Close className="ml-auto h-fit">
            <X size={24} className="text-gray-04" weight="bold" />
          </Dialog.Close>

          <div className="mt-4 rounded-lg bg-gray-07 px-8 py-6">
            <div className="flex gap-8">
              <img
                src={book.image_url}
                alt=""
                className="max-h-[242px] min-w-[171px] rounded-lg object-cover"
              />

              <div className="flex flex-col">
                <Dialog.Title asChild>
                  <Title size="sm" as="h3" className="text-gray-01">
                    {book.title}
                  </Title>
                </Dialog.Title>

                <Dialog.Description asChild>
                  <Text
                    size="md"
                    className="text-gray-03 underline-offset-2 hover:underline"
                    as={Link}
                    href={`/search?search=${book.author}`}
                  >
                    {book.author}
                  </Text>
                </Dialog.Description>

                <div className="mt-auto">
                  <Stars votes={book.rating ?? 0} size={20} />
                  <Text size="sm" className="mt-1 text-gray-04">
                    {book.feedbacks.length} avaliações
                  </Text>
                </div>
              </div>
            </div>

            <div className="mt-10 flex gap-14 border-t border-gray-06 py-6">
              <div className="flex items-center gap-4">
                <BookmarkSimple size={24} className="text-green-01" />
                <div>
                  <Text size="sm" className="text-gray-02">
                    Categoria
                  </Text>
                  <Title
                    size="xs"
                    className="text-gray-02 underline-offset-2 hover:underline"
                    as={Link}
                    href={`/search?category=${book.category_name}`}
                  >
                    {book.category_name}
                  </Title>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <BookOpen size={24} className="text-green-01" />
                <div>
                  <Text size="sm" className="text-gray-02">
                    Páginas
                  </Text>
                  <Title size="xs" as="span" className="text-gray-02">
                    {book.pages_amount}
                  </Title>
                </div>
              </div>
            </div>
          </div>

          <section>
            <header className="mb-4 mt-10 flex items-center justify-between">
              <Text size="sm" className="text-gray-02">
                Avaliações
              </Text>

              {!user && (
                <Dialog.Root>
                  <Dialog.Trigger>
                    <Text
                      variant="link"
                      as="button"
                      className="text-purple-01 transition-opacity hover:opacity-70"
                    >
                      Avaliar
                    </Text>
                  </Dialog.Trigger>

                  <SigninDialog />
                </Dialog.Root>
              )}
            </header>

            <ul className="flex flex-col gap-3">
              {user && book && !hasUserFeedback && (
                <FeedbackForm user={user} book={book} />
              )}

              {book.feedbacks.map((feedback) => (
                <li key={feedback.id}>
                  <FeedbackCard
                    author={feedback.author}
                    feedback={feedback}
                    user={user}
                    className={tw({ 'bg-gray-06': user?.id === feedback.author_id })}
                  />
                </li>
              ))}
            </ul>
          </section>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
