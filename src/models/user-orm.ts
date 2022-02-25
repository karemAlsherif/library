import {  DataTypes, Model } from "sequelize";
import { sequelize } from "../daos/db";
 enum UserRoles {
  Standard,
  Admin,
}
class User extends Model {
  declare id: number;
  declare name: string;
  declare email: string;
  declare pwdHash: string;
  declare role: UserRoles;
}

User.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pwdHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("Standard", "Admin"),
      defaultValue: "Standard",
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "User", // We need to choose the model name
    tableName:"Users"
  }
);

// the defined model is the class itself
console.log(User === sequelize.models.User); // tru
export { User,UserRoles};