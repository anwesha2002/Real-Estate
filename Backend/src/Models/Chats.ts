import mongoose , {model , Schema} from "mongoose";

const chatSchema = new mongoose.Schema({
    firstUserId : { type : mongoose.Schema.Types.ObjectId, required : true},
    secondUserId : { type : mongoose.Schema.Types.ObjectId, required : true},
    chats : {type : Schema.Types.ObjectId, required : true, ref : 'chatRoom'},
    // chatId : { type : String, required : true , ref : 'chatRoom'}
})

export default model("chat", chatSchema)