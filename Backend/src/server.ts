import server from "./app";
import env from "./util/validEnv";
import connectDb from "./mongodb/connect";
import {Server} from "socket.io";
import {getIO , initializeSocket} from "./socket/socket";



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


initializeSocket(server)

getIO()






