// const express = require("express");
import express from "express"
import dotenv from "dotenv"
import http from "http"
import { Server } from "socket.io"
import cors from "cors"


import { addMsgToConversation } from "./controllers/msgs.controllers.js";
import connectToMongoDB from "./db/connectToMongoDB.js"
import msgsRouter from "./routes/msgs.route.js"


import { subscribe, publish } from "./redis/msgsPubSub.js";


// The callback function is executed whenever a message is received on
// the specified Redis channel. When a message is received,
// it's passed to this callback function as the msg parameter.





dotenv.config();
const port = process.env.PORT || 5000;

const app = express();

const server = http.createServer(app);

app.use(cors());
const io = new Server(server , {
    cors:{
        allowedHeaders: ['*'],
        origin: "*"
    }
});


const userSocketMap = {};


io.on('connection' , (socket) => {
    console.log('client connected');
    const username = socket.handshake.query.username;
    console.log('username: ',username);


    const channelName = `chat_${username}`
    console.log("A");
    subscribe(channelName, (msg) => {
        socket.emit("chat msg", JSON.parse(msg));
    });
    console.log("B");


    userSocketMap[username] = socket;

    socket.on('chat msg' , (msg) => {
        // socket.broadcast.emit('chat msg' , msg);
        console.log(`Recieved msg ${msg}`);
        console.log(JSON.stringify(msg));
        // socket.broadcast.emit(msg); 
        console.log("adda");
        const reciverSocket = userSocketMap[msg.receiver];
        // const msgToSend = {msg.textMsg , msg.receiver};
        if(reciverSocket){
            console.log("receiver socket found");
            reciverSocket.emit('chat msg' ,  {text : msg.text , sender: msg.sender , sentTime: msg.sentTime});
        }
        else {
            const channelName = `chat_${msg.receiver}`
            publish(channelName, JSON.stringify(msg));
        }
       
        addMsgToConversation([msg.sender, msg.receiver],
            {
              text: msg.text,
              sender:msg.sender,
              receiver:msg.receiver,
              sentTime: msg.sentTime
            }
        );
    });
    
});


app.get('/' , (req,res) => {
    res.send("win");
});

app.use('/msgs', msgsRouter);


server.listen(port , () => {            // unlike react do not listen on app.lesten isteand listen on server
    console.log(`server is listening at http://localhost:${port}`);
    connectToMongoDB();
});