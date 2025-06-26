import dotenv from 'dotenv';
dotenv.config()
import express , {NextFunction, Request, Response} from "express"
import {createServer} from "http";
import cors from "cors";
import userModel from "./Models/users"
import userRoutes from "./Routes/User.routes";
import propertyRoutes from "./Routes/Property.routes";
import chatRoutes from "./Routes/Chat.routes";
import createHttpError , {isHttpError} from "http-errors";

const app = express()

const server = createServer(app)

app.use(cors())
app.use(express.json({limit: '200mb'}))
app.use(express.urlencoded({limit: '200mb', extended: true}));

app.get('/', async (req,res)=>{

    const user =   await userModel.find().exec()

    res.send({message : user})

})

app.use('/api/users', userRoutes)
app.use('/api/properties', propertyRoutes)
app.use('/api/chat', chatRoutes)

app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"));
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occurred";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});

export default server