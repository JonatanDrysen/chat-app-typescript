import express, { Application, json, Request, Response } from "express"
import dotenv from "dotenv"
import cors from "cors"
import jwt from "jsonwebtoken"

import { setupDB } from "./models/chatModel"

dotenv.config()

const app: Application = express()
app.use(cors())
app.use(json())

const port: number = parseInt(process.env.SERVER_PORT || "3001")
const mongoURL = process.env.MONGO_URL || "mongodb://127.0.0.1/mychats"

app.listen(port, async function () {
    await setupDB(mongoURL)
    console.log(`Server online on port ${port}`)
})