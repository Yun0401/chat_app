//加密方法 初始化 密碼 連線問題

const express = require('express');
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io")
app.use(cors()); 

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        // origin: 
        origin: ["http://localhost:3000","http://172.28.92.111:3000"],
        methods: ["GET","POST"],
    },
});

io.on("connection",(socket)=>{
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room",(data)=>{
        socket.join(data);
        console.log(`User with ID: ${socket.id} join room ${data}`);
    });
    socket.on("send_message", (data) => {
        // let stri = '';
        // for(var i=0;i<data.message.length;i++){
        //     var ch = data.message[i];
        //     var n = ch.charCodeAt()+2;
        //     stri += String.fromCharCode(n);
        // }
        // data.message = stri;
        socket.to(data.room).emit("receive_message",data);
        
    });
    socket.on("disconnect",()=>{
        console.log("User Disconnected", socket.id);
    });
});

server.listen(3001, ()=>{
    console.log("SERVER RUNNING");

});