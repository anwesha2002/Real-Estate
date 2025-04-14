import {RequestHandler} from "express";
import charRoomModel from "../Models/chatRoom"
import chatModel from "../Models/Chats"
import mongoose , {Types} from "mongoose";
import UserModel , {userType} from "../Models/users";

interface messageId {
    id : string
}

interface messageBody {
    to : mongoose.Schema.Types.ObjectId,
    from : mongoose.Schema.Types.ObjectId,
    message : string,
    name : string,
    customer? : string
}

const sendMessage : RequestHandler<messageId,unknown,messageBody,unknown> = async (req, res, next) => {

    const { to, from , name, customer} = req.body

    const {id} = req.params

    try {

        const session = await mongoose.startSession()

        session.startTransaction()

        console.log(req.body)
        console.log(id)

        const existingChat = await charRoomModel.findOne({ chatId : id})
        const user1 = await UserModel.findOne({_id : from}).session(session) as userType
        const user2 = await UserModel.findOne({_id : to}).session(session) as userType

        if(existingChat){

            const updatemessageBody = await charRoomModel.findOneAndUpdate({chatId : id},
                {
                    firstUserId : from,
                    secondUserId : to,
                    $push : { messages : req.body },
                    chatId : id,
                    chatName : name,
                    customer : customer && customer
                }

            )

            res.status(200).json(updatemessageBody)
        }
        else {
            const messageBody = await charRoomModel.create({
                firstUserId : from,
                secondUserId : to,
                messages : req.body,
                chatId : id,
                chatName : name,
                customer : customer
            })

            console.log(messageBody)

            await chatModel.create({
                firstUserId : from,
                secondUserId : to,
                chats : messageBody._id
            })


            user1?.allChatIds?.push(messageBody._id as Types.ObjectId)
            user2?.allChatIds?.push(messageBody._id as Types.ObjectId)

            await user1.save( { session })
            await user2.save( { session })

            await session.commitTransaction()

            res.status(201).json(messageBody)
        }


    }catch (err){
        res.status(500)

    }


}

 const getChatByChatId : RequestHandler<messageId,unknown,unknown, unknown> = async (req, res, next) => {

    const {id} = req.params

     try {

        const messages = await charRoomModel.findOne({chatId : id}).populate('secondUserId')

         console.log(messages)
         res.status(200).json(messages)


     }catch (err){
        res.status(500)
     }

}

export {sendMessage, getChatByChatId}