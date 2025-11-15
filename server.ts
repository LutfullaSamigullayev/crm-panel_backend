import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import studentRouter from "./router/student.router.js"
import botRouter from "./router/bot.router.js"

const app = express()
dotenv.config()
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 3000

// router
app.use(studentRouter)
app.use(botRouter)

app.listen(PORT, () => {
    console.log("Server is running at: ", PORT);
})

