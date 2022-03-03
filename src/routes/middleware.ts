import StatusCodes from "http-status-codes";
import { Request, Response, NextFunction } from "express";

import { UserRoles } from "../models/user";
import { cookieProps } from "@routes/auth-router";
import jwtUtil from "@util/jwt-util";

// Constants
const { UNAUTHORIZED } = StatusCodes;
const jwtNotPresentErr = "JWT not present in signed cookie.";

/**
 * Middleware to verify if user is an admin.
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
export async function adminMw(req: Request, res: Response, next: NextFunction) {
  try {
    if (
      (req.method == "GET" && req.originalUrl === "/api/books/all") ||
      (req.method == "GET" && req.originalUrl === "/api/authors/all") ||
      (req.method == "GET" && req.originalUrl === "/api/publisher/all") ||
      (req.method == "GET" && req.originalUrl === "/api/types/all")
    ) {
      next();
    } else {
      // Get json-web-token
      // console.log(req.method);

      const jwt = req.signedCookies[cookieProps.key];
      if (!jwt) {
        throw Error(jwtNotPresentErr);
      }
      // Make sure user role is an admin
      const clientData = await jwtUtil.decode(jwt);
      if (
        typeof clientData === "object" &&
        (parseInt(clientData.role) === UserRoles.Admin ||
          parseInt(clientData.role) === UserRoles.Employee)
      ) {
        res.locals.sessionUser = clientData;
        next();
      } else {
        throw Error(jwtNotPresentErr);
      }
    }
  } catch (err) {
    return res.status(UNAUTHORIZED).json({
      error: err.message,
    });
  }
}
