import StatusCodes from "http-status-codes";
import { Request, Response, Router } from "express";

import pubService from "@services/pub-service";
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
 * Get all pubs.
 */
router.get(p.get, async (_: Request, res: Response) => {
  const pubs = await pubService.getAll();
  return res.status(OK).json({ pubs });
});

/**
 * Add one pub.
 */
router.post(p.add, async (req: Request, res: Response) => {
  const { pub } = req.body;
  // Check param
  if (!pub) {
    throw new ParamMissingError();
  }
  // Fetch data
  await pubService.addOne(pub);
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
  await pubService.delete(Number(id));
  return res.status(OK).end();
});

// Export default
export default router;
