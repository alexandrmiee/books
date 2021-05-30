export interface Book {
  id: string;
  logo: string;
  title: string;
  shortDescription?: string;
  fullDescription?: string;
  year?: string;
  date?: string;
}

export enum BooksActions {
  SET_BOOKS = 'SET_BOOKS',
  SET_BOOK = 'SET_BOOK',
}

export interface BooksState {
  books: Book[];
  book: Book;
}
