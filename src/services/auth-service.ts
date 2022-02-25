import bcrypt from 'bcrypt';

import jwtUtil from '@util/jwt-util';
import { UnauthorizedError } from '@shared/errors';
import { User } from '@models/user-orm';



/**
 * Login()
 * 
 * @param email 
 * @param password 
 * @returns 
 */
async function login(email: string, password: string): Promise<string> {
    // Fetch user
    const user = await User.findOne({where:{email}});
    if (!user) {
        throw new UnauthorizedError();
    }
    // Check password
    const pwdPassed = await bcrypt.compare(password, user.pwdHash);
    if (!pwdPassed) {
        throw new UnauthorizedError();
    }
    // Setup Admin Cookie
    return jwtUtil.sign({
        id: user.id,
        email: user.name,
        name: user.name,
        role: user.role,
    });
}


// Export default
export default {
    login,
} as const;
