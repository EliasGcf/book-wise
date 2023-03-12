/* eslint-disable jsx-a11y/alt-text */
import * as Dialog from '@radix-ui/react-dialog';
import { BookmarkSimple, BookOpen, X } from '@ui/icons';
import { Text } from '@ui/Text';
import { Title } from '@ui/Title';

import { Stars } from '@components/Stars';

export function BookDetailDialog() {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/60" />

      <Dialog.Content className="fixed inset-y-0 right-0 flex h-screen w-[660px] flex-col bg-gray-08 py-6 px-12">
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
      </Dialog.Content>
    </Dialog.Portal>
  );
}
