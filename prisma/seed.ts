import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedCategories() {
  await prisma.category.createMany({
    skipDuplicates: true,
    data: [
      { name: 'Computação' },
      { name: 'Educação' },
      { name: 'Fantasia' },
      { name: 'Ficção científica' },
      { name: 'Horror' },
      { name: 'HQs' },
      { name: 'Suspense' },
    ],
  });
}

async function seedBooks() {
  await prisma.book.createMany({
    skipDuplicates: true,
    data: [
      {
        title: 'A revolução dos bichos',
        slug: 'a-revolucao-dos-bichos',
        author: 'George Orwell',
        category_name: 'Fantasia',
        description: `Verdadeiro clássico moderno, concebido por um dos mais influentes escritores do século XX, A revolução dos bichos é uma fábula sobre o poder. Narra a insurreição dos animais de uma granja contra seus donos. Progressivamente, porém, a revolução degenera numa tirania ainda mais opressiva que a dos humanos.`,
        pages_amount: 152,
        rating: 0,
        image_url: 'https://m.media-amazon.com/images/I/91BsZhxCRjL.jpg',
      },
      {
        title: '14 Hábitos de Desenvolvedores Altamente Produtivos',
        slug: '14-habitos-de-desenvolvedores-altamente-produtivos',
        author: 'Zeno Rocha',
        category_name: 'Computação',
        description: `Você pode aprender os framework mais populares, usar as melhores linguagens de programação e trabalhar nas maiores empresas de tecnologia, mas se você cultivar maus hábitos, vai ser difícil se tornar um desenvolvedor de ponta.`,
        pages_amount: 135,
        rating: 0,
        image_url: 'https://m.media-amazon.com/images/I/41Xkqy2rMDL.jpg',
      },
      {
        title: 'O fim da eternidade',
        slug: 'o-fim-da-eternidade',
        author: 'Isaac Asimov',
        image_url: 'https://m.media-amazon.com/images/I/71tgD4z8zAL.jpg',
        description: `De forma leve e bem-humorada, Asimov realiza questionamentos ainda bastante contemporâneos, como o comodismo do ser humano, sua evolução perante as outras espécies e a busca incessante do controle sobre a vida dos outros.`,
        pages_amount: 256,
        rating: 0,
        category_name: 'Ficção científica',
      },
      {
        title: 'Entendendo Algoritmos',
        slug: 'entendendo-algoritmos',
        author: 'Aditya Bhargava',
        category_name: 'Computação',
        description: `O livro Entendendo Algoritmos apresenta uma abordagem agradável para esse tópico essencial da ciência da computação. Nele, você aprenderá como aplicar algoritmos comuns nos problemas de programação enfrentados diariamente.`,
        image_url: 'https://m.media-amazon.com/images/I/71Vkg7GfPFL.jpg',
        pages_amount: 264,
        rating: 0,
      },
      {
        title: 'Código limpo',
        slug: 'codigo-limpo',
        author: 'Robert C. Martin',
        category_name: 'Computação',
        description: `Código limpo é um livro que ensina a escrever códigos que são fáceis de entender, de se manter e de se adaptar. O autor Robert C. Martin, também conhecido como Uncle Bob, apresenta uma série de princípios e boas práticas que ajudam a escrever códigos mais limpos e mais fáceis de se trabalhar.`,
        image_url: 'https://m.media-amazon.com/images/I/41IRFCLk-kL.jpg',
        pages_amount: 425,
        rating: 0,
      },
      {
        title: 'O poder do hábito',
        slug: 'o-poder-do-habito',
        author: 'Charles Duhigg',
        category_name: 'Educação',
        description: `O poder do hábito é um livro que mostra como os hábitos podem ser usados para mudar a vida. O autor Charles Duhigg apresenta uma série de histórias de pessoas que conseguiram mudar seus hábitos e, com isso, mudar suas vidas.`,
        image_url: 'https://m.media-amazon.com/images/I/81XTXQEVPlL.jpg',
        pages_amount: 408,
        rating: 0,
      },
    ],
  });
}

async function main() {
  await seedCategories();
  await seedBooks();
}

main();
