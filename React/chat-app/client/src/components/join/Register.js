import React, { useEffect, useRef, useState } from "react"
import { Button, Form, FormControl, InputGroup } from "react-bootstrap"
import { Link } from "react-router-dom"
import socket from "../../socket"


export default function Register(){
    const [username, setUsername] = useState('')
    const [pass, setPass] = useState('')
    const [corrected, setCorrected] = useState(false)

    
    useEffect(() => {
        socket.emit('user:get', username)
        //console.log(corrected)
        socket.on('cor', cor => {
            setCorrected(cor)
        })

    })
    function handlePassChange(e){
        setPass(e.target.value)
    }

    function handleUsernameChange(e){
        setUsername(e.target.value)
    }
    function sendUser(){
        //console.log("h")
        socket.emit('user:add', username, pass)
    }
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
        <Form style={{width: 300}} className="d-flex">
                {/* <Form.Label>{username}</Form.Label>
                <Form.Label>{pass}</Form.Label> */}
            <Form.Group>
                <FormControl className="mt-3 " placeholder="Enter username" onChange={e => handleUsernameChange(e)}/>
                <FormControl placeholder="Enter password" onChange={e => handlePassChange(e)} />
                {corrected ? 
                (<Button as={Link} to={'/chat'} onClick={sendUser} className="mt-3" variant="outline-success">
                    Зарегистрироваться
                </Button>) : (<p>Username already taken</p>)
                }
            </Form.Group>
            {/* <input type='text' ></input>
            <input type='text' onChange={e => setPass(e.target.value)} value={pass} /> */}
        </Form>
    )
}