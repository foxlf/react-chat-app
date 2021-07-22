import {useEffect, useRef, useState} from 'react'
import {useLocalStorage} from './useLocalStorage'
import Peer from 'peerjs'
import {v1 as uuid} from 'uuid'
import socket from '../socket/index'

export const useP2P = (curVideoRef, remVideoRef) => {
    const [username] = useLocalStorage('username')
    const [remUsername, setRemUsername] = useState('')
    const [userId] = useLocalStorage('id', uuid())
    const [variant, setVariant] = useState(0)
    const [messages, setMessages] = useState([])
    const peerI = useRef(null)
    const [remPeerId, setRemPeerId] = useState('')
    const ms1 = useRef(null)
    const ms2 = useRef(null)
    
    useEffect(() => {
        socket.emit('id:add', username, userId)
        //! socket.emit('user:online', username)
        // socket.on('getId', peerId => {
        //     console.log('pp:' + peerId)
        //     setRemPeerId(peerId)
            
            const peer = new Peer(userId)
            peer.on('open', id => {
                console.log('id:' + id)
                
            })

            

            peer.on('call', call => {
                console.log('variant1: ' + variant)
                //socket.emit('user:online', username, userId)
                socket.emit('msg:snd', username)
                socket.on('getRemId', (remId, remUn) => {
                    console.log('remun: ' + remUn)
                    console.log('remid: ' + remId)
                    if(remId){
                        setRemPeerId(remId)
                        setRemUsername(remUn)
                    }
                })
                socket.emit('user:leave', username)
                console.log('mne pozvonili')
                const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
                getUserMedia({ video: true, audio: true}, mediaStream => {
                    ms1.current = mediaStream
                    curVideoRef.current.srcObject = mediaStream
                    curVideoRef.current.play()
                    call.answer(mediaStream)
                    call.on('stream', remoteStream => {
                        remVideoRef.current.srcObject = remoteStream
                        remVideoRef.current.play()
                    })
                })
            })

            peer.on('connection', conn => {
                conn.on('open', () => {
                    console.log('gets')
                    conn.on('data', data => {
                        console.log('Incoming data' + data);
                        console.log('json: ' + JSON.stringify(data))
                        //setMessages([...messages, {username: remUsername, message: data}])
                        setMessages(data)
                        console.log('json: ' + JSON.stringify(messages))
                    });
                })
            })

            peer.on('disconnected', () => {
                socket.emit('user:leave', username)
                console.log('discted')
                //Ms.stop()
                // remVideoRef.current.stop()
            })
            console.log('id2' + remPeerId)
            peerI.current = peer
    // })
        // setPeerInstance(peer)

    }, [])   

    const call = (curVideoRef, remVideoRef) => {
        socket.emit('id:add', username, userId)
        socket.emit('user:online', username, userId)
        socket.on('getId', (peerId, remUn) => {
            console.log('pp:' + peerId)
            setRemPeerId(peerId)
            console.log('hello')
            if(!peerId){
                return
            }
            socket.emit('user:leave', username, peerId)
            setRemUsername(remUn)
            setVariant(0)
            const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            getUserMedia({ video: true, audio: true }, (mediaStream) => {
                ms2.current = mediaStream
                curVideoRef.current.srcObject = mediaStream;
                curVideoRef.current.play();
                //start call
                const call = peerI.current.call(peerId, mediaStream)
                console.log('zvon')
                call.on('stream', (remoteStream) => {
                    remVideoRef.current.srcObject = remoteStream
                    remVideoRef.current.play();
                    console.log('test2')
                });
            });
    })
      }
    
      const disc = () => {
          peerI.current.destroy()
        setVariant(1)
        if(ms1.current)
            ms1.current.getTracks().forEach(track => {
                track.stop()
            })
        if(ms2.current)
            ms2.current.getTracks().forEach(track => {
                track.stop()
            })
        console.log('pik')
        socket.emit('user:leave', username)
        
      }

    const senMsg = (msg) => {
        console.log('name: ' + remUsername)
        console.log('peerId: ' + remPeerId)
        const conn = peerI.current.connect(remPeerId)
        conn.on('open', () => {
            console.log('send')
            // conn.on('data', data => {
            //     //console.log('data: ' + data)
                
            //     //setMsg('hi')
            // });
            setMessages([...messages, {username: username, message: msg}])
            conn.send([...messages, {username: username, message: msg}]);
            console.log('json: ' + JSON.stringify(messages))
            
        })

    }
    //   const rec = (curVideoRef, remVideoRef) => {
          
    //     setCh(uuid())
    //     if(variant == 1){
    //         peerI.current.destroy()
    //         if(ms1.current)
    //             ms1.current.getTracks().forEach(track => {
    //                 track.stop()
    //             })
    //         if(ms2.current)
    //             ms2.current.getTracks().forEach(track => {
    //                 track.stop()
    //             })
    //         console.log('pik')
    //     //socket.emit('user:leave', username)
        
    //     }
    //     // if(ms1.current)
    //     //     ms1.current.getTracks().forEach(track => {
    //     //         track.stop()
    //     //     })
    //     // if(ms2.current)
    //     //     ms2.current.getTracks().forEach(track => {
    //     //         track.stop()
    //     //     })  
    //       socket.emit('id:add', username, userId)
          
    //       call(curVideoRef, remVideoRef)
    //   }
    
    return {messages, remPeerId, variant, remUsername, userId, call, disc, senMsg}
}