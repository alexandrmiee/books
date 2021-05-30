import { Connection } from 'typeorm';

import { BooksRepository } from '../src/books/books.repository';
import { Book } from '../src/books/model/book.entity';

const bookTemplate = {
    logo: 'https://www.publicbooks.org/wp-content/uploads/2017/01/book-e1484158615982.jpg',
    title: 'Book',
    shortDescription: 'Short. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    year: '2021',
    fullDescription: `
      Full. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
      Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an
      unknown printer took a galley of type and scrambled it to make a type specimen book. It
      has survived not only five centuries, but also the leap into electronic typesetting,
      remaining essentially unchanged. It was popularised in the 1960s with the release of
      Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      It is a long established fact that a reader will be distracted by the readable content of a
      page when looking at its layout.
    `,
  }
export  const booksSeed = async (db: Connection) => {
  const booksRepo = db.getCustomRepository(BooksRepository);
  await Promise.all(
    (new Array(10).fill(0)).map(async (_, index) => {
      const book = new Book();
      Object.assign(book, {
        ...bookTemplate,
        title: `${bookTemplate.title} ${index}`
      });

      return booksRepo.save(book);
    }),
  );
};