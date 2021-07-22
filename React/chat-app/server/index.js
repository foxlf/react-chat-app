require('dotenv').config()
const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
  cors: {
    origin: '*'
  }
});
const PORT = process.env.PORT || 5000;
const { exit } = require('process');
const db = require('./db/db')

const users = []


// function getRooms(){
//   const {rooms} = io.socket.adapter
//   return Array.from(rooms(keys))
// }

io.on('connection', socket => {
  console.log('User connected')

    socket.on('user:add', (username, pass) => {
        db.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, pass])
        console.log("from server: " + username)
    })

    socket.on('user:auth', (un, pass) => {
      db.query('SELECT (username, password) from users WHERE username = $1 AND password = $2', [un, pass], (err, res) => {
        if(err)
          throw err
        if(res.rows.length == 0){
          io.emit('cor_login', false)
        }
        else{
          io.emit('cor_login', true)
        }
      })
    })

    socket.on('user:get', un => {
      db.query('SELECT (username) from users WHERE username = $1', [un], (err, res) => {
        if(err)
          throw err
        if(res.rows.length == 0){
          //console.log('1')
          io.emit('cor', true)
        }
        else{
          //console.log('0')
          io.emit('cor', false)
        }
      })
      // const qr = db.query('SELECT (username, password) from users')
      // qr.on('row', row => {
      //   console.log(row)
      // })
        // console.log('got users')
        // //getU(user, pass)
    })

    socket.on('id:add', (username, id) => {
      let s = true
      socket.join(username)
      for(let i = 0; i < users.length; i++){
        if(users[i].un == username)
          s = false
      }
      if(s)
        users.push({un: username, id: id, rdy: true})
      else
        users.map((user) => {
          if (user.un == username)
          user.rdy = true
        })
      console.log(JSON.stringify(users))
    })

    socket.on('user:leave', (username) => {
      users.map((user) => {
        if (user.un == username){
          user.rdy = false
        }
      })
    })

    socket.on('user:online', (username, userId) => {
      let s = true
      console.log('username: ' + username + 'userId' + userId)
      users.map((user) => {
        if(user.rdy && s && (user.un != username)){
          s = false
          console.log('got')
          user.peerId = userId
          user.peerUn = username
          io.sockets.in(username).emit('getId', user.id, user.un)
          //io.sockets.in(user.un).emit('getRemId', username, userId)
          // socket.emit('getId', user.id)  
        }
        console.log('no got')
      })
      if(s){
        console.log('dich')
        io.sockets.in(username).emit('getId', '', '')
        // socket.emit('getId', '')  
      }  
    })

    // socket.on('msg:remId', () => {
    //   users.map((user) => {
    //     user.peerId = 
    //   })
    // })

    socket.on('msg:snd', (username) => {
      users.map((user) => {
        console.log('works')
        if(user.un == username)
          io.sockets.in(username).emit('getRemId', user.peerId, user.peerUn)
      })
    })

    socket.on('disconnect', () => {
      console.log('User disconnected')
    })
  })
  
http.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})