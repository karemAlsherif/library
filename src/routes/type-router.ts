import StatusCodes from "http-status-codes";
import { Request, Response, Router } from "express";

import typeService from "@services/type-service";
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
 * Get all booktypes.
 */
router.get(p.get, async (_: Request, res: Response) => {
  const booktype = await typeService.getAll();
  return res.status(OK).json({ booktype });
});

/**
 * Add one booktype.
 */
router.post(p.add, async (req: Request, res: Response) => {
  const { booktype } = req.body;
  // Check param
  if (!booktype) {
    throw new ParamMissingError();
  }
  // Fetch data
  await typeService.addOne(booktype);
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
  await typeService.delete(Number(id));
  return res.status(OK).end();
});

// Export default
export default router;
