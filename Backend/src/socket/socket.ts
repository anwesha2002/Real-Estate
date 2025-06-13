
//
// import {Server} from "socket.io";
// import server from "../app";
//
//
// // const app = express()
//
//
//
// const io = new Server(server,{
//     pingTimeout : 60000,
//     cors: {
//         origin: 'http://localhost:5173',
//         methods: ["GET", "POST"],
//         credentials: true
//     },
//     path : '/api/chat'
// })
//
// io.on('connection' , (socket) => {
//     console.log('a user connected');
//
//     // const userId = socket.handshake.query.userId;
//     // console.log(userId)
//     //
//     // socket.on("setup", (userData) => {
//     //     socket.join(userData._id);
//     //     socket.emit("connected");
//     // });
// })
//
// // export { io}