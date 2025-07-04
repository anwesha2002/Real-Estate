
export interface PropertyModel {
    title? : string,
    description? : string,
    propertyType? : string,
    price? :  string,
    location? : string,
    // propertyImage : {name : string, url : string},
    photo? : any,
    fileName? : string
    email? : string
    _id? : string,
    rating? : number | null,
    avgRating? : number,
    count? : number,
}