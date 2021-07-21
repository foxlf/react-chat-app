import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import socket from "../../socket"
import { useLocalStorage } from "../../hooks/useLocalStorage"



export default function Join(){
    // window.localStorage.clear()
    const [isLogined] = useLocalStorage('isLogined')
    console.log(isLogined)
    console.log(JSON.parse('123'))
    return(
        <Form className=''>
        <p>{typeof(isLogined)}</p>
        <p>{window.localStorage.getItem('username')}</p>
            {isLogined ? 
            <Button variant={"success"} href={'/chat/'}>Вход</Button> :
            <Button variant={"success"} href={'/auth/'}>Вход</Button>
            }
            <Button variant={"dark"} as={Link} to={'/reg/'}>Регистрация</Button>
        </Form>
            
            // {/* <Button as={Link} to={'/auth'} >Войти</Button>
            // <Button as={Link} to={'/reg'}>Зарегистрироваться</Button> */}
    )
}