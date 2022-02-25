import { Sequelize } from "sequelize";

// Option 2: Passing parameters separately (sqlite)
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./dbLite.sql",
});

export { sequelize };
