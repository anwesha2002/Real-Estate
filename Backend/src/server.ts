import server from "./app";
import env from "./util/validEnv";
import connectDb from "./mongodb/connect";
import {Server} from "socket.io";



const startServer = async () => {
  try {
      await connectDb(env.MONGODB_URL)
      // app.listen(env.PORT,()=>{console.log(`server has started in port ${env.PORT}`)})
  }catch (error){
      console.log(error)
  }
}

// app.listen(PORT,()=>{console.log(`server has started in port ${PORT}`)})

startServer().then(()=>server.listen(env.PORT,()=>{console.log(`server has started in port ${env.PORT}`)}))


const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: 'http://localhost:5173',
        methods: ["GET", "POST"],
        credentials: true
    },
    // path: '/api/chat'
});

io.on('connection', (socket) => {
    console.log('a user connected');

    const userId = socket.handshake.query.userId;

    console.log(userId)

    if (userId != "undefined") console.log("a user joined the application", userId)
    else console.log("user disconnected")

    // Your socket handlers here
    socket.on("setup",(userData)=>{
        socket.join(userData._id)
        console.log("user connected", userData._id)
        io.emit("connected", userData)
        // io.emit("userConnected", userData)
    })

    socket.on("join chat",(chatData)=>{
        socket.join(chatData?.chatId)
        console.log("user joined", chatData?.chatId)
        socket.emit("userJoined",chatData)
    })

    socket.on('typing',(room)=> {
        console.log("typing")
        io.in ( room.chatId ).emit ( "typing", room.id )
    })
    socket.on('stop typing',(room)=> {
        console.log("stop typing")
        io.in ( room.chatId ).emit ( "stop typing" , room.id)
    })

    socket.on("newMessage",(newMessage)=>{

        console.log("new message", newMessage)
        // console.log("new message", currentUser)

        const to = newMessage?.to

        console.log('to', to)

        io.in(to).emit("message received",newMessage)

        // socket.join(chatData)
        // console.log("user joined", chatData?._id)
    })

});

// const messagesPath = io.of( '/message' )
// messagesPath.on('connection',(socket)=>{
//     console.log('someone connected')
//
//     socket.on("setup",(userData)=>{
//         socket.join(userData._id)
//         console.log("user connected", userData._id)
//         io.emit("connected", userData)
//         // io.emit("userConnected", userData)
//     })
//
//     socket.on("newMessage",(newMessage)=>{
//
//         console.log("new message", newMessage)
//         // console.log("new message", currentUser)
//
//         const to = newMessage?.to
//
//         console.log('to', to)
//
//         io.in(to).emit("message received",newMessage)
//
//         // socket.join(chatData)
//         // console.log("user joined", chatData?._id)
//     })
//
// })



