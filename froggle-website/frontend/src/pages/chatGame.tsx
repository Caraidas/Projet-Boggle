import React from 'react';
import { ChatManager } from '../components/Chat/chat';
import "../css/styleWaitingRoom.css";

function substituteHost(s: string): string {
  return s.replace('myhost', document.location.host).replace('myprotocol', document.location.protocol === 'http:' ? 'ws:' : 'wss:');
}

function ChatGame(props: { primaryColor : string, setMusic: (music: any) => void }) {
  return (
    <div>
      <ChatManager primaryColor={props.primaryColor} setMusic={props.setMusic} socketUrl={substituteHost(process.env.REACT_APP_BACKEND_URL || 'ws://localhost:8090/chat')} />
    </div>
  );
}

export default ChatGame;