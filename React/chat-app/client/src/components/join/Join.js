import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'



export default function Join(){
    return(
        <Form className="mt-3">
            <Button variant={"success"} as={Link} to={'/auth/'}>Вход</Button>
            <Button variant={"dark"} as={Link} to={'/reg/'}>Регистрация</Button>
        </Form>
            
            // {/* <Button as={Link} to={'/auth'} >Войти</Button>
            // <Button as={Link} to={'/reg'}>Зарегистрироваться</Button> */}
    )
}