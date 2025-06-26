import "dotenv/config"
import env from "../util/validEnv"

import { v2 as cloudinary } from 'cloudinary';
import PropertyModel , {PropertyType} from "../Models/Property"
import UserModel , {userType} from "../Models/users"
import mongoose , {Schema , SortOrder} from "mongoose";
import { RequestHandler} from "express";
import {couch} from "globals";
import createHttpError from "http-errors";

cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET
})

interface CreatePropertyBody {
    title :  string,
    description :  string,
    propertyType :  string,
    location :  string,
    price :  number,
    photo : string,
    fileName : string
    email :  string,
    rating? : number,
}


interface queryType {
    _end : number
    _start : number,
    _order : SortOrder | {$meta: any},
    _sort : string,
    _title_like : string,
    propertyType : string
}


const getAllProperties : RequestHandler<unknown, unknown, unknown, queryType> = async (req, res, next) => {


    const {_end, _start, _order, _sort, _title_like = "", propertyType = ""} = req.query

    console.log(_start)
    const query : any = {}

    if(propertyType){
        query.propertyType = { $eq : propertyType }
    }

    if(_title_like){
        query.title = { $regex : _title_like , $options : 'i' }
    }

    console.log(query)

    try {
        const count = PropertyModel.countDocuments({query})
        const allProperties = await PropertyModel
            .find(query)
            .populate('creator')
            .limit(_end)
            .skip(_start)
            .sort( { [_sort] : _order })
            .exec()

        res.header('x-total-count', `${count}`)
        res.header('Access-Control-Expose-Headers', 'x-total-count' )

        if(!allProperties) throw createHttpError(404,"properties don't exist")

        res.status(200).json(allProperties)
    }catch (err){
        next(err)
    }
}

type detailsPramsProps = {
    id : Schema.Types.ObjectId
}

const getPropertyDetails : RequestHandler<detailsPramsProps, unknown, unknown, unknown> = async (req, res, next) => {

    const { id } = req.params


    try {
        const ExistingProperty = await PropertyModel.findOne( { _id : id }).populate("creator")

        if(!ExistingProperty) throw createHttpError(400,"Property Not Found")

        res.status(200).json(  ExistingProperty   )

    }catch (err){
        console.log(err)
    }
}
const createProperty : RequestHandler<unknown, unknown, CreatePropertyBody, unknown> = async (req, res, next) => {
        const { title, propertyType, photo, price, location, description, email, fileName } = req.body
    try {
        const session = await mongoose.startSession()

        session.startTransaction()

        const user  = await UserModel.findOne({email : email}).session(session) as userType

        if(!user) throw createHttpError("user not found")

        const photoURL = await cloudinary.uploader.upload(photo)

        if(!photoURL.url) throw createHttpError("Photo not found")

        const newProperty = await PropertyModel.create({
            title :  title,
            description :  description,
            propertyType :  propertyType,
            location :  location,
            price :  price,
            photo :  photoURL.url,
            fileName : fileName,
            creator :  user._id,
        })

        console.log(newProperty)

        user.allProperties.push ( newProperty._id )

        await user.save({session})

        await session.commitTransaction()


        res.status(201).send(newProperty)

    } catch (err){
        next(err)
    }
}
const updateProperty : RequestHandler<detailsPramsProps, unknown, CreatePropertyBody, unknown> = async (req, res, next) => {

    try {
        const {id }= req.params

        const { title, location, description, propertyType, price , photo, fileName,  rating  } = req.body

        // console.log(req.body)


        const photoURL = await cloudinary.uploader.upload(photo)

        const existingProperty = await PropertyModel.findById({_id : id}) as PropertyType

        if (!existingProperty) throw createHttpError(404,"Property not found")

        const sum = rating && (
            (existingProperty.rating5 ? existingProperty.rating5 *5 : 0)
            + (existingProperty.rating4 ? existingProperty.rating4 *4 : 0) +
            (existingProperty.rating3 ? existingProperty.rating3 *3 : 0) +
            (existingProperty.rating2 ? existingProperty.rating2 *2 : 0) +
            (existingProperty.rating1 ? existingProperty.rating1 : 0)
            + rating )



        const c = rating && (existingProperty?.count ? existingProperty?.count+ 1  : 1)

        const avgrating = sum && c && sum/c


        const ratingUpdate : any = {};
        if(rating){
            if (rating === 5) ratingUpdate.rating5 = 1;
            else if (rating === 4) ratingUpdate.rating4 = 1;
            else if (rating === 3) ratingUpdate.rating3 = 1;
            else if (rating === 2) ratingUpdate.rating2 = 1;
            else if (rating === 1) ratingUpdate.rating1 = 1;
        }


        const basicUpdate = {

                title : title ,
                description : description ,
                propertyType : propertyType ,
                location : location ,
                price : price ,
                photo : photoURL.url || photo ,
                fileName : fileName ,
                count : c ,
                avgRating : avgrating ,
                rating : rating

        }

        const newProperty = await PropertyModel.findByIdAndUpdate({ _id : id },
            {
                $set: basicUpdate,
                $inc : ratingUpdate
            },
            {new  : true })

        console.log(newProperty)

        res.status(200).json(newProperty)

    }catch (err : any){
        next(err)
    }
}


const deleteProperty : RequestHandler<detailsPramsProps,unknown, unknown, unknown> = async (req, res, next) => {


    try {
        const {id }= req.params

        const PropertyToDelete = await PropertyModel.findById({_id : id}).populate('creator') as PropertyType
        if(!PropertyToDelete) throw createHttpError("Property not found")

        const session = await mongoose.startSession()

        session.startTransaction()

        await PropertyModel.deleteOne({ _id : id},{session})

        await UserModel.findByIdAndUpdate(
            PropertyToDelete.creator?._id,
            { $pull : {
                allProperties : id
                }
            },
        )

        await PropertyToDelete.creator?.save({ session });
        await session.commitTransaction();

        res.status(200).json("Property deleted successfully")

    }catch (err : any){
        next(err)
    }
}

export {getAllProperties,
    getPropertyDetails,
    updateProperty,
    deleteProperty,
    createProperty}