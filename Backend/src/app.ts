import dotenv from 'dotenv';
dotenv.config()
import express from "express"
import cors from "cors";
import userModel from "./Models/users"
import userRoutes from "./Routes/User.routes";
import propertyRoutes from "./Routes/Property.routes";

const app = express()
app.use(cors())
app.use(express.json({limit: '200mb'}))
app.use(express.urlencoded({limit: '200mb', extended: true}));

app.get('/', async (req,res)=>{

    const user =   await userModel.find().exec()

    res.send({message : user})

})

app.use('/api/users', userRoutes)
app.use('/api/properties', propertyRoutes)

export default app