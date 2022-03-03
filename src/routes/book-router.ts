import StatusCodes from "http-status-codes";
import { Request, Response, Router } from "express";

import bookService from "@services/book-service";
import { ParamMissingError } from "@shared/errors";

// Constants
const router = Router();
const { CREATED, OK } = StatusCodes;

// Paths
export const p = {
  get: "/all",
  add: "/add",
  delete: "/delete/:id",
} as const;

/**
 * Get all books.
 */
router.get(p.get, async (_: Request, res: Response) => {
  console.log(_.query);
  
  const book = await bookService.getAll(objectMap(_.query));
  return res.status(OK).json({ book });
});

function objectMap(object:any,) {
  return Object.keys(object).reduce(function(result:any, key) {
    result[key] = parseInt(object[key])
    return result
  }, {})
}
/**
 * Add one book.
 */
router.post(p.add, async (req: Request, res: Response) => {
  const { book } = req.body;
  // Check param
  if (!book) {
    throw new ParamMissingError();
  }
  // Fetch data
  await bookService.addOne(book);
  return res.status(CREATED).end();
});
/**
 * Delete one user.
 */
router.delete(p.delete, async (req: Request, res: Response) => {
  const { id } = req.params;
  // Check param
  if (!id) {
    throw new ParamMissingError();
  }
  // Fetch data
  await bookService.delete(Number(id));
  return res.status(OK).end();
});

// Export default
export default router;
