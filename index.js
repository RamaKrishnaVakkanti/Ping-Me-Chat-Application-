const express = require('express');
const {Server} = require('socket.io');
const http = require('http');
const app = express();
const cors = require('cors');
const { mongoDB } = require('./mongoDB');
const { insert, find, remove } = require('./helper/DBUtils/mongoDB');
const roomChatSchema = require('./models/roomChat');
const roomUserSchema = require('./models/roomUser');
const routes = require('./routes/index');

app.use(cors());
app.use('/',routes);

const server = http.createServer(app);
const io = new Server(server,{
    cors: {
    origin: '*',
    methods: ['GET','POST','PUT'],
}});

io.on("connection", async (socket)=> {
    console.log(`Connected with ID: ${socket.id}`);
    socket.on('join_room',async (details)=>{
        const roomDetails = {
            roomName: details.roomName,
             userName: details.userName,
              socketId: socket.id
            };
        socket.join(details.roomName);
        await insert(roomUserSchema,roomDetails).catch((err)=>{
            console.log(err);
        });
    });
    socket.on('new_message', async (details)=> {
        const NewMessage = {
            roomName: details.roomName,
            userName: details.userName,
            message: details.message,
            time: details.time
        };
        await insert(roomChatSchema, NewMessage).catch((err)=>{
            console.log(err);
        })
        const chatHistory = await find(roomChatSchema, {roomName:details.roomName}).catch((err)=>{
            console.log(err);
        })
        const userList = await find(roomUserSchema,{roomName: details.roomName}).catch((err)=>{
            console.log(err);
        })
        socket.to(details.roomName).emit('receive_message',chatHistory);
        socket.to(details.roomName).emit('user_list', userList);
    })
    socket.on('disconnect', async()=>{
        await remove(roomUserSchema,{socketId: socket.id}).catch((err)=>{
            console.log(err);
        })
        console.log('Disconnected.......', socket.id);
    })
})

const port = process.env.PORT || 8000;
server.listen(port,()=>{
    console.log(`server running on ${port} port`);
})