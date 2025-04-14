import {UserModels} from "../Models/UserModels.ts";
import {PropertyModel} from "../Models/PropertyModel.ts";
import {ChatModels} from "../Models/chatModels.ts";


type getPropertiesQuery = {
    order? : string,
    title? : string,
    type? : string,
    pageSize? : number,
    start? : number
}

export async function login( credentials : UserModels ) : Promise<UserModels> {
    // const {name, email, avatar} = credentials


    // if(credentials){
        const response = await fetch('http://localhost:5000/api/users',{
            method : "POST",
            headers : { 'Content-Type' : 'application/json' },
            body : JSON.stringify(credentials)
        })
        const data = await response.json()
        // console.log(response.json())

        if(response.status === 200 || response.status === 201 ){
            localStorage.setItem(
                "user",
                JSON.stringify({
                    // ...credentials,
                    // avatar : avatar,
                    ...credentials,
                    userId : data._id
                })
            )

            return data
        }else {
            // return Promise.reject()
            const errorBody = await response.json();
            const errorMessage = errorBody.error;
            throw Error("request fail with" + errorMessage)
        }
    // }
    //     return response

}


export async function createProperty( propertyDetails : PropertyModel ) : Promise<PropertyModel> {
    // const {name, email, avatar} = credentials

    console.log(propertyDetails)


    // if(credentials){
    const response = await fetch('http://localhost:5000/api/properties',{
        method : "POST",
        headers : { 'Content-Type' : 'application/json' },
        body : JSON.stringify(propertyDetails)
    })
    // console.log(response.json())
    const data = await response.json()

    // if(response.status === 200 || response.status === 201 ){
    //     localStorage.setItem(
    //         "property",
    //         JSON.stringify({
    //             // ...credentials,
    //             // avatar : avatar,
    //             ...propertyDetails,
    //             propertyId : data._id
    //         })
    //     )
    // }else {
    //     // return Promise.reject()
    //     const errorMessage = data.error;
    //     throw Error("request fail with" + errorMessage)
    // }
    // }
    return data

}

export async function getProperties({order, title, type, pageSize, start} : getPropertiesQuery) : Promise<PropertyModel[]>{
    const response = await fetch(`http://localhost:5000/api/properties?_end=${pageSize}&_sort=price&_order=${order}&_title_like=${title}&propertyType=${ type === "all" ? "" : type}&_start=${start}`,{
        method : "GET",
        headers : { 'Content-Type' : 'application/json' },
    })

    return response.json()
}

export async function getPropertyDetails(id : string) {
    const response = await fetch(`http://localhost:5000/api/properties/${id}`, {
        method : "GET",
        headers : { 'Content-Type' : 'application/json' },
    })

    return response.json()
}

export async function DeleteProperty(id : string){
    const response = await fetch(`http://localhost:5000/api/properties/${id}`, {
        method : "DELETE",
        headers : { 'Content-Type' : 'application/json' },
    })

    return response.json()


}

export async function UpdateProperty(id : any , propertyDetails : PropertyModel  ){

    console.log(id.id )
    console.log(propertyDetails)

    const response = await fetch(`http://localhost:5000/api/properties/${id.id}`, {
        method : "PATCH",
        headers : { 'Content-Type' : 'application/json' },
        body : JSON.stringify(propertyDetails)
    })

    // const data = await response.json()

    // if(response.status === 200 || response.status === 201 ){
    //     localStorage.setItem(
    //         "property",
    //         JSON.stringify({
    //             // ...credentials,
    //             // avatar : avatar,
    //             ...propertyDetails,
    //         })
    //     )
    // }else {
    //     // return Promise.reject()
    //     const errorMessage = data.error;
    //     throw Error("request fail with" + errorMessage)
    // }

    return response.json()
}

export async function EditUserProfile({ id }: { id: string } , userDetails: UserModels) : Promise<UserModels> {

    console.log(userDetails)
    console.log(id)

    const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method : "PATCH",
        headers : { 'Content-Type' : 'application/json' },
        body : JSON.stringify(userDetails)
    })

    if(!response.ok){
        throw new Error("can't be edited")
    }

    const updatedUserData = await response.json();
    return updatedUserData;


}

export async function getAllAgents() : Promise<UserModels[]> {
    const response = await fetch(`http://localhost:5000/api/users`, {
        method : "GET",
        headers : { 'Content-Type' : 'application/json' },
    })

    return response.json()
}

export async function getAgentsById(id : string) : Promise<UserModels> {
    const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method : "GET",
        headers : { 'Content-Type' : 'application/json' },
    })

    return response.json()
}

export async function sendMessage(id : string, message : ChatModels)  {

    console.log(id)
    console.log(message)
    console.log(message)

    const response = await fetch(`http://localhost:5000/api/chat/${id}`, {
        method : "POST",
        headers : { 'Content-Type' : 'application/json' },
        body : JSON.stringify(message)
    })

    if(!response.ok){
        throw new Error("error occured")
    }

    const updatedUserData = await response.json();


    console.log(updatedUserData)

    return updatedUserData;

}

export async function getChat(id : string)  {

    console.log(id)

    const response = await fetch(`http://localhost:5000/api/chat/${id}`, {
        method : "GET",
        headers : { 'Content-Type' : 'application/json' },
    })

    if(!response.ok){
        throw new Error("error occured")
    }

    const updatedUserData = await response.json();


    console.log(updatedUserData)

    return updatedUserData;

}