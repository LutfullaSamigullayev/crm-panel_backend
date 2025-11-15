import { Student } from "../model/student.model.js";
export const getAllStudents = async (req, res, next) => {
    try {
        const students = await Student.findAll();
        res.status(200).json(students);
    }
    catch (error) {
        next(error);
    }
};
export const addStudent = async (req, res, next) => {
    try {
        const { full_name, phone_number, profession, parent_name, parent_number, img_url } = req.body;
        await Student.create({ full_name, phone_number, profession, parent_name, parent_number, img_url });
        res.status(201).json({ message: "Added new student" });
    }
    catch (error) {
        next(error);
    }
};
export const updateStudent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { full_name, phone_number, profession, parent_name, parent_number, img_url } = req.body;
        const foundedStudent = await Student.findByPk(id);
        if (!foundedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }
        await Student.update({ full_name, phone_number, profession, parent_name, parent_number, img_url }, { where: { id } });
        res.status(201).json({ message: "Updated student" });
    }
    catch (error) {
        next(error);
    }
};
export const deleteStudent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const foundedStudent = await Student.findByPk(id);
        if (!foundedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }
        await Student.destroy({ where: { id } });
        res.status(201).json({ message: "Updated student" });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=student.controller.js.map