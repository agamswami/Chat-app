// const express = require("express");
import express from "express"
import dotenv from "dotenv"
import authRouter from './routes/auth.route.js'
import usersRouter from './routes/users.route.js'
import checkLogin from './routes/checkLogin.route.js'
import connectToMongoDB from "./db/connectToMongoDB.js";
import cookieParser from "cookie-parser";
import logoutuser from './routes/logout.route.js'
import cors from "cors";
dotenv.config();
const port = process.env.PORT || 5000;

const app = express();

// const server = http.createServer(app);

// const io = new Server(server , {
//     cors:{
//         allowedHeaders: ['*'],
//         origin: "*"
//     }
// });

// io.on('connection' , (socket) => {
//     console.log('client connected');
//     socket.on('chat msg' , (msg) => {
//         console.log(`Recieved msg ${msg}`);
//         // socket.broadcast.emit(msg);
//     })
    
// });
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000" , "http://localhost:3001" ,"http://localhost:3002"]
}));


app.use('/auth' , authRouter);
app.use('/users' , usersRouter);
app.use('/checkLogin' , checkLogin)
app.use('/logout' , logoutuser)
app.get('/' , (req,res) => {
    res.send("win");
});


app.listen(port , () => {            // unlike react do not listen on app.lesten isteand listen on server
    connectToMongoDB();
    console.log(`server is listening at http://localhost:${port}`);
});