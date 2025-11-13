import { Router } from "express";
import { addStudent, deleteStudent, getAllStudents, updateStudent } from "../controller/student.controller.js";
const studentRouter = Router();
studentRouter.get("/get_all_students", getAllStudents);
studentRouter.post("/add_student", addStudent);
studentRouter.put("/update_student", updateStudent);
studentRouter.delete("/delete_student", deleteStudent);
export default studentRouter;
//# sourceMappingURL=student.router.js.map