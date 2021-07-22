import {useEffect, useRef} from 'react'
import { ListGroup } from "react-bootstrap"
import {MessageItem} from './MessageItem'
import {v1 as uuid} from 'uuid'

export const MessageList = ({messages}) => {
    const messagesEndRef = useRef(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
          behavior: 'smooth'
        })
      }, [messages])

    const listStyles = {
        height: '30vh',
        border: '1px solid rgba(0,0,0,.4)',
        borderRadius: '4px',
        overflow: 'auto',
        backgroundColor: 'white'
      }
    return (
        <ListGroup variant='flush' style={listStyles}>
            {messages.map((msg) => (
                <MessageItem 
                    key={uuid()}
                    un={msg.username}
                    msg={msg.message}
                />
            ))}
            <span ref={messagesEndRef}></span>
        </ListGroup>
    )
}