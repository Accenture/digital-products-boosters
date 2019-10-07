import React, { useEffect, useState } from "react";
import classNames from "./class-names.module.css";

export const text = {
  start: "Start Listening 🔊",
  stop: "Stop Listening 🔇",
  message: "Message:",
  send: "Send Message"
};

export const webSocketUrl = "ws://localhost:8080";

const MessageListener = ({ setMessages }) => {
  useEffect(() => {
    const addMessage = message =>
      setMessages(previousMessages => [...previousMessages, message]);

    const webSocket = new WebSocket(webSocketUrl);
    webSocket.onmessage = event => {
      addMessage(JSON.parse(event.data));
    };

    return () => webSocket.close();
  }, [setMessages]);

  return null;
};

// You should not have to update this component
const MessagesBase = ({
  buttonText,
  isListening,
  messages,
  newMessage,
  onChange,
  onSubmit,
  setMessages,
  toggleIsListening
}) => (
  <div className={classNames.messages}>
    {isListening && <MessageListener setMessages={setMessages} />}
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="message">{text.message}</label>
        <input id="message" value={newMessage} onChange={onChange} />
      </div>
      <button>{text.send}</button>
    </form>
    <button onClick={toggleIsListening}>{buttonText}</button>
    <ul className={classNames.messageList}>
      {messages.map(({ text, timestamp }) => (
        <li key={timestamp}>{text}</li>
      ))}
    </ul>
  </div>
);

// You should not have to update this component
const Messages = () => {
  const [isListening, setIsListening] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const toggleIsListening = () =>
    setIsListening(previousState => !previousState);
  const buttonText = isListening ? text.stop : text.start;
  const onChange = event => setNewMessage(event.target.value);
  const onSubmit = event => {
    event.preventDefault();
    fetch("http://localhost:8080/messages", {
      body: newMessage,
      method: "POST"
    }).then(
      response => {
        response.ok && setNewMessage("");
      },
      () => alert("message sending failed! Is the server running?")
    );
  };

  const baseProps = {
    buttonText,
    isListening,
    messages,
    newMessage,
    onChange,
    onSubmit,
    setMessages,
    toggleIsListening
  };
  return <MessagesBase {...baseProps} />;
};

export default Messages;
