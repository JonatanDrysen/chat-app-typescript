import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import { MessageItem } from "@my-chat-app-typescript/shared"
import "../styles/Home.css"
import { TextInput } from "../components/styled/InputForm.styled"
import { Button } from "../components/styled/Button.styled"
import { Author, Post, Text, TimeStamp } from "../components/styled/Posts.styled"
import { Error } from "../components/styled/Error.styled"

axios.defaults.baseURL = `http://localhost:3001`

const fetchMessages = async (): Promise<MessageItem[]>  => {
  const response = await axios.get<MessageItem[]>("/mychats")
  return response.data
}

function HomePage() {
  const [message, setMessage] = useState<string>("")
  const [messageList, setMessageList] = useState<MessageItem[]>([])
  const [author, setAuthor] = useState<string>("")
  const [error, setError] = useState<string | undefined>()
  const navigate = useNavigate()

  const setAuthorName = () => {
    return setAuthor(localStorage.getItem("User") || "")
  }
  
  const handleLogout = () => {
    localStorage.removeItem("User")
    navigate("/login")
  }
  
  const sendMessage = async (message: string): Promise<void> => {
    const messageItem: MessageItem = {
      text: message,
      author: author,
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
      .then(setAuthorName)
      .catch((_error) => {
        setMessageList([])
        setError("Couldn't fetch any messages...")
      })
  }, [])

  return (
    <div className="Home">
        <header className="Home-header"> {/* TODO: Make header sticky */}
          <div className="Home-header-button">
            <Button onClick={(_e) => handleLogout()}>Log out</Button>
          </div>
          <div className="Home-header-text">          
            Logged in as {author}
          </div>
        </header>

      <div className="Home-messageList">
        {messageList ? messageList.map(message => { // TODO: Incoming chat bubbles are grey & float left
          return (
            <Post key={message.id}>
              <Author>{message.author}</Author>
              <TimeStamp>
                {message.timeStamp.toString().split("T")[0]}
                {" "}
                {message.timeStamp.toString().split("T")[1].substring(0, 8)}
              </TimeStamp>
              <Text>{message.text}</Text>
            </Post>
          )
        }) : error ? error : "Loading chat..."}
        <Error>{error}</Error>
      </div>

      <div className="Home-form">
        <TextInput 
          placeholder="type something"
          value={message} 
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button 
          onClick={(_e) => sendMessage(message)}
          disabled={!message}
        >
          Send
        </Button>
      </div>
    </div>
  );
}

export default HomePage

