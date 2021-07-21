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
            <Container style={{ maxWidth: '100%', height: '100%', backgroundColor: '#ff8800'}}>
                <Form.Group >
                {/* // className='mt-2' */}
                {/* // style={{ maxWidth: '320px', margin: '0 auto' }} */}
                    <Form.Group>
                        <FormLabel>
                            Menu
                        </FormLabel>
                        <FormLabel style={{paddingLeft: '90%'}}>
                            {username}
                        </FormLabel>
                    </Form.Group>
                    <FormLabel>
                        {String(isLogined)}
                    </FormLabel>
                </Form.Group>
                <Button variant='success' href={`/chat/${id}`} >
                    Найти
                </Button>
                <Button variant='danger' href={'/'} onClick={() => {window.localStorage.clear()}}>
                    Exit
                </Button>
            </Container>
        </Form>
    )
}