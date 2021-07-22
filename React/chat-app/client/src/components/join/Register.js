import React, { useEffect, useState } from "react"
import { Button, Form, FormControl} from "react-bootstrap"
import socket from "../../socket"
import { useLocalStorage } from "../../hooks/useLocalStorage"


export default function Register(){
    const [username, setUsername] = useState('')
    const [pass, setPass] = useState('')
    const [corrected, setCorrected] = useState(false)
    const [, setIsLogined] = useLocalStorage('isLogined')


    
    useEffect(() => {
        socket.emit('user:get', username)
        socket.on('cor', cor => {
            setCorrected(cor)
        })
        console.log(1);

    }, [username])
    function handlePassChange(e){
        setPass(e.target.value)
    }

    function handleUsernameChange(e){
        setUsername(e.target.value)
    }
    function sendUser(){
        socket.emit('user:add', username, pass)
    }
    console.log(username + 'probel' + typeof(username))
    return(
        <Form style={{}} className="d-flex">
            <Form.Group>
                <h1>Create a new account</h1>
                <FormControl style={{width: '200px'}} className="mt-3 " placeholder="Enter username" onChange={e => handleUsernameChange(e)}/>
                <FormControl style={{width: '200px'}} placeholder="Create password" onChange={e => handlePassChange(e)} />
                <Button variant='dark' href={'/'} className='mt-3'>
                    Back
                </Button>
                {username && pass ? 
                (corrected ? (<Button style={{marginLeft: '5px'}} href={'/chat/'} onClick={() => {sendUser(); setIsLogined(true); window.localStorage.setItem('username', JSON.stringify(username))}} className="mt-3" variant="dark">
                    Sign up
                </Button>) : (<p style={{color: 'red'}}>Username already taken</p>)) : <p style={{color: 'red'}}>Input username and pass</p>
                }
            </Form.Group>
        </Form>
    )
}