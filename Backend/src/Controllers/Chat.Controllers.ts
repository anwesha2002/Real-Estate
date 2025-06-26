import {RequestHandler} from "express";
import charRoomModel , {chatRoomType} from "../Models/chatRoom"
import messageModel from "../Models/message"
import chatModel from "../Models/Chats"
import mongoose , {Types} from "mongoose";
import UserModel , {userType} from "../Models/users";
import {getIO } from "../socket/socket";
import createHttpError from "http-errors";

interface messageId {
    id : string
}

interface messageBody {
    to? : mongoose.Schema.Types.ObjectId,
    from? : mongoose.Schema.Types.ObjectId,
    message : string,
    name? : string,
    customer? : string,
    propertyImage? : string
}

const sendMessage : RequestHandler<messageId,unknown,messageBody,unknown> = async (req, res, next) => {

    const { to, from , name, customer, message, propertyImage} = req.body

    const {id} = req.params

    const io = getIO()

    // const socket = await io.fetchSockets()

    try {

        if(!to || !from || !message ) throw createHttpError("messageBody not found")


        const session = await mongoose.startSession()

        session.startTransaction()

        // console.log(req.body)
        // console.log(id)

        const existingChat = await charRoomModel.findOne({ chatId : id}) as chatRoomType
        const user1 = await UserModel.findOne({_id : from}).session(session) as userType
        const user2 = await UserModel.findOne({_id : to}).session(session) as userType

        if(!user1 || !user2) createHttpError(400,"User not found")

        if(!existingChat) createHttpError(400,"Chat not found")


        const messagedata = await messageModel.create({
            from : from,
            to : to,
            message : message,
            chatId : id
        })

        // if(existingChat){
        //
        //     const updatemessageBody = await charRoomModel.findOneAndUpdate({chatId : id},
        //         {
        //             firstUserId : from,
        //             secondUserId : to,
        //             $push : { messages : req.body },
        //             chatId : id,
        //             chatName : name,
        //             customer : customer && customer
        //         }
        //
        //     )
        //
        //     res.status(200).json(updatemessageBody)
        // }

        let messageBody : any

        if(!existingChat) {
            messageBody = await charRoomModel.create({
                firstUserId : from,
                secondUserId : to,
                // messages : [messagedata._id],
                // messages : req.body,
                chatId : id,
                chatName : name,
                customer : customer,
                propertyImage : propertyImage,
                unReadCount : 1,
                lastMessage : messagedata._id
            })

            // console.log(messageBody)

            // await chatModel.create({
            //     firstUserId : from,
            //     secondUserId : to,
            //     chats : messageBody._id
            // })


            user1?.allChatIds?.push(messageBody._id as Types.ObjectId)
            user2?.allChatIds?.push(messageBody._id as Types.ObjectId)

            await user1.save( { session })
            await user2.save( { session })

            await session.commitTransaction()

            // io.emit("updated convo", messageBody)

            // res.status(201).json(messageBody)
        }
        else{


            const room = io.sockets.adapter.rooms.get(id);

            console.log(room)

            console.log(room.size)

            if(room.size ==1 ){

                messageBody = await charRoomModel.findOneAndUpdate(
                    { chatId : id},
                    {
                        $inc : {unReadCount : 1},
                        $set : {lastMessage : messagedata._id },

                    },
                    {new  : true }
                )
            }else{
                messageBody = await charRoomModel.findOneAndUpdate(
                    { chatId : id},
                    {
                        $set : {lastMessage : messagedata._id },

                    },
                    {new  : true }
                )
            }



            // existingChat?.messages?.push(messagedata._id as Types.ObjectId)

            // await existingChat?.save({session})
            //
            // await session.commitTransaction()
        }

        await messageBody.save()

        const populatedMessageData = await messagedata.populate({path : 'from to', select : 'name avatar _id'})

        const populatedupdatedConvo = await messageBody.populate({path : 'lastMessage'})


        await io.in(to).emit("message received", populatedMessageData)

        // console.log(populatedupdatedConvo)

        await io.in(to).to(id).emit("updated convo", populatedupdatedConvo)


        res.status(201).json( populatedMessageData)

    }catch (err){

        next(err)

        io.in(from).emit("updated convo", "couldn't send the message")

    }

}

export const updateConversation  = async (id : string) => {

    try {
        const messageBody = await charRoomModel.findOneAndUpdate(
            { chatId : id},
            {
                $set : {unReadCount : 0},
            }
        )

        return messageBody
    }
    catch (err){
        console.log(err)
    }
}

 const getChatByChatId : RequestHandler<messageId,unknown,unknown, unknown> = async (req, res, next) => {

    const {id} = req.params

     try {

        const messages = await messageModel.find({ chatId : id }).populate({path : 'from to', select : 'name avatar id'})

        // const messages = await charRoomModel.findOne({chatId : id}).populate( { path :  'secondUserId firstUserId' , select : 'name avatar id' }).populate('messages')

         // console.log(messages)

         res.status(200).json(messages)


     }catch (err){
        next(err)
     }

}

export {sendMessage, getChatByChatId}