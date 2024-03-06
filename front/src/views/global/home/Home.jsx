import React, { useState } from "react";
import "./style/Home.scss";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [commandPopupVisible, setCommandPopupVisible] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { user: "User", text: newMessage }]);
      setNewMessage("");
    }
  };

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    if (inputText.startsWith("/")) {
      setCommandPopupVisible(true);
    } else {
      setCommandPopupVisible(false);
    }
    setNewMessage(inputText);
  };

  const handleCommandSelection = (selectedCommand) => {
    setNewMessage(selectedCommand);
    setCommandPopupVisible(false);
  };

  return (
    <div className="page-container">
      <div className="content-container">
        <div className="chat-container">
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className="message">
                <strong>{message.user}:</strong> {message.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Saisir un message..."
              value={newMessage}
              onChange={handleInputChange}
            />
            <button onClick={handleSendMessage}>Envoyer</button>
            {commandPopupVisible && (
              <div className="command-popup">
                <div
                  onClick={() => handleCommandSelection("/Créer un channel")}
                >
                  /Créer un channel
                </div>
                <div onClick={() => handleCommandSelection("/Ajouter un ami")}>
                  /Ajouter un ami
                </div>
                <div
                  onClick={() =>
                    handleCommandSelection("/Rejoindre un channel")
                  }
                >
                  /Rejoindre un channel
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
