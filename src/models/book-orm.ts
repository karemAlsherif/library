import {  DataTypes, Model } from "sequelize";
import { sequelize } from "../daos/db";

class Book extends Model {
  declare id: number;
  declare title: string;
  declare author: string;
  declare publisher: string;
  declare yearOfPublication: string;
  declare price: number;
}

Book.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publisher: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    yearOfPublication: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
    },
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Books", // We need to choose the model name
    tableName:"Books"
  }
);

// the defined model is the class itself
// console.log(Book === sequelize.models.Book); // tru
export default Book;
