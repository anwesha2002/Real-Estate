import app from "./app";
import env from "./util/validEnv";
import connectDb from "./mongodb/connect";
// const PORT = 5000

const startServer = async () => {
  try {
      await connectDb(env.MONGODB_URL)
      // app.listen(env.PORT,()=>{console.log(`server has started in port ${env.PORT}`)})
  }catch (error){
      console.log(error)
  }
}

// app.listen(PORT,()=>{console.log(`server has started in port ${PORT}`)})

startServer().then(()=>app.listen(env.PORT,()=>{console.log(`server has started in port ${env.PORT}`)}))