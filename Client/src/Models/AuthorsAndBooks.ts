import { BooksOnlyModel } from './BooksOnly';

export type AuthorsAndBooksModel = {
  id: number;
  name: string;
  age: number;
  books: BooksOnlyModel[];
};
