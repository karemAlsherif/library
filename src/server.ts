import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import helmet from "helmet";
import StatusCodes from "http-status-codes";
import express, { NextFunction, Request, Response } from "express";

import "express-async-errors";

import BaseRouter from "./routes/api";
import bookService from "./services/book-service";
import logger from "jet-logger";
import { cookieProps } from "@routes/auth-router";
import { CustomError } from "@shared/errors";

const app = express();

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(cookieProps.secret));

// Show routes called in console during development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Security
if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}

// Add APIs
app.use("/api", BaseRouter);

// Error handling
app.use(
  (err: Error | CustomError, _: Request, res: Response, __: NextFunction) => {
    logger.err(err, true);
    const status =
      err instanceof CustomError ? err.HttpStatus : StatusCodes.BAD_REQUEST;
    return res.status(status).json({
      error: err.message,
    });
  }
);

/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

// Set views directory (html)
const viewsDir = path.join(__dirname, "views");
app.set("views", viewsDir);

// Set static directory (js and css).
const staticDir = path.join(__dirname, "public");
app.use(express.static(staticDir));

// Nav to login pg by default

// Nav to login pg by default
app.get("/", (_: Request, res: Response) => {
  res.sendFile("library/index.html", { root: viewsDir });
});

app.get("/about", (_: Request, res: Response) => {
  res.sendFile("library/about.html", { root: viewsDir });
});
app.get("/book", (_: Request, res: Response) => {
  res.sendFile("library/book.html", { root: viewsDir });
});
app.get("/contact", (_: Request, res: Response) => {
  res.sendFile("library/contact.html", { root: viewsDir });
});

/************************************************************************************
 *                              Serve Admin content
 ***********************************************************************************/
// Redirect to login if not logged in.
app.get("/adminpanel", (req: Request, res: Response) => {
  const jwt = req.signedCookies[cookieProps.key];
  if (!jwt) {
    res.redirect("/login");
  } else {
    res.sendFile("dashbord/index.html", { root: viewsDir });
  }
});
app.get("/login", (req: Request, res: Response) => {
  const jwt = req.signedCookies[cookieProps.key];
  if (jwt) {
    res.redirect("/adminpanel");
  } else {
    res.sendFile("dashbord/login.html", { root: viewsDir });
  }
});
app.get("/users", (req: Request, res: Response) => {
  const jwt = req.signedCookies[cookieProps.key];
  if (!jwt) {
    res.redirect("/login");
  } else {
    res.sendFile("dashbord/users.html", { root: viewsDir });
  }
});
app.get("/adduser", (req: Request, res: Response) => {
  const jwt = req.signedCookies[cookieProps.key];
  if (!jwt) {
    res.redirect("/login");
  } else {
    res.sendFile("dashbord/adduser.html", { root: viewsDir });
  }
});
app.get("/books", (req: Request, res: Response) => {
  const jwt = req.signedCookies[cookieProps.key];
  if (!jwt) {
    res.redirect("/login");
  } else {
    res.sendFile("dashbord/books.html", { root: viewsDir });
  }
});
app.get("/addbook", (req: Request, res: Response) => {
  const jwt = req.signedCookies[cookieProps.key];
  if (!jwt) {
    res.redirect("/login");
  } else {
    res.sendFile("dashbord/addbook.html", { root: viewsDir });
  }
});
// app.post('/api', async (req: Request, res: Response) => {
//    try {
//     const book = await  bookService.addOne(req.body)
//     if (book) {
//         res.json(book).send();
//     } else {
//         res.json({error:"error"}).send();
//     }
//    } catch (error) {
//        console.log(error);
//    }
// });
// app.get('/api', async (req: Request, res: Response) => {
//    try {
//     const book = await  bookService.getAll()
//     if (book) {
//         res.json(book).send();
//     } else {
//         res.json({error:"error"}).send();
//     }
//    } catch (error) {
//        console.log(error);
//    }
// });

/************************************************************************************
 *                              Export Server
 ***********************************************************************************/

export default app;
