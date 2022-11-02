import { model, Schema } from "mongoose"
import { MessageItem } from "@my-chat-app-typescript/shared"

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
