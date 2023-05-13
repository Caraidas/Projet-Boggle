import React from 'react';
import { ChatManager } from '../components/Chat/chat';

function substituteHost(s: string): string {
  return s.replace('myhost', document.location.host).replace('myprotocol', document.location.protocol === 'http:' ? 'ws:' : 'wss:');
}

function ChatGame() {
  return (
    <div className="App">
      <header className="App-header">
        <div>Demo Chatac frontend</div>
      </header>
      <main>
        <ChatManager socketUrl={substituteHost(process.env.REACT_APP_BACKEND_URL || 'ws://localhost:8090/chat')} />
      </main>
    </div>
  );
}

export default ChatGame;