import "./pre-start"; // Must be the first import
import logger from "jet-logger";
import server from "./server";
import { User, UserRoles } from "./models/user";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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
    const salt = await bcrypt.genSalt(10);
    let password = await bcrypt.hash("password", salt);
    const hasAdmin = await prisma.user.findUnique({
      where: { email: "admin@admin.com" },
    });
    const hasUser = await prisma.user.findMany();
    if (hasUser.length < 1 || !hasAdmin)
      try {
        await prisma.user.create({
          data: {
            name: "admin",
            email: "admin@admin.com",
            pwdHash: password,
            role: UserRoles.Admin,
          },
        });
      } catch (error) {
        console.log(error);
      }
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
