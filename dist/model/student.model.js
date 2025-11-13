import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.js";
export class Student extends Model {
    full_name;
    phone_number;
    profession;
    parent_name;
    parent_number;
    img_url;
}
Student.init({
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
    profession: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    parent_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    parent_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    img_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: "student",
    timestamps: true,
    sequelize: sequelize,
});
//# sourceMappingURL=student.model.js.map