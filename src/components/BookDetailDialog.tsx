/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/alt-text */
import * as Dialog from '@radix-ui/react-dialog';
import { BookmarkSimple, BookOpen, X } from '@ui/icons';
import { Link } from '@ui/Link';
import { Text } from '@ui/Text';
import { Title } from '@ui/Title';
import { DefaultSession } from 'next-auth';

import { Avatar } from '@components/Avatar';
import { DialogOverlay } from '@components/DialogOverlay';
import { FeedbackForm } from '@components/FeedbackForm';
import { SigninDialog } from '@components/SigninDialog';
import { Stars } from '@components/Stars';
import { dayjs } from '@libs/dayjs';

type BookDetailDialogProps = {
  user?: DefaultSession['user'];
};

export function BookDetailDialog({ user }: BookDetailDialogProps) {
  return (
    <Dialog.Portal>
      <DialogOverlay />

      <Dialog.Content className="fixed inset-y-0 right-0 flex h-screen w-[660px] flex-col overflow-y-auto bg-gray-08 py-6 px-12 data-[state=open]:animate-in data-[state=open]:slide-in-from-right">
        <Dialog.Close className="ml-auto h-fit">
          <X size={24} className="text-gray-04" weight="bold" />
        </Dialog.Close>

        <div className="mt-4 rounded-lg bg-gray-07 px-8 py-6">
          <div className="flex gap-8">
            <img
              src="https://m.media-amazon.com/images/I/91BsZhxCRjL.jpg"
              alt=""
              className="max-h-[242px] min-w-[171px] rounded-lg object-cover"
            />

            <div className="flex flex-col">
              <Dialog.Title asChild>
                <Title size="sm" as="h3" className="text-gray-01">
                  A revolução dos bichos
                </Title>
              </Dialog.Title>

              <Dialog.Description asChild>
                <Text size="md" className="text-gray-03">
                  George Orwell
                </Text>
              </Dialog.Description>

              <div className="mt-auto">
                <Stars votes={4} size={20} />
                <Text size="sm" className="mt-1 text-gray-04">
                  4 avaliações
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
                <Title size="xs" as="span" className="text-gray-02">
                  Computação, educação
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
                  160
                </Title>
              </div>
            </div>
          </div>
        </div>

        <section>
          <header className="mt-10 mb-4 flex items-center justify-between">
            <Text size="sm" className="text-gray-02">
              Avaliações
            </Text>

            {!user && (
              <Dialog.Root>
                <Dialog.Trigger>
                  <Link
                    size="md"
                    as="button"
                    className="flex items-center gap-2 text-purple-01 transition-opacity hover:opacity-70"
                  >
                    Avaliar
                  </Link>
                </Dialog.Trigger>

                <SigninDialog />
              </Dialog.Root>
            )}
          </header>

          <ul className="flex flex-col gap-3">
            {user && <FeedbackForm user={user} />}
            <FeedbackCard />
            <FeedbackCard />
            <FeedbackCard />
            <FeedbackCard />
          </ul>
        </section>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

function FeedbackCard() {
  return (
    <li className="flex flex-col gap-5 rounded-lg bg-gray-07 p-6">
      <header className="flex justify-between">
        <div className="flex gap-4">
          <Avatar imageUrl="https://github.com/eliasgcf.png" name="Elias Gabriel" />
          <div>
            <Text size="md" className="text-gray-01">
              Elias Gabriel
            </Text>
            <Text size="sm" className="text-gray-04">
              {dayjs(new Date()).fromNow()}
            </Text>
          </div>
        </div>

        <Stars votes={4} />
      </header>

      <Text size="sm" className="text-gray-03">
        Nec tempor nunc in egestas. Euismod nisi eleifend at et in sagittis. Penatibus id
        vestibulum imperdiet a at imperdiet lectus leo. Sit porta eget nec vitae sit
        vulputate eget
      </Text>
    </li>
  );
}
