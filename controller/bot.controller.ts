import type { NextFunction, Request, Response } from "express";
import TelegramBot from "node-telegram-bot-api"
import { Bot } from "../model/bot.model.js";
import { Op } from "sequelize";

Bot.sync({force: false})

const bot = new TelegramBot(process.env.BOT_TOKEN as string, {polling: true})

bot.onText(/\/start/, (msg) => {
    const chatId: number = msg.chat.id
    const first_name: string = msg.from?.first_name as string

    bot.sendMessage(chatId, `Assalomu aleykum ${first_name} murojatingizni qoldiring!`)
})

bot.on("message", async (msg) => {
    const chatId: number = msg.chat.id
    const first_name: string = msg.from?.first_name as string
if(msg.text) {
   if(msg.text?.length < 5) {
       return bot.sendMessage(chatId, `${first_name} 5 ta belgidan ko'proq matn yozing`)
    } else if(msg.text !== '/start') {
        await Bot.create({first_name, message: msg.text})
        bot.sendMessage(chatId, "Murojatingiz yetkazildi")
    }
}
})

export const getMessagesFromToday = async (req:Request, res:Response, next: NextFunction): Promise<Response | void> => {
    try {
        const currentData = new Date()
        currentData.setUTCHours(0,0,0,0)

        const messages = await Bot.findAll({where: {createdAt: {[Op.gte]: currentData}}})

        res.status(200).json(messages)
    } catch (error: any) {
        next(error)
    }
}

export const getMessagesFromLastTenDays = async (req:Request, res:Response, next: NextFunction): Promise<Response | void> => {
    try {
        const currentData = new Date()
        currentData.setDate(currentData.getDate() - 10)

        const messages = await Bot.findAll({where: {createdAt: {[Op.gte]: currentData}}})

        res.status(200).json(messages)
    } catch (error: any) {
        next(error)
    }
}
