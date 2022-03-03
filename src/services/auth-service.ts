import bcrypt from "bcrypt";

import jwtUtil from "@util/jwt-util";
import { UnauthorizedError } from "@shared/errors";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
/**
 * Login()
 *
 * @param email
 * @param password
 * @returns
 */
async function login(
  email: string,
  password: string
): Promise<{ jwt: string; role: any }> {
  // Fetch user
  const user = await prisma.user.findFirst({ where: { email } });
  if (!user) {
    throw new UnauthorizedError();
  }
  // Check password
  const pwdPassed = await bcrypt.compare(password, user.pwdHash);
  if (!pwdPassed) {
    throw new UnauthorizedError();
  }
  // Setup Admin Cookie
  return {
    jwt: await jwtUtil.sign({
      id: user.id,
      email: user.name,
      name: user.name,
      role: user.role,
    }),
    role: user.role,
  };
}

// Export default
export default {
  login,
} as const;
