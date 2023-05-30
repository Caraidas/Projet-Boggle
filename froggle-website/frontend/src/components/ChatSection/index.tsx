import React from 'react'
import { ChatMessagesDisplayer, Message, MessageSender } from '../Chat/chat'
import { ChatContainer, ChatToggler, QuitButton } from './ChatSectionElements';
import soundIcon from "./../../images/chat.png";
import Messages from '../Messages';
import MessageSenderInput from '../MessageSenderInput';

const ChatSection = (props: {messages: Message[], active: boolean, onMessageWritten: (content: string) => void,onLeaving: () => void, onClosing: () => void, grid: string, setMusic: (music: any) => void, solvedWords : any}) => {
    const [isChatToggled, setChatToggle] = React.useState(false);

    function chatToggleHandler() {
        if (!isChatToggled) {
            setChatToggle(true);
        } else {
            setChatToggle(false)
        }
    }
    function handleLeaving() {
        props.onLeaving();
        props.onClosing();
    }

    return (
        <>
            <ChatToggler toggled={isChatToggled} src={soundIcon} onClick={() => chatToggleHandler()} />
            <ChatContainer toggled={isChatToggled}>
                <Messages messages={props.messages} />
                {props.active && <MessageSenderInput onMessageWritten={props.onMessageWritten} />}
                <QuitButton onClick={() => handleLeaving()}>Quitter</QuitButton>
            </ChatContainer>
        </>
    );
}

export default ChatSection
