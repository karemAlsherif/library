import { type } from "os";

export type CreateBook = {
  id?: number;
  title: string;
  yearOfPublication: Date;
  price: any;
  authorId: number;
  typeId: number;
  publisherId: number;
};
export type Book = {
  id?: number;
  title: string;
  yearOfPublication: Date;
  price: any;
  author?: Author;
  authorId: number;
  type?: BookType;
  typeId: number;
  publisher?: Publisher;
  publisherId: number;
};

export type Publisher = {
  id: number;
  name: string;
  books: Book[];
};
export type Author = {
  id: number;
  name: string;
  books: Book[];
};

export type BookType = {
  id: number;
  name: String;
  books: Book[];
};
