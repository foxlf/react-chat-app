import { Form } from "react-bootstrap"

export const Video = ({curVideoRef, remVideoRef}) => {

    return(
        <Form.Group>
            <video style={{backgroundColor: '#000000',}} width="500" height="375" ref={curVideoRef} />
            <video style={{backgroundColor: '#000000', marginLeft: '5%'}} width="500" height="375" ref={remVideoRef} />
        </Form.Group>
    )
}