import { useState, useRef, useEffect } from 'react';

const ChatApp = () => {
  // Listen for messages

  const socket = new WebSocket('ws://localhost:3000');

  socket.addEventListener('message', ({ data }) => {
    setMessages((prevMessages) => [...prevMessages, data]);
    console.log('websocket message:', data);
  });

  const msgRef = useRef(null);

  const [formData, setFormData] = useState({
    msg: '',
    test: '',
  });
  const [messages, setMessages] = useState([]);

  const sendMessage = (e) => {
    e.preventDefault();
    const { msg } = formData;

    if (msg) {
      socket.send(msg);
      msgRef.current.value = '';
    }
    if (msgRef.current) {
      msgRef.current.focus();
    }

    console.log(msg);
  };

  return (
    <>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="your message"
          ref={msgRef}
          onChange={(e) => {
            setFormData({ ...formData, msg: e.target.value });
          }}
        />
        <button>Send</button>
      </form>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </>
  );
};

export default ChatApp;
