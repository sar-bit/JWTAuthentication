const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 8000
const {errHandler, errorHandler} = require('./middleware/errorMiddleware')
const app=express()

const server = http.createServer(app)
const { Server } = require("socket.io");
const io = new Server(server);
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

  io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
      });
   // console.log('a user connected');
    // socket.on('disconnect', () => {
    //     console.log('user disconnected');
    //   });
  });
  
  server.listen(port, () => {
    console.log(`listening on *:${port}`);
  });  

//app.use('/api/goals',require('./routes/goalRoutes'));

app.use(errorHandler)

//app.listen(port,()=>console.log(`Server started ${port}`));