import {
    Box ,
    FormControl ,
    FormGroup ,
    FormHelperText ,
    FormLabel , MenuItem ,
    OutlinedInput , Select ,
    Stack ,
    TextareaAutosize , Typography
} from "@mui/material";
import Button from "@mui/material/Button";
import {CustomButton} from "../Components/CustomButton.tsx";
import {useForm} from "react-hook-form";
import {UserModels} from "../Models/UserModels.ts";
import {login} from "../Network/Document_api.ts";
import {useState} from "react";

export function Login() {
    
    const { handleSubmit, register, formState : {isSubmitting, errors} } = useForm({
        defaultValues : {
            name : "",
            email : "",
            avatar : ""
        }
    })

    const [photo, setPhoto] = useState<string>("")
    
    async function onSubmit(data : UserModels) {
        // console.log( { ...data, avatar : photo })
       await login ( { ...data, avatar : photo } )
           .then ( (res )  => localStorage.setItem("tokens", `${JSON.stringify(res)}`) )
           .catch((err)=>console.log(err))
    }

    function handleImageChange(file : File){
        const reader = (readFile : File) => new Promise<string>((resolve, reject)=>{
            const fileReader = new FileReader()
            fileReader.onload = () => resolve(fileReader.result as string)
            fileReader.readAsDataURL(readFile)
        })

        reader(file)
            .then((result: string )=>setPhoto(result))
            .catch(console.error)
    }
    
    
    return (
        <Box flex={1} justifyContent="center" alignItems="center">
            Sign-Up
            <form className="bg-white m-3 p-4 w-50 rounded-3" onSubmit={handleSubmit(onSubmit)}>
                <FormGroup className="  gap-4 ">
                    <FormControl className="gap-1">
                        <FormLabel htmlFor="name">Enter Name</FormLabel>
                        <OutlinedInput color="info" type="text" id="name" name="name"  variant="outlined" required {...register("name")}  />
                        {errors?.name && <FormHelperText>{errors.name.message}</FormHelperText>}
                    </FormControl>
                    <FormControl className="gap-1">
                        <FormLabel htmlFor="email">Enter Email</FormLabel>
                        <OutlinedInput color="info" type="text" id="email" name="email"  variant="outlined" required {...register("email")}  />
                        {errors?.email && <FormHelperText>{errors.email.message}</FormHelperText>}
                    </FormControl>

                    <FormControl className="gap-1">
                        <FormLabel><Typography fontSize={16} fontWeight={500} my="10px">Avatar</Typography></FormLabel>
                        <Button component="label" sx={ { width : "fit-content", textTransform : "capitalize", fontSize : 16,  }} >
                            Upload *
                            <input {...register("avatar")} onChange={(e)=>handleImageChange(e.target?.files[0])} hidden accept="image/*" type="file" />
                        </Button>
                        {errors?.avatar && <FormHelperText>{errors.avatar.message}</FormHelperText>}
                    </FormControl>
                    
                    {/*<Stack direction="row" className="gap-4" flex={1}>*/}
                    {/*    <FormControl className="gap-1" sx={{flex : 1}}>*/}
                    {/*        <FormLabel htmlFor="propertyType">Enter Property Name</FormLabel>*/}
                    {/*        <Select style={{textTransform : "capitalize"}} variant="outlined" color="info" displayEmpty required defaultValue="apartment" {...register("propertyType")}>*/}
                    {/*            {["apartment","villa","house","farmHouse" , "condos" , "townhouse", "duplex" , "studio" , "chalet"].map(item=>*/}
                    {/*                <MenuItem value={item} style={{textTransform : "capitalize"}}>*/}
                    {/*                    {item}*/}
                    {/*                </MenuItem>)*/}
                    {/*            }*/}
                    {/*        </Select>*/}
                    {/*        {errors?.propertyType && <FormHelperText>{errors.propertyType.message}</FormHelperText>}*/}
                    {/*    </FormControl>*/}
                    {/*    <FormControl className="gap-1" sx={{flex : 1}}>*/}
                    {/*        <FormLabel htmlFor="price">Enter Property Price</FormLabel>*/}
                    {/*        <OutlinedInput color="info" type="text"  name="price"  variant="outlined" required {...register("price")}  />*/}
                    {/*        {errors?.price && <FormHelperText>{errors.price.message}</FormHelperText>}*/}
                    {/*    </FormControl>*/}
                    {/*</Stack>*/}

                    {/*<FormControl className="gap-1" sx={{flex : 1}}>*/}
                    {/*    <FormLabel htmlFor="location">Enter Location</FormLabel>*/}
                    {/*    <OutlinedInput color="info" type="text" id="location" name="price"  variant="outlined" required {...register("location")}  />*/}
                    {/*    {errors?.location && <FormHelperText>{errors.location.message}</FormHelperText>}*/}
                    {/*</FormControl>*/}
                    
                    {/*<Stack direction="column" gap={1} justifyContent="center" mb={2}>*/}
                    {/*    <Stack direction="row" gap={2}>*/}
                    {/*        <FormLabel><Typography fontSize={16} fontWeight={500} my="10px">Property Photo</Typography></FormLabel>*/}
                    {/*        <Button component="label" sx={ { width : "fit-content", textTransform : "capitalize", fontSize : 16,  }} >*/}
                    {/*            Upload **/}
                    {/*            <input {...register("propertyImage")} onChange={(e)=>handleImageChange(e.target?.files[0])} hidden accept="image/*" type="file" />*/}
                    {/*        </Button>*/}
                    {/*    </Stack>*/}
                    {/*    <Typography fontSize={14} color="#808191" sx={{wordBreak : "break-all"}}>{propertyImage?.name}</Typography>*/}
                    {/*</Stack>*/}
                </FormGroup>
                <CustomButton type="submit" title={isSubmitting ? "Signing Up..." : "Sign-Up"}  variant="contained" sx={{backgroundColor : "#475be8"}} />
            </form>
        </Box>
    );
}

