// import MessageItem from "@my-chat-app-typescript/shared"
import { model, Schema } from "mongoose"

const messageSchema = new Schema({
    text: String,
    author: String,
    timeStamp: String
})

// const MessageModel = model<MessageItem>("MessageItem", messageSchema)