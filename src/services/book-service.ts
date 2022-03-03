import { Book, CreateBook } from "../models/book";
import { UserNotFoundError } from "../shared/errors";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
/**
 * Get all books.
 *
 * @returns
 */
async function getAll(query: {
  authorId?: number;
  typeId?: number;
  pubId?: number;
}): Promise<Book[]> {
  const data = await prisma.book.findMany({
    where: { ...query },
    include: { author: true, publisher: true, type: true },
  });
  const book = data.map((value, index, list) => {
    return { ...value } as unknown as Book;
  });
  return book;
}

/**
 * Add one book.
 *
 * @param book
 * @returns
 */
async function addOne(book: CreateBook): Promise<Book> {
  console.log(book);

  const data = await prisma.book.create({
    data: { ...book },
  });
  return data;
}

/**
 * Update one book.
 *
 * @param book
 * @returns
 */
async function updateOne(book: CreateBook): Promise<Book> {
  const persists = await prisma.book.findUnique({ where: { id: book.id } });
  if (!persists) {
    throw new UserNotFoundError();
  }
  return await await prisma.book.update({
    where: { id: book.id },
    data: { ...book },
  });
}

/**
 * Delete a book by their id.
 *
 * @param id
 * @returns
 */
async function deleteOne(id: number): Promise<void> {
  const persists = await prisma.book.findUnique({ where: { id } });
  if (!persists) {
    throw new UserNotFoundError();
  }
  await prisma.book.delete({ where: { id } });
}

// Export default
export default {
  getAll,
  addOne,
  updateOne,
  delete: deleteOne,
} as const;
