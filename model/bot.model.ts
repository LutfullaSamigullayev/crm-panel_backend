import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

export class Bot extends Model {
  first_name!: string;
  phone_number?: string;
  message!: string;
}

Bot.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
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
