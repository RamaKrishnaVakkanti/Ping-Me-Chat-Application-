const express = require('express');
const {Server} = require('socket.io');
const http = require('http');
const app = express();
const cors = require('cors');

app.use(cors());

const chatHistory = {};

const server = http.createServer(app);
const io = new Server(server,{
    cors: {
    origin: '*',
    methods: ['GET','POST','PUT'],
}});

io.on("connection", (socket)=> {
    console.log(`Connected with ID: ${socket.id}`);
    socket.on('join_room',(details)=>{
        socket.join(details.room);
    });
    socket.on('new_message', (details)=> {
        if(chatHistory[details.room]){
            chatHistory[details.room].push(details);
        }else{
            chatHistory[details.room] = [details];
        }
        socket.to(details.room).emit('receive_message',chatHistory[details.room]);
    })
    socket.on('disconnect', ()=>{
        console.log('Disconnected.......', socket.id);
    })
})

const port = process.env.PORT || 8000;
server.listen(port,()=>{
    console.log(`server running on ${port} port`);
})