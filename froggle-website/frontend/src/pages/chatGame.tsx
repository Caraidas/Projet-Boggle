import React from 'react';
import { ChatManager } from '../components/Chat/chat';
import Header from '../components/Header';
import "../css/styleWaitingRoom.css";

function substituteHost(s: string): string {
  return s.replace('myhost', document.location.host).replace('myprotocol', document.location.protocol === 'http:' ? 'ws:' : 'wss:');
}

function ChatGame() {
  return (
    <div className="App">
      <Header text="Rejoindre une partie" />
      <div className="container">
        <div className="center-container">
          <ChatManager socketUrl={substituteHost(process.env.REACT_APP_BACKEND_URL || 'ws://localhost:8090/chat')} />
        </div>
      </div>
    </div>
  );
}

export default ChatGame;