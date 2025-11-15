import { Router, type RequestHandler } from "express";
import { getAllMessages } from "../controller/bot.controller.js";

const botRouter = Router()

botRouter.get("/get_all_students", getAllMessages as RequestHandler)

export default botRouter

