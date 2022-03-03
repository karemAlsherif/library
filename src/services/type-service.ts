import { BookType } from '../models/book';
import { UserNotFoundError } from "../shared/errors";
import { PrismaClient,BookType as CreateType } from "@prisma/client";
const prisma = new PrismaClient();
/**
 * Get all BookTypes.
 *
 * @returns
 */
async function getAll(): Promise<BookType[]> {
  const data = await prisma.bookType.findMany({
    include: { books: true },
  });
  return data;
}

/**
 * Add one BookType.
 *
 * @param BookType
 * @returns
 */
async function addOne(bookType: CreateType): Promise<BookType> {
  console.log(bookType);

  const data = await prisma.bookType.create({data:{...bookType},include:{books:true}});
  return data;
}

/**
 * Update one BookType.
 *
 * @param BookType
 * @returns
 */
async function updateOne(bookType: CreateType): Promise<BookType> {
  const persists = await prisma.bookType.findUnique({ where: { id: bookType.id } });
  if (!persists) {
    throw new UserNotFoundError();
  }
  return await await prisma.bookType.update({
    where: { id: bookType.id },
    data: { ...bookType },
    include: { books: true },
  });
}

/**
 * Delete a BookType by their id.
 *
 * @param id
 * @returns
 */
async function deleteOne(id: number): Promise<void> {
  const persists = await prisma.bookType.findUnique({ where: { id } });
  if (!persists) {
    throw new UserNotFoundError();
  }
  await prisma.bookType.delete({ where: { id } });
}

// Export default
export default {
  getAll,
  addOne,
  updateOne,
  delete: deleteOne,
} as const;
