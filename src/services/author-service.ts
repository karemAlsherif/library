import { Author } from "../models/book";
import { UserNotFoundError } from "../shared/errors";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
/**
 * Get all authors.
 *
 * @returns
 */
async function getAll(): Promise<Author[]> {
  const data = await prisma.author.findMany({
    include: { books: true },
  });
  return data;
}

/**
 * Add one author.
 *
 * @param author
 * @returns
 */
async function addOne(author: Author): Promise<Author> {
  console.log(author);

  const data = await prisma.author.create({
    data: { ...author },
    include: { books: true },
  });
  return data;
}

/**
 * Update one author.
 *
 * @param author
 * @returns
 */
async function updateOne(author: Author): Promise<Author> {
  const persists = await prisma.author.findUnique({ where: { id: author.id } });
  if (!persists) {
    throw new UserNotFoundError();
  }
  return await await prisma.author.update({
    where: { id: author.id },
    data: { ...author },
    include: { books: true },
  });
}

/**
 * Delete a author by their id.
 *
 * @param id
 * @returns
 */
async function deleteOne(id: number): Promise<void> {
  const persists = await prisma.author.findUnique({ where: { id } });
  if (!persists) {
    throw new UserNotFoundError();
  }
  await prisma.author.delete({ where: { id } });
}

// Export default
export default {
  getAll,
  addOne,
  updateOne,
  delete: deleteOne,
} as const;
