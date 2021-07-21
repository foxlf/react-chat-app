import React, { useEffect, useRef, useState } from "react"
import Peer from 'peerjs'
import { Link } from "react-router-dom"
import { Button, Form, FormControl, FormLabel, InputGroup } from "react-bootstrap"
import socket from "../socket"
import { v1 as uuid } from "uuid";
import {useLocalStorage} from "../hooks/useLocalStorage"
import {useP2P} from '../hooks/useP2P'
import { Video } from './chat/Video'

export default function Rooms(){
    const curVideoRef = useRef(null)
    const remVideoRef = useRef(null)
    const {peerId, variant, remUsername, userId, call, disc} = useP2P(curVideoRef, remVideoRef)
    const [remotePeerIdValue, setRemotePeerIdValue] = useState('')
    const [username] = useLocalStorage('username')

    useEffect(() => {
            console.log('hey')
            call(curVideoRef, remVideoRef)
    }, [])

    const checkVar = (variant) => {
        console.log('variant3: ' + variant)
        if(variant == 1)
            return <p>stopped</p>
        else
            return

    }
    // const [username] = useLocalStorage('username')
    // const [peerId, setPeerId] = useState('');
    // const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
    // const remoteVideoRef = useRef(null);
    // const currentUserVideoRef = useRef(null);
    // const peerInstance = useRef(null);
    // const [msg, setMsg] = useState('h')
    // const [sndMsg, setSndMsg] = useState('')

    // useEffect(() => {
    //     const uid = uuid()
    //     const peer = new Peer(uid);
    //     console.log(555)
    //     peer.on('open', (id) => {
    //         setPeerId(id)
    //         console.log(id)
    //     });
    //     //receive connection
    //     peer.on('connection', conn => {
    //         conn.on('open', () => {
    //             console.log('gets')
    //             conn.on('data', data => {
    //                 console.log('Incoming data' + data);
    //                 setMsg(data)
    //             });
    //             conn.send('receive');
    //         })
    //     })
    //     //answer call
    //     peer.on('call', (call) => {
    //         var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
      
    //         getUserMedia({ video: true, audio: true }, (mediaStream) => {
    //             console.log(123)
    //             currentUserVideoRef.current.srcObject = mediaStream;
    //             currentUserVideoRef.current.play();
    //             //return media
    //             call.answer(mediaStream)
    //             call.on('stream', function(remoteStream) {
    //                 remoteVideoRef.current.srcObject = remoteStream
    //                 remoteVideoRef.current.play();
    //           });
    //         });
    //       })
    //     peer.disconnect()
    //       peerInstance.current = peer;
    //       console.log(peerInstance.current)
    // }, [])

    // const call = (remotePeerId) => {
    //     console.log('hello')
    //     var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    //     console.log(getUserMedia)
    //     getUserMedia({ video: true, audio: true }, (mediaStream) => {
    
    //         currentUserVideoRef.current.srcObject = mediaStream;
    //         currentUserVideoRef.current.play();
    //         //start call
    //         const call = peerInstance.current.call(remotePeerId, mediaStream)
    //         console.log('zvon')
    //         call.on('stream', (remoteStream) => {
    //             remoteVideoRef.current.srcObject = remoteStream
    //             remoteVideoRef.current.play();
    //       });
    //     });
    //   }
    

    // const stop = () => {
    //     const peer = peerInstance.current
    //     peer.disconnect()
    // }

    // const sen = (remotePeerId) => {
    //     console.log('najal')
    //     const conn = peerInstance.current.connect(remotePeerId)
    //     console.log(conn)
    //     conn.on('open', () => {
    //         console.log('send')
    //         conn.on('data', data => {
    //             //console.log('data: ' + data)
                
    //             //setMsg('hi')
    //         });
    //         conn.send(sndMsg);
            
    //     })

    // }

    return(
        <Form>
            <Button onClick={() => disc()} variant='danger' as={Link} to={'/chat'}>
                Back to menu
            </Button>
            <p>Your id: {userId}</p>
            {/* <p>His id: {remotePeerIdValue}</p> */}
            <Form.Group>
                {/* <FormControl value={remotePeerIdValue} onChange={e => setRemotePeerIdValue(e.target.value)} /> */}
                {/* <Button onClick={() => call(curVideoRef, remVideoRef)}>Call</Button> */}
                <Button onClick={() => disc()}>Stop</Button>
                <Button href={`/chat/${uuid()}`} onClick={() => {/*rec(curVideoRef, remVideoRef)*/}}>Next</Button>
            </Form.Group>
            {/* {!peerId ? <p>no free users</p> : <p>pick rec</p>}
            {variant ? <p>stopped cal</p> : <p></p>} */}
            {checkVar(variant)}
            <Video curVideoRef={curVideoRef} remVideoRef={remVideoRef}/>
            {/* <Form.Group>
                <video style={{backgroundColor: '#000000',}} width="320" height="240" ref={curVideoRef} />
                <video style={{backgroundColor: '#000000', marginLeft: '40%'}} width="320" height="240" ref={remVideoRef} />
            </Form.Group> */}
            <Form.Group>
                <FormLabel>{username}</FormLabel>
                <FormLabel style={{marginLeft: '70%'}}>{remUsername}</FormLabel>
            </Form.Group>
            <Form.Group>

            </Form.Group>
        </Form>
    )
}


//     return(
//         <Form>
//         <p>{msg}</p>
//             <Button variant='danger' as={Link} to={'/chat'}>
//                 Back to menu
//             </Button>
//             <Button onClick={() => sen(remotePeerIdValue)}>
//                 Send
//             </Button>
//             <p>Your id: {peerId}</p>
//             <FormControl  onChange={e => setSndMsg(e.target.value)}/>
//             {/* <p>His id: {remotePeerIdValue}</p> */}
//             <p>Chat</p>
//             <Form.Group>
//                 <FormControl value={remotePeerIdValue} onChange={e => setRemotePeerIdValue(e.target.value)} />
//                 <Button onClick={() => call(remotePeerIdValue)}>Call</Button>
//                 <Button onClick={() => stop()}>Stop</Button>
//             </Form.Group>
//             <Form.Group>
//                 <video style={{backgroundColor: '#000000',}} width="320" height="240" ref={currentUserVideoRef} />
//                 <video style={{backgroundColor: '#000000', marginLeft: '40%'}} width="320" height="240" ref={remoteVideoRef} />
//             </Form.Group>
//             <Form.Group>
//                 <FormLabel>{username}</FormLabel>
//                 <FormLabel style={{marginLeft: '70%'}}>{username}</FormLabel>
//             </Form.Group>
//             <Form.Group>

//             </Form.Group>
//         </Form>
//     )
// }