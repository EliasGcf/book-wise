import { Text } from '@ui/Text';
import { Title } from '@ui/Title';

import { Stars } from '@components/Stars';

export function UserBookList() {
  return (
    <section className="mt-8 flex flex-col gap-6 overflow-y-auto">
      <div>
        <Text size="sm" className="mb-2 text-gray-03">
          Há 2 dias
        </Text>

        <div className="rounded-lg bg-gray-07 p-6">
          <div className="flex gap-6">
            <img
              src="https://m.media-amazon.com/images/I/91M9xPIf10L.jpg"
              alt=""
              className="max-h-[134px] min-w-[98px] rounded object-cover"
            />

            <div className="flex flex-col justify-between">
              <div>
                <Title size="sm" as="h3" className="text-gray-01">
                  O Hobbit
                </Title>
                <Text size="sm" className="text-gray-04">
                  J.R.R. Tolkien
                </Text>
              </div>

              <Stars votes={4} size={16} />
            </div>
          </div>

          <Text size="sm" className="mt-6 text-gray-03" as="p">
            Tristique massa sed enim lacinia odio. Congue ut faucibus nunc vitae non. Nam
            feugiat vel morbi viverra vitae mi. Vitae fringilla ut et suspendisse enim
            suspendisse vitae. Leo non eget lacus sollicitudin tristique pretium quam.
            Mollis et luctus amet sed convallis varius massa sagittis.
            <br />
            Proin sed proin at leo quis ac sem. Nam donec accumsan curabitur amet tortor
            quam sit. Bibendum enim sit dui lorem urna amet elit rhoncus ut. Aliquet
            euismod vitae ut turpis. Aliquam amet integer pellentesque.
          </Text>
        </div>
      </div>
      <div>
        <Text size="sm" className="mb-2 text-gray-03">
          Há 2 dias
        </Text>

        <div className="rounded-lg bg-gray-07 p-6">
          <div className="flex gap-6">
            <img
              src="https://m.media-amazon.com/images/I/91M9xPIf10L.jpg"
              alt=""
              className="max-h-[134px] min-w-[98px] rounded object-cover"
            />

            <div className="flex flex-col justify-between">
              <div>
                <Title size="sm" as="h3" className="text-gray-01">
                  O Hobbit
                </Title>
                <Text size="sm" className="text-gray-04">
                  J.R.R. Tolkien
                </Text>
              </div>

              <Stars votes={4} size={16} />
            </div>
          </div>

          <Text size="sm" className="mt-6 text-gray-03" as="p">
            Tristique massa sed enim lacinia odio. Congue ut faucibus nunc vitae non. Nam
            feugiat vel morbi viverra vitae mi. Vitae fringilla ut et suspendisse enim
            suspendisse vitae. Leo non eget lacus sollicitudin tristique pretium quam.
            Mollis et luctus amet sed convallis varius massa sagittis.
            <br />
            Proin sed proin at leo quis ac sem. Nam donec accumsan curabitur amet tortor
            quam sit. Bibendum enim sit dui lorem urna amet elit rhoncus ut. Aliquet
            euismod vitae ut turpis. Aliquam amet integer pellentesque.
          </Text>
        </div>
      </div>
      <div>
        <Text size="sm" className="mb-2 text-gray-03">
          Há 2 dias
        </Text>

        <div className="rounded-lg bg-gray-07 p-6">
          <div className="flex gap-6">
            <img
              src="https://m.media-amazon.com/images/I/91M9xPIf10L.jpg"
              alt=""
              className="max-h-[134px] min-w-[98px] rounded object-cover"
            />

            <div className="flex flex-col justify-between">
              <div>
                <Title size="sm" as="h3" className="text-gray-01">
                  O Hobbit
                </Title>
                <Text size="sm" className="text-gray-04">
                  J.R.R. Tolkien
                </Text>
              </div>

              <Stars votes={4} size={16} />
            </div>
          </div>

          <Text size="sm" className="mt-6 text-gray-03" as="p">
            Tristique massa sed enim lacinia odio. Congue ut faucibus nunc vitae non. Nam
            feugiat vel morbi viverra vitae mi. Vitae fringilla ut et suspendisse enim
            suspendisse vitae. Leo non eget lacus sollicitudin tristique pretium quam.
            Mollis et luctus amet sed convallis varius massa sagittis.
            <br />
            Proin sed proin at leo quis ac sem. Nam donec accumsan curabitur amet tortor
            quam sit. Bibendum enim sit dui lorem urna amet elit rhoncus ut. Aliquet
            euismod vitae ut turpis. Aliquam amet integer pellentesque.
          </Text>
        </div>
      </div>
    </section>
  );
}
