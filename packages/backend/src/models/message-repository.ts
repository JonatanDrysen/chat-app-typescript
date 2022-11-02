import { MessageItem } from "@my-chat-app-typescript/shared"
import { model, Schema } from "mongoose"

const MessageSchema = new Schema({
    text: String,
    author: String,
    timeStamp: Date
})

const MessageModel = model<MessageItem>("MessageItem", MessageSchema)

export const loadMessageList = async (): Promise<MessageItem[]> => {
    return MessageModel.find({}).exec()
}

export const saveNewMessage = async (messageItem: MessageItem): Promise<void> => {
    const newMessageModel = new MessageModel(messageItem)
    newMessageModel.save()
}