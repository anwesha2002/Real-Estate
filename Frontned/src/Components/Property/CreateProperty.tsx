import {useForm} from "react-hook-form";
import {
    Box ,
    FormControl ,
    FormGroup ,
    FormHelperText ,
    FormLabel  ,
    MenuItem ,
    OutlinedInput ,
    Select ,
    Stack ,
    TextareaAutosize  ,
    Typography
} from "@mui/material";
import {PropertyModel} from "../../Models/PropertyModel.ts";
import {useLocation , useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import {CustomButton} from "../CustomButton.tsx";
import {useState} from "react";
import {createProperty , UpdateProperty} from "../../Network/Document_api.ts";
import {Toast} from "../../Util/Toast.ts";



export function CreateProperty() {

    const navigate = useNavigate()

    const location = useLocation()
    console.log(location?.state?.details)

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

    console.log(propertyImage)

    const { register, handleSubmit, formState : {errors , isSubmitting} } = useForm({
        defaultValues: {
            title: location?.state?.details?.title || "",
            description : location?.state?.details?.description || "",
            propertyType : location?.state?.details?.propertyType || "",
            price : location?.state?.details?.price || "",
            location : location?.state?.details?.location || "",
            fileName : location?.state?.details?.fileName || "",
            photo : location?.state?.details?.photo || ""
            // propertyImage : {name : "", url : ""},
            // photo : "",
            // email : ""
        }
    })

    const onSubmit = async (data : PropertyModel) => {

        if(!propertyImage.name) alert("enter property image")

        const userData = localStorage.getItem("tokens")

        if(!userData) return

        const user = JSON.parse(userData)

        if(location.state)
            await UpdateProperty({id : location?.state?.id },{...data, photo :  propertyImage?.url, fileName : propertyImage?.name  , email :  user.email})
                .then(()=> {
                    Toast.success("Property updated successfully")
                // toast("Property updated successfully", {
                //     type : "success",
                //     theme : "colored",
                //     position : "top-center",
                //     draggable: true,
                // })
            })
                .then(()=>navigate ( "/property" ))
                .catch((err)=>Toast.error(err?.message || err?.response?.data?.message || "Property update failed"))
        else
            await createProperty({...data, photo :  propertyImage.url, fileName : propertyImage.name , email :  user.email})
            .then(()=>Toast.success("Property created successfully"))
            .then(()=>navigate("/property"))
            .catch((err)=>Toast.error(err?.message || err?.response?.data?.message || "Couldn't create property "))



        // console.log(data, {photo : propertyImage.url})

    }

    const handleImageChange = (file : FileList | null) => {

        if(!file) return
        const reader = (readFile  : File) => new Promise<string>((resolve)=>{
            const fileReader =  new FileReader();
            // console.log(fileReader)
            fileReader.onload = () => resolve(fileReader.result as string)
            fileReader.readAsDataURL(readFile)
            // reject(fileReader.error)

        })

        reader(file[0])
            .then((result : string) => setPropertyImage({
            name : file[0]?.name , url : result
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
                        <OutlinedInput error={!!errors.title} color="info" type="text" id="title" required {...register("title")}  />
                    {errors?.title && <FormHelperText error>{errors.title.message?.toString()}</FormHelperText>}
                    </FormControl>
                    <FormControl className="gap-1" error={!!errors.description}>
                        <FormLabel>Enter Description</FormLabel>
                        <TextareaAutosize  minRows={5} placeholder="write your description" color="info"   style={{width : "100%" , borderRadius : 6 , padding : 10 , background : "transparent" , fontSize : "16px", color : '#919191'}} required {...register("description")}  />
                        {errors?.description && <FormHelperText error>{errors.description.message?.toString()}</FormHelperText>}
                    </FormControl>
                    <Stack direction="row" className="gap-4" flex={1}>
                        <FormControl className="gap-1" sx={{flex : 1}}>
                            <FormLabel htmlFor="propertyType">Enter Property Type</FormLabel>
                            <Select error={!!errors.propertyType} style={{textTransform : "capitalize"}}  color="info" displayEmpty required defaultValue="apartment" inputProps={ { ...register ( "propertyType" ) } }>
                                {["apartment","villa","house","farmHouse" , "condos" , "townhouse", "duplex" , "studio" , "chalet"].map(item=>
                                <MenuItem value={item} style={{textTransform : "capitalize"}}>
                                    {item}
                                </MenuItem>)
                                }
                            </Select>
                            {errors?.propertyType && <FormHelperText error>{errors.propertyType.message?.toString()}</FormHelperText>}
                        </FormControl>
                        <FormControl className="gap-1" sx={{flex : 1}}>
                            <FormLabel htmlFor="price">Enter Property Price</FormLabel>
                            <OutlinedInput error={!!errors.price} color="info" type="text" id="price"  required {...register("price")}  />
                            {errors?.price && <FormHelperText error>{errors.price.message?.toString()}</FormHelperText>}
                        </FormControl>
                    </Stack>

                    <FormControl  className="gap-1" sx={{flex : 1}}>
                        <FormLabel htmlFor="location">Enter Location</FormLabel>
                        <OutlinedInput error={!!errors.location} color="info" type="text" id="location"  required {...register("location")}  />
                        {errors?.location && <FormHelperText >{errors.location.message?.toString()}</FormHelperText>}
                    </FormControl>

                    <Stack direction="column" gap={1} justifyContent="center" mb={2}>
                        <Stack direction="row" gap={2}>
                            <FormLabel><Typography fontSize={16} fontWeight={500} my="10px">Property Photo</Typography></FormLabel>

                                <Button component="label" sx={ { width : "fit-content", textTransform : "capitalize", fontSize : 16,  }} >
                                    Upload *
                                    <input name={propertyImage?.name}  onChange={(e)=>handleImageChange(e.target?.files)} hidden accept="image/*" type="file" />
                                </Button>

                        </Stack>
                        <Typography fontSize={14} color="#808191" sx={{wordBreak : "break-all"}}>{propertyImage?.name}</Typography>
                    </Stack>
                </FormGroup>
                {location?.state ?
                    <CustomButton disabled={ isSubmitting } type="submit" title={ isSubmitting ? "Updating..." : "Update" } variant="contained" sx={ { backgroundColor : "#475be8" } }/> :
                    <CustomButton disabled={ isSubmitting } type="submit" title={ isSubmitting ? "Submitting..." : "Submit" } variant="contained" sx={ { backgroundColor : "#475be8" } }/>
                }
                <CustomButton className="ms-4" handleClick={()=>{navigate("/property")}} type="button" title={ "Cancel" } variant="contained" sx={ { backgroundColor : "red" } }/>
                {/*<ToastContainer position="top-center" autoClose={2000}/>*/}
            </form>
        </Box>
    );
}

