import React from 'react'
import {Form, FormControl, Button, Nav, Navbar, InputGroup} from 'react-bootstrap'


export default function Bar(){
    return(
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/chat">
                <img
                 src="https://www.meme-arsenal.com/memes/221665d7a70c93bb28a8c91b375503d3.jpg"
                 width="100"
                 height="100"
                 className="d-inline-block align-top"
                 alt="Chat logo"
             />
             Chat-App
            </Navbar.Brand>
        </Navbar>
    )
}