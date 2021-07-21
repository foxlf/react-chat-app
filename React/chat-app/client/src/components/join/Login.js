import React, { useEffect, useRef, useState } from "react"
import { Button, Container, Form, FormControl, InputGroup } from "react-bootstrap"
import socket from "../../socket"
import { useLocalStorage } from "../../hooks/useLocalStorage"


export default function Login(){

    const [hid, setHid] = useState(true)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [corrected, setCorrected] = useState(false)
    console.log('type: ' + typeof(JSON.parse(window.localStorage.getItem('isLogined'))))
    useEffect(() => {
        console.log(corrected)
        socket.emit('user:auth', username, password)
        socket.on('cor_login', cor => {
            setCorrected(cor)
            console.log('cor: ' + cor)
        })
    }, [username, password])
    console.log('ch: ' + window.localStorage.getItem('isLogined'))
    function handleUsernameChange(e){
        setUsername(e.target.value)
    }

    function handlePassChange(e){
        setPassword(e.target.value)
    }

    return(
        <Form style={{width: '300px'}} className="d-flex">
            <h1>Вход</h1>
            {/* <p>{String(corrected)}</p> */}
            <Container>
                <FormControl className="mt-3 " placeholder="Enter username" onChange={e => handleUsernameChange(e)} />
                <FormControl placeholder="Enter password" onChange={e => {handlePassChange(e)}} />
                <Form.Group>
                {corrected ? 
                (
                <Form.Group>
                    <Form.Text style={{color: '#000000'}} hidden={hid} >
                        Incorrect username or pass
                    </Form.Text>
                    <Button onClick={() => {window.localStorage.setItem('username', JSON.stringify(username)); window.localStorage.setItem('isLogined', JSON.stringify(true))}} href='/chat' /*as={Link} to={'/chat'}*/ className="mt-3" variant="success">
                        Войти
                    </Button>
                    <Button href='/' /*as={Link} to={'/chat'}*/ className="mt-3" variant="danger">
                        Back
                    </Button>
                </Form.Group>
                ) : 
                (
                <Form.Group>
                    <Form.Text style={{color: '#000000'}} hidden={hid} >
                        Incorrect username or pass
                    </Form.Text>
                    <Button hidden={false} className="mt-3" onClick={() => {setHid(false)}}>
                        Войти
                    </Button>
                    <Button hidden={false} href='/' /*as={Link} to={'/chat'}*/ className="mt-3" variant="danger">
                        Back
                    </Button>
                </Form.Group> 
                )}
                </Form.Group>
                </Container>
        </Form>
    )
}