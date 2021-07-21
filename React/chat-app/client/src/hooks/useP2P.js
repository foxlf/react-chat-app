import {useEffect, useRef, useState} from 'react'
import {useLocalStorage} from './useLocalStorage'
import Peer from 'peerjs'
import {v1 as uuid} from 'uuid'
import socket from '../socket/index'

export const useP2P = (curVideoRef, remVideoRef) => {
    const [username] = useLocalStorage('username')
    const [remUsername, setRemUsername] = useState('')
    const [messages, setMessages] = useState([])
    const [userId] = useLocalStorage('id', uuid())
    const [variant, setVariant] = useState(0)
    const peerI = useRef(null)
    const [ch, setCh] = useState('')
    const [isOnline, setIsOnline] = useState(false)
    const [remPeerId, setRemPeerId] = useState('')
    const [roomId] = useLocalStorage('roomId')
    const ms1 = useRef(null)
    const ms2 = useRef(null)
    
    useEffect(() => {
        console.log('test')
        socket.emit('id:add', username, userId)
        // socket.emit('user:online', username)
        // socket.on('getId', peerId => {
        //     console.log('pp:' + peerId)
        //     setRemPeerId(peerId)
            
            const peer = new Peer(userId)
            peer.on('open', id => {
                console.log('id:' + id)
                
            })
            // if (!peerId){
            //     peerI.current = peer
            //     return {remPeerId}
            // }
            // else {
            
            peer.on('call', call => {
                
                console.log('variant1: ' + variant)
                socket.emit('user:online', username, userId)
                socket.on('getUn', (remUn) => {
                    console.log('name' + remUn)
                    setRemUsername(remUn)
                })
                socket.emit('user:leave', username, )
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
                    call.on('close', () => {
                        console.log('close3')
                    })
                })
            })
            peer.on('disconnected', () => {
                console.log('discted')
                //Ms.stop()
                // remVideoRef.current.stop()
            })
            console.log('success')
            peerI.current = peer
    // })
        // setPeerInstance(peer)

    }, [])   

    const call = (curVideoRef, remVideoRef) => {
        socket.emit('id:add', username, userId)
        socket.emit('user:online', username)
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
            console.log('udacha')
            const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            console.log(getUserMedia)
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
    
    return {remPeerId, variant, remUsername, userId, call, disc}
}