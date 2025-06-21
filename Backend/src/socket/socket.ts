

import {Server , Socket} from "socket.io";
import server from "../app";
import {IncomingMessage , ServerResponse} from "http";
import charRoomModel , {chatRoomType} from "../Models/chatRoom";
import {updateConversation} from "../Controllers/Chat.Controllers";

let io : any

const initializeSocket = (server : any ) => {
    const {Server} = require("socket.io")

    io = new Server(server, {
        pingTimeout: 60000,
        cors: {
            origin: 'http://localhost:5173',
            methods: ["GET", "POST"],
            credentials: true
        },
        // path: '/api/chat'
    });


    return io

}



const getIO = () => {
    if (!io) {
        throw new Error('Socket.io not initialized!');

    }

    io.on('connection', (socket : Socket ) => {
            console.log('a user connected');

            const userId = socket.handshake.query.userId;

            console.log(userId)

            if (userId != "undefined") {
                console.log ( "a user joined the application" , userId )
            }
            else console.log("user disconnected")

            // serverSocket = socket

            // Your socket handlers here
            socket.on("setup",(userData : any)=>{
                socket.join(userData._id)
                console.log("user connected", userData._id)
                io.emit("connected", userData)
                // io.emit("userConnected", userData)
            })

            socket.on("join chat",(chatId : string)=>{
                socket.join(chatId)
                console.log(chatId)
                console.log("user joined", chatId)
                socket.emit("userJoined",chatId)
            })

            socket.on("mark as read",async (chatId : string, userId : string)=>{
                await updateConversation(chatId)
            })

            socket.on('typing',(room : {chatId: string | undefined, id: string})=> {
                console.log("typing")
                io.in ( room.chatId ).emit ( "typing", room.id )
            })
            socket.on('stop typing',(room : {chatId: string | undefined, id: string})=> {
                console.log("stop typing")
                io.in ( room.chatId ).emit ( "stop typing" , room.id)
            })

            socket.on("leave room",(chatId : string) => {
                socket.leave(chatId)
                socket.emit("userLeft", chatId)
            })



        });


    return io;
};

// const getSocket = () => {
//     if(!serverSocket) throw new Error("socket not found")
//
//     return serverSocket
// }

export {initializeSocket, getIO}