import {Resolver , useForm} from "react-hook-form";
import {
    Box ,
    FilledInput ,
    FormControl ,
    FormGroup , FormHelperText ,
    FormLabel , MenuItem ,
    OutlinedInput , Select , Stack ,
    TextareaAutosize ,
    TextField , Typography
} from "@mui/material";
import {PropertyModel} from "../../Models/PropertyModel.ts";
import {data , useLocation , useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import {info} from "sass";
import {CustomButton} from "../CustomButton.tsx";
import {useState} from "react";
import {createProperty , UpdateProperty} from "../../Network/Document_api.ts";
import {toast, ToastContainer} from "react-toastify";

type PropertyTypes = {
    propertyToEdit? : PropertyModel
}




export function CreateProperty({propertyToEdit} : PropertyTypes) {

    const navigate = useNavigate()

    const location = useLocation()
    console.log(location?.state?.id)

    // const resolver: Resolver<PropertyModel> = async (values) => {
    //     return {
    //         values: values.title ? values : {},
    //         errors: !values.title
    //             ? {
    //                 firstName: {
    //                     type: "required",
    //                     message: "This is required.",
    //                 },
    //             }
    //             : {},
    //     }
    // }

    const [propertyImage, setPropertyImage] = useState({
        name : location?.state?.details?.fileName || "",
        url : location?.state?.details?.photo || ""
    })

    const { register, handleSubmit, formState : {errors , isSubmitting} } = useForm({
        defaultValues: {
            title: location?.state?.details?.title || "",
            description : location?.state?.details?.description || "",
            propertyType : location?.state?.details?.propertyType || "",
            price : location?.state?.details?.price || "",
            location : location?.state?.details?.location || "",
            // propertyImage : {name : "", url : ""},
            // photo : "",
            // email : ""
        }
    })

    const onSubmit = async (data : PropertyModel) => {

        if(!propertyImage.name) alert("enter property image")

        const user = JSON.parse(localStorage.getItem("user"))

        if(location.state)
            await UpdateProperty({id : location?.state?.id },{...data, photo :  propertyImage.url, fileName : propertyImage.name , email :  user.email}).then(()=> {
                toast("Property updated successfully", {
                    type : "success",
                    theme : "colored",
                    position : "top-center",
                    draggable: true,
                })
                setTimeout(()=>{
                    navigate ( "/property" )
                }, 2000)
            })
        else
            await createProperty({...data, photo :  propertyImage.url, fileName : propertyImage.name , email :  user.email})
            .then(()=>navigate("/property"))



        // console.log(data, {photo : propertyImage.url})

    }

    const handleImageChange = (file : File) => {
        const reader = (readFile  : File) => new Promise<string>((resolve,reject)=>{
            const fileReader =  new FileReader();
            // console.log(fileReader)
            fileReader.onload = () => resolve(fileReader.result as string)
            fileReader.readAsDataURL(readFile)
            // reject(fileReader.error)

        })

        reader(file)
            .then((result : string) => setPropertyImage({
            name : file?.name , url : result
        }))
            .catch((error)=>alert(error))

    }


    return (
        <Box>
            create property
            <form className="bg-white m-3 p-4  rounded-3" onSubmit={handleSubmit(onSubmit)}>
                <FormGroup className="  gap-4 ">
                    <FormControl className="gap-1">
                        <FormLabel htmlFor="title">Enter Property Name</FormLabel>
                        <OutlinedInput color="info" type="text" id="title" name="title"  variant="outlined" required {...register("title")}  />
                    {errors?.title && <FormHelperText>{errors.title.message}</FormHelperText>}
                    </FormControl>
                    <FormControl className="gap-1">
                        <FormLabel>Enter Description</FormLabel>
                        <TextareaAutosize minRows={5} placeholder="write your description" color="info" type="text"  style={{width : "100%" , borderRadius : 6 , padding : 10 , background : "transparent" , fontSize : "16px", color : '#919191'}} required {...register("description")}  />
                        {errors?.description && <FormHelperText>{errors.description.message}</FormHelperText>}
                    </FormControl>
                    <Stack direction="row" className="gap-4" flex={1}>
                        <FormControl className="gap-1" sx={{flex : 1}}>
                            <FormLabel htmlFor="propertyType">Enter Property Type</FormLabel>
                            <Select style={{textTransform : "capitalize"}} variant="outlined" color="info" displayEmpty required defaultValue="apartment" inputProps={ { ...register ( "propertyType" ) } }>
                                {["apartment","villa","house","farmHouse" , "condos" , "townhouse", "duplex" , "studio" , "chalet"].map(item=>
                                <MenuItem value={item} style={{textTransform : "capitalize"}}>
                                    {item}
                                </MenuItem>)
                                }
                            </Select>
                            {errors?.propertyType && <FormHelperText>{errors.propertyType.message}</FormHelperText>}
                        </FormControl>
                        <FormControl className="gap-1" sx={{flex : 1}}>
                            <FormLabel htmlFor="price">Enter Property Price</FormLabel>
                            <OutlinedInput color="info" type="text" id="title" name="price"  variant="outlined" required {...register("price")}  />
                            {errors?.price && <FormHelperText>{errors.price.message}</FormHelperText>}
                        </FormControl>
                    </Stack>

                    <FormControl className="gap-1" sx={{flex : 1}}>
                        <FormLabel htmlFor="location">Enter Location</FormLabel>
                        <OutlinedInput color="info" type="text" id="location" name="price"  variant="outlined" required {...register("location")}  />
                        {errors?.location && <FormHelperText>{errors.location.message}</FormHelperText>}
                    </FormControl>

                    <Stack direction="column" gap={1} justifyContent="center" mb={2}>
                        <Stack direction="row" gap={2}>
                            <FormLabel><Typography fontSize={16} fontWeight={500} my="10px">Property Photo</Typography></FormLabel>
                            <Button component="label" sx={ { width : "fit-content", textTransform : "capitalize", fontSize : 16,  }} >
                                Upload *
                                <input  onChange={(e)=>handleImageChange(e.target?.files[0])} hidden accept="image/*" type="file" />
                            </Button>
                        </Stack>
                        <Typography fontSize={14} color="#808191" sx={{wordBreak : "break-all"}}>{propertyImage?.name}</Typography>
                    </Stack>
                </FormGroup>
                {location?.state ?
                    <CustomButton disabled={ isSubmitting } type="submit" title={ isSubmitting ? "Updating..." : "Update" } variant="contained" sx={ { backgroundColor : "#475be8" } }/> :
                    <CustomButton disabled={ isSubmitting } type="submit" title={ isSubmitting ? "Submitting..." : "Submit" } variant="contained" sx={ { backgroundColor : "#475be8" } }/>
                }
                <ToastContainer position="top-center" autoClose={2000}/>
            </form>
        </Box>
    );
}

