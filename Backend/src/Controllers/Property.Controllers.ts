import "dotenv/config"
import env from "../util/validEnv"

import { v2 as cloudinary } from 'cloudinary';
import PropertyModel , {PropertyType} from "../Models/Property"
import UserModel , {userType} from "../Models/users"
import mongoose , {Schema , SortOrder} from "mongoose";
import {query , RequestHandler} from "express";

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
            .limit(_end)
            .skip(_start)
            .sort( { [_sort] : _order })
            .exec()

        res.header('x-total-count', `${count}`)
        res.header('Access-Control-Expose-Headers', 'x-total-count' )

        if(!allProperties) throw Error("properties don't exist")
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

        if(ExistingProperty) res.status(200).json(  ExistingProperty   )
        else res.status(400).send( "Property Not Found")
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

        if(!user) throw Error("user not found")

        const photoURL = await cloudinary.uploader.upload(photo)

        console.log(photoURL.url)

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

        const { title, location, description, propertyType, price , photo, fileName } = req.body


        const photoURL = await cloudinary.uploader.upload(photo)

        console.log(req.body)
        console.log(id)

        const newProperty = await PropertyModel.findByIdAndUpdate({ _id : id },{
            title :  title,
            description :  description,
            propertyType :  propertyType,
            location :  location,
            price :  price,
            photo :  photoURL.url || photo,
            fileName : fileName,
        })


        res.status(200).json(newProperty)

    }catch (err : any){
        res.status(500).json(err)
    }
}


const deleteProperty : RequestHandler<detailsPramsProps,unknown, unknown, unknown> = async (req, res, next) => {


    try {
        const {id }= req.params

        const PropertyToDelete = await PropertyModel.findById({_id : id}).populate('creator') as PropertyType
        if(!PropertyToDelete) throw new Error("Property not found")

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
        res.status(500).send( err.message)
    }
}

export {getAllProperties,
    getPropertyDetails,
    updateProperty,
    deleteProperty,
    createProperty}