import Book from "../models/book-orm";
import { UserNotFoundError } from '../shared/errors';

/**
 * Get all books.
 *
 * @returns
 */
function getAll(): Promise<Book[]> {
  return Book.findAll();
}

/**
 * Add one book.
 *
 * @param book
 * @returns
 */
function addOne(book: Book): Promise<Book> {
  console.log(book);
  return Book.create({... book });
}

/**
 * Update one book.
 *
 * @param book
 * @returns
 */
async function updateOne(book: Book): Promise<Book> {
  const persists = await Book.findByPk(book.id);
  if (!persists) {
    throw new UserNotFoundError();
  }
  return await  persists.update({...book});
}

/**
 * Delete a book by their id.
 *
 * @param id
 * @returns
 */
async function deleteOne(id: number): Promise<void> {
  const persists = await Book.findByPk(id);
  if (!persists) {
    throw new UserNotFoundError();
  }
  return await persists.destroy();
}

// Export default
export default {
  getAll,
  addOne,
  updateOne,
  delete: deleteOne,
} as const;
