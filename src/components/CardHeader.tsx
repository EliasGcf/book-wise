import Link from 'next/link';

import { CaretRight } from '@ui/icons';
import { Text } from '@ui/Text';

type CardHeaderProps = {
  href?: string;
  linkTitle?: string;
  title: string;
};

export function CardHeader({ title, href, linkTitle }: CardHeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <Text size="sm" className="text-gray-01">
        {title}
      </Text>

      {href && (
        <Text
          variant="link"
          as={Link}
          size="sm"
          href={href}
          className="flex items-center gap-2 text-purple-01 transition-opacity hover:opacity-70"
          title={linkTitle}
        >
          Ver todas
          <CaretRight size={16} />
        </Text>
      )}
    </header>
  );
}
