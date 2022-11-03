import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import { MessageItem } from "@my-chat-app-typescript/shared"
import "../styles/Home.css"
import { Author, Post, Text, TimeStamp } from "../components/styled/Posts.styled"
import { TextInput } from "../components/styled/InputForm.styled"
import { Button } from "../components/styled/Button.styled"
import { Error } from "../components/styled/Error.styled"

axios.defaults.baseURL = process.env.REACT_APP_CHAT_API || "http://localhost:3001"

const fetchMessages = async (): Promise<MessageItem[]>  => {
  const response = await axios.get<MessageItem[]>("/mychats")
  return response.data
}

function HomePage() {
  const navigate = useNavigate()
  const endMessagesRef = useRef<null | HTMLDivElement>(null)
  const [messageList, setMessageList] = useState<MessageItem[]>([])
  const [message, setMessage] = useState<string>("")
  const [author, setAuthor] = useState<string>("")
  const [error, setError] = useState<string | undefined>()

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
    const checkedUser = localStorage.getItem("User")
    if (checkedUser === "" || checkedUser === null) {
      setMessageList([])
      navigate("/login")
    }
  }, [navigate])

  useEffect(() => {
    fetchMessages()
      .then(setMessageList)
      .then(setAuthorName)
      .catch((_err) => {
        setMessageList([])
        setError("Couldn't fetch any messages...")
      })

    const interval = setInterval(() => {
      fetchMessages()
        .then(setMessageList)
        .catch((_err) => {
          setMessageList([])
          setError("Couldn't fetch any messages...")
        })
    }, 2000)
    return clearInterval(interval)
  }, [])

  useEffect(() => {
    endMessagesRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messageList])

  return (
    <div className="Home">
        <header className="Home-header">
          <div className="Home-header-button">
            <Button onClick={(_e) => handleLogout()}>Log out</Button>
          </div>
          <div className="Home-header-text">          
            Logged in as {author}
          </div>
        </header>

      <div className="Home-messageList">
        {messageList ? messageList.map(message => {
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
        <div ref={endMessagesRef}></div>
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
  )
}

export default HomePage
