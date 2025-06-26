import {
    Box ,
    FormControl ,
    FormGroup ,
    FormHelperText ,
    FormLabel ,
    OutlinedInput ,
    Stack ,
    Typography
} from "@mui/material";
import Button from "@mui/material/Button";
import {CustomButton} from "../Components/CustomButton.tsx";
import {useForm} from "react-hook-form";
import {UserModels} from "../Models/UserModels.ts";
import {signUp} from "../Network/Document_api.ts";
import {useState} from "react";
import {Link , useNavigate} from "react-router-dom";
import {Toast} from "../Util/Toast.ts";

export function Login() {
    
    const { handleSubmit, register, formState : {isSubmitting, errors} } = useForm({
        defaultValues : {
            name : "",
            email : "",
            avatar : ""
        }
    })

    const [photo, setPhoto] = useState<string>("")

    const navigate = useNavigate()
    
    async function onSubmit(data : UserModels) {
        // console.log( { ...data, avatar : photo })

        if(!data || !photo) {
            Toast.error("Profile photo not found")
            return
        }

       await signUp ( { ...data, avatar : photo } )
           .then ( (res )  => localStorage.setItem("tokens", `${JSON.stringify(res)}`) )
           .then(()=>navigate("/dashboard"))
           .catch((err)=>Toast.error(err?.message || err?.response?.data?.message || 'Failed to sign-up'))
    }

    function handleImageChange(file : FileList | null){

        if(!file) {
            Toast.error("Photo not found")
            return
        }


        const reader = (readFile : File) => new Promise<string>((resolve)=>{
            const fileReader = new FileReader()
            fileReader.onload = () => resolve(fileReader.result as string)
            fileReader.readAsDataURL(readFile)
        })

        reader(file[0])
            .then((result: string )=>setPhoto(result))
            .catch(console.error)
    }
    
    
    return (
        <Box height="100vh" display="flex" justifyContent="center" flexDirection="column" alignItems="center">
            <Typography fontSize={22} fontWeight={600} >
                Sign-Up
            </Typography>
            <Box className="border border-1 " mt={5} width={{ lg : "50%", md :  "auto"  }} sx={ { overflowX : "hidden",  bgcolor : "#b3cccc"}}  justifyContent="center" alignItems="center">

                <form className="bg-white m-3  p-4 w-auto rounded-3" onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup className="  gap-4 ">
                        <FormControl className="gap-1">
                            <FormLabel htmlFor="name">Enter Name</FormLabel>
                            <OutlinedInput color="info" type="text" id="name"  required {...register("name")}  />
                            {errors?.name && <FormHelperText>{errors.name.message}</FormHelperText>}
                        </FormControl>
                        <FormControl className="gap-1">
                            <FormLabel htmlFor="email">Enter Email</FormLabel>
                            <OutlinedInput color="info" type="text" id="email"  required {...register("email")}  />
                            {errors?.email && <FormHelperText>{errors.email.message}</FormHelperText>}
                        </FormControl>

                        <FormControl className="gap-1">
                            <FormLabel><Typography fontSize={16} fontWeight={500} my="10px">Avatar</Typography></FormLabel>
                            <Button component="label" sx={ { width : "fit-content", textTransform : "capitalize", fontSize : 16,  }} >
                                Upload *
                                <input {...register("avatar")} onChange={(e)=>handleImageChange(e?.target?.files)} hidden accept="image/*" type="file" />
                            </Button>
                            {errors?.avatar && <FormHelperText>{errors.avatar.message}</FormHelperText>}
                        </FormControl>
                    </FormGroup>
                    <Stack direction="row" alignItems="center" gap={2}>
                        <CustomButton type="submit" title={isSubmitting ? "Signing Up..." : "Sign-Up"}  variant="contained" sx={{backgroundColor : "#475be8"}} />
                        <div>
                            or already have an account?
                            <Link className="ms-1" to="signin">Sign-In</Link>
                        </div>
                    </Stack>
                </form>
            </Box>
        </Box>
    );
}

