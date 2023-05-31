import React from 'react'
import { Message, MessageSender } from '../Chat/chat'
import { MessageDate, MessageContent, MessageCont, MessageName, MessageInfo } from './MessageDispElements'

const MessageDisp = (props: {message: Message, primaryColor : string}) => {
  const date = React.useMemo(() => new Date(props.message.timestamp).toLocaleTimeString(), [props.message.timestamp])
  
  return (
    <>
      <MessageCont style={{background: props.primaryColor}}>
        <MessageInfo>
          <MessageName>{props.message.sender}</MessageName>
          <MessageDate>{date}</MessageDate>
        </MessageInfo>
        <MessageContent>{props.message.content}</MessageContent>
      </MessageCont>
    </>
  )
}

export default MessageDisp
