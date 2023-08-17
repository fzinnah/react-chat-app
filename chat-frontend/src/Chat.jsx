import { useState, useEffect } from "react"
import io from 'socket.io-client'

const socket = io("http://localhost:3001")

const Chat = () => {
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    console.log(messages)
    useEffect(()=>{

        socket.on('new message', (data)=>{
            setMessages(prev=>[...prev, data])
        })

        return ()=>{
            socket.disconnect()
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        //emit the new message to the server
        socket.emit('new message', {username:'JohnDoe', message: newMessage})
        console.log(newMessage)
        setNewMessage('')
    }

  return (
    <div>
        <ul>
            {messages.map((msg, idx)=>(
                <li key={idx}>{msg.username}: {msg.message}</li>
            ))}
        </ul>

        <form onSubmit={handleSubmit}>
            <input 
            type="text"
            value={newMessage}
            onChange={(e)=>setNewMessage(e.target.value)} 
            placeholder="Type a message"
            />
            <button type="submit">Send</button>
        </form>
    </div>
  )
}

export default Chat