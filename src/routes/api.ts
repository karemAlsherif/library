import { Router } from "express";
import { adminMw } from "./middleware";
import authRouter from "./auth-router";
import userRouter from "./user-router";
import bookRouter from "./book-router";
import authorRouter from "./author-router";
import typeRouter from "./type-router";
import pubRouter from "./pub-router";

// Init
const apiRouter = Router();

// Add api routes
apiRouter.use("/auth", authRouter);
apiRouter.use("/users", adminMw, userRouter);
apiRouter.use("/books", adminMw, bookRouter);
apiRouter.use("/authors", adminMw, authorRouter);
apiRouter.use("/types", adminMw, typeRouter);
apiRouter.use("/publisher", adminMw, pubRouter);

// Export default
export default apiRouter;
