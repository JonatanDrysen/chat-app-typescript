import React from 'react';
import { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import "../styles/Home.css"

import { SendButton, TextInput } from "../components/styled/InputForm.styled"
import { Author, Post, Text, TimeStamp } from "../components/styled/Posts.styled"
import MessageItem from "@my-chat-app-typescript/shared"

function HomePage() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<MessageItem[]>([])

  const sendMessage = (messageText:string) => {
    const newMessage = {
      _id: uuidv4(),
      text: messageText,
      author: "jonatandrysen", // TODO: add store username through JWT
      timeStamp: new Date().toLocaleString()
    }
    setMessages([...messages, newMessage])
    setMessage("")
  }

  return (
    <div className="Home">
      <header className="Home-header">
        My Chat App
      </header>

      <div className="Home-messageList">
        {messages.map(message => { // TODO: Incoming chat bubbles are grey & float left
          return (
            <Post key={message._id}>
              <Author>{message.author}</Author>
              <TimeStamp>{message.timeStamp}</TimeStamp>
              <Text>{message.text}</Text>
            </Post>
          )
        })}
      </div>

      <div className="Home-form">
        <TextInput 
          placeholder="type something"
          value={message} 
          onChange={(e) => setMessage(e.target.value)}
        />
        <SendButton onClick={(e) => sendMessage(message)}>
          Send
        </SendButton>
      </div>
    </div>
  );
}

export default HomePage;
