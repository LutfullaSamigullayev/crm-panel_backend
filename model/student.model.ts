import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";

export class Student extends Model {
    full_name!: string;
    phone_number!: string;
    profession!: string;
    parent_name!: string;
    parent_number!: string;
    img_url!: string;
}

Student.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
}, {
    tableName: "student",
    timestamps: true,
    sequelize: sequelize
})