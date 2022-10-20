import { useEffect, useState } from "react"
import axios from "axios"

import MessageItem from "@my-chat-app-typescript/shared"
import "../styles/Home.css"
import { SendButton, TextInput } from "../components/styled/InputForm.styled"
import { Author, Post, Text, TimeStamp } from "../components/styled/Posts.styled"

axios.defaults.baseURL = `http://localhost:3001`

const fetchMessages = async (): Promise<MessageItem[]>  => {
  const response = await axios.get<MessageItem[]>("/mychats")
  return response.data
}

function HomePage() {
  const [message, setMessage] = useState<string>("")
  const [messageList, setMessageList] = useState<MessageItem[]>([])
  const [error, setError] = useState<string | undefined>()
  
  const sendMessage = async (message: string): Promise<void> => {
    const messageItem: MessageItem = {
      text: message,
      author: "messageAuthor",
      timeStamp: new Date() 
    }

    try {
      await axios.post("/mychats", messageItem)
      const response = await axios.get<MessageItem[]>("/mychats")
      setMessageList(response.data)
    } catch (err) {
      setMessageList([])
      setError("Tried retrieving chat history but caught error instead...")
    } finally {
      setMessage("")
    }
  }

  useEffect(() => {
    fetchMessages()
      .then(setMessageList)
      .catch((_error) => {
        setMessageList([])
        setError("fetchMessages() couldn't fetch any messages...")
      })
  }, [])

  return (
    <div className="Home">
      <header className="Home-header">
        My Chat App
      </header>

      <div className="Home-messageList">
        {messageList ? messageList.map(message => { // TODO: Incoming chat bubbles are grey & float left
          return (
            <Post key={message.id}>
              <Author>{message.author}</Author>
              <TimeStamp>{message.timeStamp.toString()}</TimeStamp>
              <Text>{message.text}</Text>
            </Post>
          )
        }) : error ? error : "Loading chat..."}
      </div>

      <div className="Home-form">
        <TextInput 
          placeholder="type something"
          value={message} 
          onChange={(e) => setMessage(e.target.value)}
        />
        <SendButton onClick={(_e) => sendMessage(message)}>
          Send
        </SendButton>
      </div>
    </div>
  );
}

export default HomePage

