import {PropertyModel} from "./PropertyModel.ts";

export interface UserModels {
    _id? : string
    name : string,
    email : string,
    avatar? : string,
    address? : string,
    ph_no? : number
    allProperties? : PropertyModel[],
    allChatIds? : []
}