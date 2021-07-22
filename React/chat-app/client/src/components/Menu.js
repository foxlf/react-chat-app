import React, { useEffect, useRef, useState } from "react"
import Peer from 'peerjs'
import { Link } from "react-router-dom"
import { Button, Form, FormControl, FormLabel, InputGroup, Container } from "react-bootstrap"
import socket from "../socket"
import { v1 as uuid } from "uuid";
import { useLocalStorage } from "../hooks/useLocalStorage"



export default function Menu(){
    const [username] = useLocalStorage('username')
    const [isLogined] = useLocalStorage('isLogined')
    const id = uuid();
    const [roomId] = useLocalStorage('roomId',id)
    console.log('chat isLogined: ' + window.localStorage.getItem('isLogined'))
    return(
        
        <Form>
            <Container style={{}}>
                <h1>Menu
                    <FormLabel style={{marginLeft: '60%'}}>
                        Login: {username}
                    </FormLabel>
                </h1>
                <Button style={{marginBottom: '10px'}} variant='dark' href={'/'} onClick={() => {window.localStorage.clear()}}>
                    Exit
                </Button>
                <Button style={{marginLeft: '5px', marginBottom: '10px'}} variant='dark' href={`/chat/${id}`} >
                    Start
                </Button>
            </Container>
        </Form>
    )
}