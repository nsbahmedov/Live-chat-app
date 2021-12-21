const express = require('express')
const cors = require('cors')
const app = express();
const http = require('http')
const {Server} = require('socket.io')


app.use(cors());

// create server with express
const server = http.createServer(app)

// set server listen port:3001
server.listen(3001, ()=> {
    console.log('Server is running...');
})


// connect socket to local server | prevent cors errors
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
})

// when connected to server
io.on('connection', (socket)=>{
    console.log('user connected ' + socket.id);

    
    socket.on('joinChat', (roomId)=> {
        console.log('created room ' + roomId);
        socket.join(roomId)
    } )

    socket.on('sendMessage', (data)=> {
        // send messages who joined to room
        socket.to(data.room).emit('recieveMessage', data)
    })

    
    // when disconnected from server
    socket.on('disconnect', ()=>{
        console.log('user disconnected');
    })
})

