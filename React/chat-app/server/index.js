require('dotenv').config()
const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
  cors: {
    origin: '*'
  }
});
const PORT = process.env.PORT || 5000;
const { response } = require('express');
const jwt = require('jsonwebtoken');
const db = require('./db/db')




// function getRooms(){
//   const {rooms} = io.socket.adapter
//   return Array.from(rooms(keys))
// }

io.on('connection', socket => {
  console.log('User connected')
    // function getU(){
    //   io.emit('users', [user, pass])
    // }

    socket.on('user:add', (username, pass) => {
        db.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, pass])
        console.log("from server: " + username)
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

    socket.on('disconnect', () => {
      console.log('User disconnected')
    })
  })
  
http.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})