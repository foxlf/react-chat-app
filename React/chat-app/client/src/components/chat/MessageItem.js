import { ListGroup, Card } from "react-bootstrap"
import { useLocalStorage } from "../../hooks/useLocalStorage"


export const MessageItem = ({un, msg}) => {
    const [username] = useLocalStorage('username')
    const check = (un == username)
    return (
        <ListGroup.Item
        className={`d-flex ${check ? 'justify-content-end' : ''}`}
        >
            <Card
            bg={`${check ? 'dark' : 'secondary'}`}
            text='light'
            style={{ width: '60%', height: '50px' }}
            >
                <Card.Body className='d-flex justify-content-between align-items-center'>
                    <Card.Text>
                        {msg}
                    </Card.Text>
                </Card.Body>
            </Card>
        </ListGroup.Item>
    )
}