import mongoose , {model , Schema} from "mongoose";
import {messageSchema} from "./message";

const chatRoomSchema = new mongoose.Schema({
    firstUserId : { type : mongoose.Schema.Types.ObjectId, required : true},
    secondUserId : { type : mongoose.Schema.Types.ObjectId, required : true, ref : 'user'},
    messages : [ typeof messageSchema ],
    chatId : {type : String, required : true},
    chatName : {type : String, required : true},
    customer : {type : String}
})

export default model("chatRoom", chatRoomSchema)