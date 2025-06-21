import mongoose , {model , SaveOptions , Types} from "mongoose";

export interface chatRoomType extends Document{
    firstUserId : Types.ObjectId,
    secondUserId : Types.ObjectId,
    // messages : Types.ObjectId[],
    lastMessage : Types.ObjectId,
    chatId : string,
    chatName : string,
    customer : string,
    save(options?: SaveOptions): Promise<this>;
    _id : Types.ObjectId,
    unReadCount? : number
}

const chatRoomSchema = new mongoose.Schema({
    firstUserId : { type : mongoose.Schema.Types.ObjectId, required : true, ref : 'user'},
    secondUserId : { type : mongoose.Schema.Types.ObjectId, required : true, ref : 'user'},
    lastMessage : { type : mongoose.Schema.Types.ObjectId, required : true, ref : 'messages'},
    unReadCount : { type : Number } ,
    chatId : {type : String, required : true},
    chatName : {type : String, required : true},
    customer : {type : String},
    propertyImage : {type : String}
},{ timestamps: true })

export default model("chatRoom", chatRoomSchema)