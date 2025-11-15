import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

export class Bot extends Model {
  full_name!: string;
  phone_number!: string;
  message!: string;
}

Bot.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    tableName: "bot",
    timestamps: true,
    sequelize: sequelize,
  }
);
