import UserModel from "../Models/users"
import {RequestHandler} from "express";
import {Schema} from "mongoose";
import {v2 as cloudinary} from "cloudinary"
import env from "../util/validEnv";

cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET
})

interface SignUpBody {
    name? : string,
    email? : string,
    avatar? : string
}

interface userId{
    id : Schema.Types.ObjectId
}

interface UserDetails{
    name : string,
    email : string,
    avatar? : string
    address? : string
    ph_no? : number
}

const getAllUsers : RequestHandler = async (req, res, next) => {
    try {

        const response = await UserModel.find({}).exec()

        res.status(200).json(response)

    }catch (err : any){
        res.status(500).json(err.message)
    }
}
const createUser : RequestHandler<unknown, unknown, SignUpBody, unknown>  = async (req , res, next ) => {
        const { name, email, avatar } = req.body
    try {

        if(!name || !email){
            throw Error("not found")
        }

        const existedUser =  await UserModel.findOne({email : email})

        if(existedUser) {
            res.status ( 200 ).json ( existedUser )
            return
        }

        if(!avatar){
            throw Error("picture not found")
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

const editUser : RequestHandler<userId, unknown, UserDetails, unknown> = async (req, res, next)=>{

    const { id } = req.params

    const { address, avatar, ph_no, email, name } = req.body

    console.log(req.body)
    console.log(id)

    try {

        if(!address || !avatar || !ph_no || ! email || !name) {
            throw Error("not found")
        }

        const newAvatar = await cloudinary.uploader.upload(avatar)

        const newUserDetails = await UserModel.findByIdAndUpdate({_id : id},{
            name : name,
            email : email,
            ph_no : Number(ph_no),
            avatar : newAvatar.url || avatar,
            address : address
        }, {new : true} )

        res.status(200).json(  newUserDetails )

    }catch (error : any){
        res.status(500).json(error)
    }
}

type userIdProps = {
    id : Schema.Types.ObjectId
}

const getUserById : RequestHandler<userIdProps,unknown, unknown, unknown> = async (req, res, next) => {
    try {
        const { id } = req.params

        const user = await UserModel.findOne({_id : id}).populate('allProperties').populate( {
           path : 'allChatIds' , populate : {
               path : 'secondUserId firstUserId',
                select : 'name _id avatar',
            }
        })

        if(!user) throw Error("User not found")

        res.status(200).json(user)

    }catch (error : any){
        res.status(500).send( error );
    }
}

export {getUserById, getAllUsers, createUser, editUser}