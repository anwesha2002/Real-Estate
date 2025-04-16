import {UserModels} from "../../Models/UserModels.ts";
import {
    Box ,
    DialogContent ,
    DialogTitle ,
    FormControl ,
    FormGroup , FormHelperText ,
    FormLabel ,
    Modal , OutlinedInput ,
    Stack ,
    Typography , useMediaQuery , useTheme
} from "@mui/material";
import {PropertyCard} from "../Property/PropertyCard.tsx";
import {checkImage} from "../../Util/checkImage.ts";
import {MdEmail , MdPages , MdPhone} from "react-icons/md";
import {ModalDialog} from "react-bootstrap";
import {useState} from "react";
import Button from "@mui/material/Button";
import {CustomButton} from "../CustomButton.tsx";
import { useForm} from "react-hook-form";
import {EditUserProfile} from "../../Network/Document_api.ts";


// type FormValues = {
//     _id : string,
//     name : string,
//     email : string,
//     avatar : string,
//     address? : string,
//     ph_no? : string
//     allProperties? : PropertyModel[]
// }

type ProfileProps = {
    profile : UserModels | null,
    type : string
}

// const resolver: Resolver<FormValues> = async (values) => {
//     return {
//         values: values.name ? values : {},
//         errors: !values.name
//             ? {
//                 name : {
//                     type: "required",
//                     message: "This is required.",
//                 },
//             }
//             : {},
//     }
// }

export function Profile( { profile, type } : ProfileProps) {
    const theme = useTheme()

    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"))

    const userData = localStorage.getItem("tokens")

    if(!userData) return

    const user = JSON.parse(userData)
    console.log(profile?.allProperties)

    const iscomplete = user?.ph_no

    const [open, setOpen] = useState(!iscomplete)
    const [photo, setPhoto] = useState<string>(user?.avatar)

    console.log(profile?.name)


    const { register, handleSubmit, formState : { isSubmitting, errors} } = useForm({
        defaultValues : {
            name : user?.name,
            email : user?.email,
            avatar : user?.avatar,
            address : user?.address || "",
            ph_no : user?.ph_no ||  ""
        }
    })

    async function onSubmit(data : UserModels){

        if(!data) return

        if(!profile?._id) return

        console.log(data)
        await EditUserProfile( {id : profile._id},{ ...data, avatar :  photo })
            .then((res)=> {
                localStorage.setItem("tokens", JSON.stringify(res))
                console.log ( res )
            })
            .then(()=>setOpen(false))
            .then(()=>{
                window.location.reload()
            })

    }

    function handleImageChange(file : FileList | null){

        if(!file) return

        const Reader = (readFile : File) => new Promise<string>((resolve)=>{
            const fileReader = new FileReader()
            fileReader.onload = () => resolve(fileReader.result as string)
            fileReader.readAsDataURL(readFile)
        })

        Reader(file[0])
            .then((res)=>setPhoto(res))
            .catch((err)=>console.log(err))
    }

    return (
        <Box className="p-3 ">
            <Box display="flex" flexDirection="row" justifyContent="space-between">
                <Typography  fontSize={25} fontWeight={700} color="#11142D">
                    {type} Profile
                </Typography>

            </Box>
            <Box mt="20px" borderRadius="15px" padding="20px" bgcolor="#FCFCFC">

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        gap: 2.5,
                    }}
                >
                    <img
                        src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
                        width={340}
                        height={320}
                        alt="abstract"
                        className="my_profile-bg"
                    />
                    <Box
                        flex={1}
                        sx={{
                            marginTop: { md: "58px" },
                            marginLeft: { xs: "20px", md: "0px" },
                        }}
                    >
                        <Box
                            flex={1}
                            display="flex"
                            flexDirection={{ xs: "column", md: "row" }}
                            gap="20px"
                        >
                            <img
                                src={
                                    profile?.avatar === "string"
                                        ? profile?.avatar
                                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                                }
                                width={78}
                                height={78}
                                alt="user_profile"
                                className="my_profile_user-img rounded rounded-circle"
                            />

                            <Box
                                flex={1}
                                display="flex"
                                flexDirection="column"
                                justifyContent="space-between"
                                gap="30px"

                            >
                                <Stack direction="column">
                                    <Typography fontSize={22} fontWeight={600} color="#11142D">
                                        {profile?.name}
                                    </Typography>
                                    <Typography fontSize={16} color="#808191">
                                        Realestate Agent
                                    </Typography>
                                </Stack>

                                <Stack direction="column" gap="30px">
                                    <Stack gap="15px">
                                        <Typography fontSize={14} fontWeight={500} color="#808191">
                                            Address
                                        </Typography>
                                        <Box
                                            display="flex"
                                            flexDirection="row"
                                            alignItems="center"
                                            gap="10px"
                                        >
                                            <MdPages style={{ color: "#11142D" }} />
                                            <Typography fontSize={14} color="#11142D">
                                                {profile?.address ? profile?.address : "Not Available"}
                                            </Typography>
                                        </Box>
                                    </Stack>

                                    <Stack direction="row" flexWrap="wrap" gap="20px" pb={4}>
                                        <Stack flex={1} gap="15px">
                                            <Typography fontSize={14} fontWeight={500} color="#808191">
                                                Phone Number
                                            </Typography>
                                            <Box
                                                display="flex"
                                                flexDirection="row"
                                                alignItems="center"
                                                gap="10px"
                                            >
                                                <MdPhone style={{ color: "#11142D" }} />
                                                <Typography fontSize={14} color="#11142D" noWrap>
                                                    { profile?.ph_no ? profile?.ph_no : "Not Available" }
                                                </Typography>
                                            </Box>
                                        </Stack>

                                        <Stack flex={1} gap="15px">
                                            <Typography fontSize={14} fontWeight={500} color="#808191">
                                                Email
                                            </Typography>
                                            <Box
                                                display="flex"
                                                flexDirection="row"
                                                alignItems="center"
                                                gap="10px"
                                            >
                                                <MdEmail style={{ color: "#11142D" }} />
                                                <Typography fontSize={14} color="#11142D">
                                                    {profile?.email}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Box>
                        </Box>
                    </Box>
                    <button className="btn btn-dark btn-sm align-self-start" onClick={()=>setOpen(true)}>{ profile?.address ? "Edit Profile" : "Complete Your Profile" }</button>
                </Box>
            </Box>

            {profile?.allProperties?.length && profile?.allProperties?.length > 0 && (
                <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#FCFCFC">
                    <Typography fontSize={18} fontWeight={600} color="#11142D">
                        {type} Properties
                    </Typography>

                    <Box
                        mt={2.5}
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 2.5,
                        }}
                    >
                        {profile?.allProperties?.map((property) => (
                            <PropertyCard
                                {...property}
                            />
                        ))}
                    </Box>
                </Box>
            )}


                <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={open}
                    onClose={()=>setOpen(false)}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}

                >
                    <ModalDialog

                        // variant="outlined"
                        className={ `bg-secondary-subtle  ${isSmallScreen ?  "w-auto"  : "w-50" }` }
                    >
                        <DialogTitle>Profile</DialogTitle>
                        <DialogContent>
                            <form className={ `bg-white   p-4 w-auto rounded-3 ${isSmallScreen ?  ""  : "m-3"}` } onSubmit={handleSubmit(onSubmit)}>
                                <FormGroup >
                                    <FormControl className="gap-1">
                                        <FormLabel htmlFor="name"> Name</FormLabel>
                                        <OutlinedInput error={!!errors.name} color="info" type="text" id="name"  required {...register("name")}  />
                                        {errors?.name && <FormHelperText>{errors.name.message?.toString()}</FormHelperText>}
                                    </FormControl>
                                    <FormControl className="gap-1">
                                        <FormLabel htmlFor="email"> Email</FormLabel>
                                        <OutlinedInput error={!!errors.email} color="info" type="text" id="email" required {...register("email")}  />
                                        {errors?.email && <FormHelperText>{errors.email.message?.toString()}</FormHelperText>}
                                    </FormControl>

                                    <FormControl className="gap-1">
                                        <FormLabel htmlFor="email"> Address</FormLabel>
                                        <OutlinedInput error={!!errors.address} color="info" type="text" id="email" required {...register("address")}  />
                                        {errors?.avatar && <FormHelperText>{errors.avatar.message?.toString()}</FormHelperText>}
                                    </FormControl>

                                    <FormControl className="gap-1">
                                        <FormLabel htmlFor="ph_no"> Phone Number</FormLabel>
                                        <OutlinedInput error={!!errors.ph_no} color="info" type="text" id="ph_no"  required {...register("ph_no")}  />
                                        {errors?.ph_no && <FormHelperText>{errors.ph_no.message?.toString()}</FormHelperText>}
                                    </FormControl>

                                    <FormControl error={!!errors.avatar} className="gap-1">
                                        <FormLabel><Typography fontSize={16} fontWeight={500} >Avatar</Typography></FormLabel>
                                        <Button component="label" sx={ { width : "fit-content", textTransform : "capitalize", fontSize : 16,  }} >
                                            Upload *
                                            <input {...register("avatar")} onChange={(e)=>handleImageChange(e.target?.files)} hidden accept="image/*" type="file" />
                                        </Button>
                                        {errors?.avatar && <FormHelperText>{errors.avatar.message?.toString()}</FormHelperText>}
                                    </FormControl>
                                </FormGroup>
                                <CustomButton type="submit" title={isSubmitting ? "Submitting..." : "Submit"}  variant="contained" sx={{backgroundColor : "#475be8"}} />
                            </form>
                        </DialogContent>
                    </ModalDialog>
                </Modal>

        </Box>
    );
}

