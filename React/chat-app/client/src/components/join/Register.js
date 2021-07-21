import React, { useEffect, useState } from "react"
import { Button, Form, FormControl} from "react-bootstrap"
import { Link } from "react-router-dom"
import socket from "../../socket"
import { useLocalStorage } from "../../hooks/useLocalStorage"


export default function Register(){
    const [username, setUsername] = useState('')
    // const [username, setUsername] = useLocalStorage('username', '')
    const [pass, setPass] = useState('')
    const [corrected, setCorrected] = useState(false)
    const [, setIsLogined] = useLocalStorage('isLogined')


    
    useEffect(() => {
        socket.emit('user:get', username)
        //console.log(corrected)
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
        <Form style={{width: 300}} className="d-flex">
            <Form.Group>
                <h1>Регистрация</h1>
                <FormControl className="mt-3 " placeholder="Enter username" onChange={e => handleUsernameChange(e)}/>
                <FormControl placeholder="Create password" onChange={e => handlePassChange(e)} />
                {username && pass ? 
                (corrected ? (<Button href={'/chat/'} onClick={() => {sendUser(); setIsLogined(true); window.localStorage.setItem('username', JSON.stringify(username))}} className="mt-3" variant="success">
                    Зарегистрироваться
                </Button>) : (<p>Username already taken</p>)) : <p>Input username and pass</p>
                }
                <Button variant='danger' href={'/'} className='mt-3'>
                    Back
                </Button>
            </Form.Group>
        </Form>
    )
}