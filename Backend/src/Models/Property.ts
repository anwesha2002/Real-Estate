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
    rating : number,
    count : number,
    avgRating : number,
    rating5 : number,
    rating4 : number,
    rating3 : number,
    rating2 : number,
    rating1 : number,
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
    rating : {type : Number },
    count : {type : Number },
    avgRating : {type : Number },
    rating5 : {type : Number },
    rating4 : {type : Number },
    rating3 : {type : Number },
    rating2 : {type : Number },
    rating1 : {type : Number },
})


export default model('property', PropertySchema)

