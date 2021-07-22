import {useState} from 'react'
import { Form, FormControl, Button } from "react-bootstrap"


export const Text = ({senMsg}) => {
    const [msg, setMsg] = useState('')
    
    const handleSendMsg = (e) => {
        e.preventDefault()
        const trim = msg.trim()
        if (trim) {
            senMsg(msg)
            setMsg('')
        }
    }
    return (
        <Form>
            <Form.Group className='d-flex'>
                <FormControl
                value={msg}
                onChange={(e) => {setMsg(e.target.value)}}
                type='text'
                placeholder='Enter the message'
                />
                <Button variant='dark' onClick={handleSendMsg}>Send</Button>
            </Form.Group>
        </Form>
    )
} 