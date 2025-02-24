import {model , Schema} from "mongoose"
import {userType} from "./users";

export interface PropertyType  {
    title :  String,
    description :  String,
    propertyType :  String,
    location :  String,
    price :  Number,
    photo :  String,
    fileName :  String,
    creator :  userType,
}


const PropertySchema = new Schema<PropertyType>({
    title : {type : String, required : true},
    description : {type : String, required : true},
    propertyType : {type : String, required : true},
    location : {type : String, required : true},
    price : {type : Number, required : true},
    photo : {type : String, required : true},
    fileName : {type : String, required : true},
    creator : {type : Schema.Types.ObjectId, required : true, ref : 'user'},
})


export default model('property', PropertySchema)

