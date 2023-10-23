import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { selectAuth } from './slices/authSlice';
import './Chat.css';

const socket = io('http://localhost:3001');

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const { userAuth } = useSelector(selectAuth);

  useEffect(() => {
    socket.on('new message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off('new message'); // remove the event listener when the componenet unmounts
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    //emit the new message to the server
    socket.emit('new message', {
      username: userAuth.userName,
      message: newMessage,
    });
    setNewMessage('');
  };

  return (
    <div className="chat-container">
      <ul className="message-list">
        {messages.map((msg, idx) => (
          <li key={idx} className="message">
            <span className="username">{msg.username}</span>:{' '}
            <span className="message-text">{msg.message}</span>
          </li>
        ))}
      </ul>
      <form className="message-form" onSubmit={handleSubmit}>
        <input
          className="message-input"
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button className="send-button" type="submit">
          Send
        </button>
      </form>
    </div>

    // <div>
    //     <ul>
    //         {messages.map((msg, idx)=>(
    //             <li key={idx}>{msg.username}: {msg.message}</li>
    //         ))}
    //     </ul>

    //     <form onSubmit={handleSubmit}>
    //         <input
    //         type="text"
    //         value={newMessage}
    //         onChange={(e)=>setNewMessage(e.target.value)}
    //         placeholder="Type a message"
    //         />
    //         <button type="submit">Send</button>
    //     </form>
    // </div>
  );
};

export default Chat;
