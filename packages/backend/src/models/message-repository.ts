import MessageItem from "@my-chat-app-typescript/shared"
import { model, Schema } from "mongoose"

const messageSchema = new Schema({
    text: String,
    author: String,
    timeStamp: Date
})

const MessageModel = model<MessageItem>("MessageItem", messageSchema)

export const loadMessageList = async (): Promise<MessageItem[]> => {
    return MessageModel.find({}).exec()
}

export const saveNewMessage = async (messageItem: MessageItem): Promise<void> => {
    const newModel = new MessageModel(messageItem)
    newModel.save()
}