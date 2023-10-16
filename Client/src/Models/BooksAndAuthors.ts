import { AuthorOnlyModel } from './AuthorOnly';

export type BooksAndAuthorsModel = {
  id: number;
  name: string;
  price: number;
  rating: number;
  createdDate: Date;
  author: AuthorOnlyModel;
};
