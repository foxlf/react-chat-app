import React from 'react'
import {Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useLocalStorage } from "../../hooks/useLocalStorage"



export default function Join(){
    //window.localStorage.clear()
    const [isLogined] = useLocalStorage('isLogined', false)
    return(
        <Form className=''>
            <h1>Web-chat-roulette</h1>
            <Button style={{marginBottom: '10px'}} className="mt-3" variant={"dark"} as={Link} to={'/reg/'}>Sign up</Button>
            {isLogined ? 
                <Button className="mt-3" style={{marginLeft: '5px', marginBottom: '10px'}} variant={"dark"} href={'/chat/'}>Sign in</Button> :
                <Button className="mt-3" style={{marginLeft: '5px', marginBottom: '10px'}} variant={"dark"} href={'/auth/'}>Sign in</Button>
            }     
        </Form>
    )
}