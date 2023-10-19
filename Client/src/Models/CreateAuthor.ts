import { CreateAuthorBookModel } from './CreateAuthorBook';

export type CreateAuthorModel = {
  name: string;
  age: number;
  books: CreateAuthorBookModel[];
};
