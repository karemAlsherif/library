import { User } from "../models/user";
import { UserNotFoundError } from "@shared/errors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Get all users.
 *
 * @returns
 */
function getAll(): Promise<User[]> {
  return prisma.user.findMany();
}

/**
 * Add one user.
 *
 * @param user
 * @returns
 */
async function addOne(user: User): Promise<User> {
  return await prisma.user.create({ data: { ...user } });
}

/**
 * Update one user.
 *
 * @param user
 * @returns
 */
async function updateOne(user: User): Promise<User> {
  const persists = await prisma.user.findUnique({ where: { id: user.id } });
  if (!persists) {
    throw new UserNotFoundError();
  }
  return await prisma.user.update({
    where: { id: user.id },
    data: { ...user },
  });
}

/**
 * Delete a user by their id.
 *
 * @param id
 * @returns
 */
async function deleteOne(id: number): Promise<void> {
  const persists = await prisma.user.findUnique({ where: { id } });
  if (!persists) {
    throw new UserNotFoundError();
  }
  await prisma.user.delete({ where: { id } });
}

// Export default
export default {
  getAll,
  addOne,
  updateOne,
  delete: deleteOne,
} as const;
