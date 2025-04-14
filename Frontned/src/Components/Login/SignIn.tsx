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
import {CustomButton} from "../CustomButton.tsx";
import {Link , useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {UserModels} from "../../Models/UserModels.ts";
import {login} from "../../Network/Document_api.ts";

export function SignIn() {


    const { handleSubmit, register, formState : {isSubmitting, errors} } = useForm({
        defaultValues : {
            name : "",
            email : "",
        }
    })


    const navigate = useNavigate()

    async function onSubmit(data : UserModels) {
        // console.log( { ...data, avatar : photo })
        await login ( data )
            .then ( (res )  => localStorage.setItem("tokens", `${JSON.stringify(res)}`) )
            .then(()=>navigate("/dashboard"))
            .catch((err)=>console.log(err))
    }


    return (
        <Box height="100vh" display="flex" justifyContent="center" flexDirection="column" alignItems="center">
            <Typography fontSize={22} fontWeight={600} >
                Sign-In
            </Typography>
            <Box className="border border-1 " mt={5} width="50%" sx={ { overflowX : "hidden",  bgcolor : "#b3cccc"}}  justifyContent="center" alignItems="center">

                <form className="bg-white m-3  p-4 w-auto rounded-3" onSubmit={handleSubmit(onSubmit)}>
                    <FormGroup className="  gap-4 ">
                        <FormControl className="gap-1">
                            <FormLabel htmlFor="name">Enter Name</FormLabel>
                            <OutlinedInput error={!!errors.name} color="info" type="text" id="name"  required {...register("name")}  />
                            {errors?.name && <FormHelperText>{errors.name.message?.toString()}</FormHelperText>}
                        </FormControl>
                        <FormControl className="gap-1">
                            <FormLabel htmlFor="email">Enter Email</FormLabel>
                            <OutlinedInput error={!!errors.email} color="info" type="text" id="email"  required {...register("email")}  />
                            {errors?.email && <FormHelperText>{errors.email.message?.toString()}</FormHelperText>}
                        </FormControl>

                    </FormGroup>
                    <Stack direction="row" alignItems="center" gap={2} mt={2}>
                        <CustomButton type="submit" title={isSubmitting ? "Signing In..." : "Sign-In"}  variant="contained" sx={{backgroundColor : "#475be8"}} />
                        <div>
                            don't have an account?
                            <Link className="ms-1" to="/">Sign-Up</Link>
                        </div>
                    </Stack>
                </form>
            </Box>
        </Box>
    );
}
