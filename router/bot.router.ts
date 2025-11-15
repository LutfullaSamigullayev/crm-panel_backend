import { Router, type RequestHandler } from "express";
import { getMessagesFromLastTenDays, getMessagesFromToday } from "../controller/bot.controller.js";

const botRouter = Router()

botRouter.get("/get_messages_from_today", getMessagesFromToday as RequestHandler)
botRouter.get("/get_messages_from_last_ten_days", getMessagesFromLastTenDays as RequestHandler)


export default botRouter

