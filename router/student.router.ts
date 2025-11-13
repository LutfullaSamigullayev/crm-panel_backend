import { Router, type RequestHandler } from "express";
import { addStudent, deleteStudent, getAllStudents, updateStudent } from "../controller/student.controller.js";

const studentRouter = Router()

studentRouter.get("/get_all_students", getAllStudents as RequestHandler)
studentRouter.post("/add_student", addStudent as RequestHandler)
studentRouter.put("/update_student", updateStudent as RequestHandler)
studentRouter.delete("/delete_student", deleteStudent as RequestHandler)

export default studentRouter

