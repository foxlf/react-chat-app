
import React, { useEffect, useRef, useState } from "react"
import { Button, Form, FormControl, InputGroup } from "react-bootstrap"
import { Link } from "react-router-dom"
import socket from "../../socket"

// const SERVER_URL = 'http://localhost:4000'


export default function Login(){

    // const [username, setUsername] = useState('')
    // const [pass, setPass] = useState('')

    

    // function handlePassChange(e){
    //     setPass(e.target.value)
    // }
    // function handleUsernameChange(e){
    //     setUsername(e.target.value)
    // }
    // function sendMessage(){
    //     console.log("h")
    //     socket.emit('message:get', username, pass)
    // }
    // useEffect(() => {
    //     console.log("h")
    //     socket.emit('message:get', username)
    // })
    // const socketRef = useRef(null)
	// useEffect(() => {
	// 	socketRef.current = io(SERVER_URL)
	// 	return () => {
	// 		socketRef.current.disconnect()
	// 	}
	// }, [])
    return(
        <p>Вход</p>
        // <Form style={{width: 300}} classname="d-flex">
        //         {/* <Form.Label>{username}</Form.Label>
        //         <Form.Label>{pass}</Form.Label> */}
        //     <Form.Group>
        //         <FormControl classname="mt-3 " placeholder="Enter username" onChange={e => handleUsernameChange(e)}/>
        //         <FormControl placeholder="Enter password" onChange={e => handlePassChange(e)} />
        //     </Form.Group>
        //     {/* <input type='text' ></input>
        //     <input type='text' onChange={e => setPass(e.target.value)} value={pass} /> */}
        //     <Button as={Link} to={'/chat'} onClick={sendMessage} classname="mt-3" variant="outline-success">
        //         Войти
        //     </Button>
        // </Form>
    )
}