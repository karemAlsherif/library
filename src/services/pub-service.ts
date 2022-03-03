import { Publisher } from "../models/book";
import { UserNotFoundError } from "../shared/errors";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
/**
 * Get all Publishers.
 *
 * @returns
 */
async function getAll(): Promise<Publisher[]> {
  const data = await prisma.publisher.findMany({
    include: { books: true },
  });
  return data;
}

/**
 * Add one Publisher.
 *
 * @param Publisher
 * @returns
 */
async function addOne(publisher: Publisher): Promise<Publisher> {
  console.log(publisher);

  const data = await prisma.publisher.create({
    data: { ...publisher },
    include: { books: true },
  });
  return data;
}

/**
 * Update one Publisher.
 *
 * @param Publisher
 * @returns
 */
async function updateOne(publisher: Publisher): Promise<Publisher> {
  const persists = await prisma.publisher.findUnique({ where: { id: publisher.id } });
  if (!persists) {
    throw new UserNotFoundError();
  }
  return await await prisma.publisher.update({
    where: { id: publisher.id },
    data: { ...publisher },
    include: { books: true },
  });
}

/**
 * Delete a Publisher by their id.
 *
 * @param id
 * @returns
 */
async function deleteOne(id: number): Promise<void> {
  const persists = await prisma.publisher.findUnique({ where: { id } });
  if (!persists) {
    throw new UserNotFoundError();
  }
  await prisma.publisher.delete({ where: { id } });
}

// Export default
export default {
  getAll,
  addOne,
  updateOne,
  delete: deleteOne,
} as const;
