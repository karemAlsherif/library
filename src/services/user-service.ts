import {User} from '../models/user-orm';
import { UserNotFoundError } from '@shared/errors';



/**
 * Get all users.
 * 
 * @returns 
 */
function getAll(): Promise<User[]> {
    return User.findAll();
}


/**
 * Add one user.
 * 
 * @param user 
 * @returns 
 */
async function addOne(user: User): Promise<User> {
    return await User.create({...user});
}


/**
 * Update one user.
 * 
 * @param user 
 * @returns 
 */
async function updateOne(user: User): Promise<User> {
    const persists = await User.findByPk(user.id);
    if (!persists) {
        throw new UserNotFoundError();
    }
    return persists.update(user);
}


/**
 * Delete a user by their id.
 * 
 * @param id 
 * @returns 
 */
async function deleteOne(id: number): Promise<void> {
    const persists = await User.findByPk(id);
    if (!persists) {
        throw new UserNotFoundError();
    }
    return persists.destroy();
}


// Export default
export default {
    getAll,
    addOne,
    updateOne,
    delete: deleteOne,
} as const;
