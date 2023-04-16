/* eslint-disable no-use-before-define */

import { SearchContent } from '@app/(with-sidebar)/search/SearchContent';

import { getServerSession } from '@libs/next-auth';

export default async function Search() {
  const session = await getServerSession();

  return <SearchContent books={BOOKS} user={session?.user} />;
}

const BOOKS = [
  {
    id: 1,
    title: 'O Dilema do Inovador',
    author: 'Clayton Christensen',
    description: `Este livro discute a teoria da inovação disruptiva e explora como as empresas podem se adaptar para enfrentar os desafios da mudança tecnológica.`,
    stars: 4,
    created_at: new Date('2016-09-12').toISOString(),
    image_url: 'https://m.media-amazon.com/images/I/91M9xPIf10L.jpg',
  },
  {
    id: 2,
    title: 'A Revolução dos Dados',
    author: 'Viktor Mayer-Schönberger e Kenneth Cukier',
    description: `Este livro explora como os dados estão transformando a economia e a sociedade, e discute as implicações dessa mudança para as empresas e governos.`,
    stars: 4,
    created_at: new Date('2013-05-14').toISOString(),
    image_url: 'https://m.media-amazon.com/images/I/91M9xPIf10L.jpg',
  },
  {
    id: 3,
    title: 'A Caixa-Preta de Darwin',
    author: 'David J. Depew e Bruce H. Weber',
    description:
      'Este livro explora as semelhanças entre a evolução biológica e a evolução das tecnologias, argumentando que as duas são impulsionadas por um processo de seleção natural.',
    stars: 3,
    created_at: new Date('2003-03-01').toISOString(),
    image_url: 'https://m.media-amazon.com/images/I/91M9xPIf10L.jpg',
  },
  {
    id: 4,
    title: 'Sapiens: Uma Breve História da Humanidade',
    author: 'Yuval Noah Harari',
    description: `Este livro explora a história da humanidade, desde os primeiros humanos até os dias atuais, e discute as implicações das tecnologias modernas para o futuro da espécie.`,
    stars: 5,
    created_at: new Date('2015-08-19').toISOString(),
    image_url: 'https://m.media-amazon.com/images/I/91M9xPIf10L.jpg',
  },
  {
    id: 5,
    title: 'A Revolução dos Dados',
    author: 'Viktor Mayer-Schönberger e Kenneth Cukier',
    description: `Este livro explora como os dados estão transformando a economia e a sociedade, e discute as implicações dessa mudança para as empresas e governos.`,
    stars: 4,
    created_at: new Date('2013-05-14').toISOString(),
    image_url: 'https://m.media-amazon.com/images/I/91M9xPIf10L.jpg',
  },
  {
    id: 6,
    title: 'O Dilema do Inovador',
    author: 'Clayton Christensen',
    description: `Este livro discute a teoria da inovação disruptiva e explora como as empresas podem se adaptar para enfrentar os desafios da mudança tecnológica.`,
    stars: 4,
    created_at: new Date('2016-09-12').toISOString(),
    image_url: 'https://m.media-amazon.com/images/I/91M9xPIf10L.jpg',
  },
];
