import mongoose , {model} from "mongoose";

export const messageSchema = new mongoose.Schema({
    from : { type : mongoose.Schema.Types.ObjectId, required : true , ref : 'user'},
    to : { type : mongoose.Schema.Types.ObjectId, required : true, ref  : 'user' },
    // time : { type : Date, default : Date.now(), required : true },
    chatId : {type : String, required : true},
    message : { type : String, required : true },
},{ timestamps: true })

export default model("messages",messageSchema)

