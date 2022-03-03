import StatusCodes from "http-status-codes";
import { Request, Response, Router } from "express";

import authorService from "@services/author-service";
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
 * Get all authors.
 */
router.get(p.get, async (_: Request, res: Response) => {
  const authors = await authorService.getAll();
  return res.status(OK).json({ authors });
});

/**
 * Add one author.
 */
router.post(p.add, async (req: Request, res: Response) => {
  const { author } = req.body;
  // Check param
  if (!author) {
    throw new ParamMissingError();
  }
  // Fetch data
  await authorService.addOne(author);
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
  await authorService.delete(Number(id));
  return res.status(OK).end();
});

// Export default
export default router;
