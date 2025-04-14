import mongoose , {model , SaveOptions , Types} from "mongoose";

export interface userType extends Document{
    name : string,
    email : string,
    avatar : string,
    address? : string,
    ph_no? : number,
    allProperties : Types.ObjectId[]
    allChatIds : Types.ObjectId[]
    save(options?: SaveOptions): Promise<this>;
    _id : Types.ObjectId
}

const userSchema = new mongoose.Schema<userType>({
    name : {type : String, required : true},
    email : {type : String, required : true},
    avatar : {type : String, required : true},
    address : {type : String},
    ph_no : {type : Number},
    allProperties : [{type : mongoose.Schema.Types.ObjectId , ref : 'property'}],
    allChatIds : [{type : mongoose.Schema.Types.ObjectId , ref : 'chatRoom'}],
})

// type User = mongoose.InferRawDocType<typeof userSchema>

export default model("user", userSchema)