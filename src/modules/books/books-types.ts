export interface Book {
  id: string;
  logo: string;
  title: string;
  shortDescription?: string;
  fullDescription?: string;
  date?: string;
}

export enum BooksActions {
  SET_BOOKS = 'SET_BOOKS'
}

export interface BooksState {
  books: Book[],
}