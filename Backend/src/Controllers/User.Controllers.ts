import UserModel from "../Models/users"
import {RequestHandler} from "express";

interface SignUpBody {
    name? : string,
    email? : string,
    avatar? : string
}

const getAllUsers = async () => {}
const createUser : RequestHandler<unknown, unknown, SignUpBody, unknown>  = async (req , res, next ) => {
        const { name, email, avatar } = req.body
    try {

            if(!name || !email || !avatar){
                throw Error("not found")
            }

        const existedUser =  await UserModel.findOne({email : email})

        if(existedUser) {
            res.status ( 200 ).json ( existedUser )
            return
        }
        const newUser = await UserModel.create({
            name : name ,
            email : email,
            avatar : avatar
        })

       res.status(201).json(newUser)
    }catch (error) {
        next(error);
    }
}
const getUserById = async () => {}

export {getUserById, getAllUsers, createUser}