import express, { Application, json, Request, Response } from "express"
import crypto from "crypto"
import dotenv from "dotenv"
import cors from "cors"

import { MessageItem } from "@my-chat-app-typescript/shared"
import { loadMessageList, saveNewMessage } from "./models/message-repository"
import { setupDB } from "./models/db"

dotenv.config()

const app: Application = express()
app.use(cors())
app.use(json())
 
const port: number = parseInt(process.env.SERVER_PORT || "3001")
const mongoURL = process.env.MONGO_URL || "mongodb://127.0.0.1/mychats"

app.get("/mychats", async (_req: Request, res: Response<MessageItem[]>) => {
    const messageItems = await loadMessageList()
    res.send(messageItems)
})

app.post("/mychats", async (req: Request<MessageItem>, res: Response<MessageItem[]>) => {
    const messageItem = req.body
    messageItem.id = crypto.randomUUID()
    await saveNewMessage(messageItem)
    const newMessageList = await loadMessageList()
    res.send(newMessageList)
})

app.listen(port, async function () {
    await setupDB(mongoURL)
    console.log(`Server online on port ${port}`)
})
