import React from 'react'
import { ChatMessageDisplayer, Message } from '../Chat/chat'
import { MessagesContainer } from './MessagesElements'
import MessageDisp from '../MessageDisp'

const Messages = (props: {messages: Message[]}) => {
  return (
    <>
    {/* <ol className="ChatMessagesDisplayer">
        {props.messages.map((x, i) => <li key={i}><ChatMessageDisplayer message={x} /></li>)}
    </ol> */}
        <MessagesContainer>
            {props.messages.map((x, i) => <MessageDisp key={(i)} message={x} /> )}
        </MessagesContainer>
    </>
  )
}

export default Messages
