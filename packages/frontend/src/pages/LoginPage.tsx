import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { TextInput } from '../components/styled/InputForm.styled'
import { Button } from '../components/styled/Button.styled'
import { Error } from "../components/styled/Error.styled"
import "../styles/Login.css"

function LoginPage() {
    const [username, setUsername] = useState("")
    const [error, setError] = useState<string | undefined>()
    const navigate = useNavigate()
    
    const handleLogin= async (username: string) => {
        if (username.length < 3 || username.length > 20) {
            setError("Username must be between 3 and 20 characters long!")
        } else {
            setError("")
            try {
                localStorage.setItem("User", username)
                console.log("got stored username:", localStorage.getItem("User"))
                navigate("/mychats")
            } catch (err) {
                console.error("could not get stored username")
                setError("Something went wrong!")
            }
        }
    }

    return (
        <div className="Login">
            <header className="Login-header">Whats your name?</header>

            <Error>{error}</Error>

            <TextInput
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <Button onClick={(_e) => handleLogin(username)}>Go!</Button>
        </div>
    )
}

export default LoginPage