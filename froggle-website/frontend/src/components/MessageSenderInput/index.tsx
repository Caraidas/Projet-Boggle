import React from 'react'
import { MessageInputText, MessageSenderButton, MessageSenderCont, MessageSenderImg } from './MessageSenderInput';
import envoyer from "../../images/envoyer.png";

const MessageSenderInput = (props: {onMessageWritten: (content: string) => void}) => {
    const [content, setContent] = React.useState("")

    return (

        <>
            <MessageSenderCont>
                <MessageInputText type="text" value={content} onChange={event => setContent(event.target.value)} />
                <MessageSenderButton onClick={() => {props.onMessageWritten(content); setContent('')}}>
                    <MessageSenderImg src={envoyer} />
                </MessageSenderButton>
            </MessageSenderCont>
        </>

        // <div className="MessageSender">
        //     <input type="text" value={content} style={{flex: 1}} onChange={event => setContent(event.target.value)} />
        //     <button onClick={() => {props.onMessageWritten(content); setContent('')}}>Send</button>
        // </div>
    );
}

export default MessageSenderInput
