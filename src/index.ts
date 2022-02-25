import "./pre-start"; // Must be the first import
import logger from "jet-logger";
import server from "./server";
import { sequelize } from "./daos/db";
import Book from "@models/book-orm";

// Constants
const serverStartMsg = "Express server started on port: ",
  port = process.env.PORT || 3000;

// Start server
server.listen(port, () => {
  run();
  logger.info(serverStartMsg + port);
});
async function run() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
