import {Box , Rating , Stack , Typography} from "@mui/material";
import {useNavigate , useParams} from "react-router-dom";
import {useEffect , useState} from "react";
import {DeleteProperty , getPropertyDetails} from "../../Network/Document_api.ts";
import {PropertyModel} from "../../Models/PropertyModel.ts";
import {MdChatBubble , MdDelete , MdEdit , MdPhone , MdPlace} from "react-icons/md";
import logo from "../../assets/img.png"
import {UserModels} from "../../Models/UserModels.ts";
import {CustomButton} from "../CustomButton.tsx";
import {toast , ToastContainer} from 'react-toastify';
import {useCheckImage} from "../../Util/checkImage.ts";

interface detailsType extends PropertyModel{
    creator : UserModels
}

export function PropertyDetails() {

    const id = useParams().id
    const [ details, setDetails] = useState<detailsType>()
    const [value, setValue] = useState<number | null>(2)
    const navigate = useNavigate()

    const userData = localStorage.getItem("tokens")

    if(!userData) return

    useEffect ( () => {
        (async () => {
            if(id) await getPropertyDetails(id).then((res)=>setDetails(res))
        })()
    } , [] );

    const user = JSON.parse(userData)

    const isCurrentUser = user?.email === details?.creator?.email

    const validImage = useCheckImage(details?.creator?.avatar , logo)

    function handleDeleteProperty(id : string){
        const response = confirm("Are you sure you want to delete this property?")
        if(response){
            DeleteProperty ( id )
                .then((res) => {
                    toast(res, {
                        position : "top-center",
                        draggable: true,
                        type: "error",
                        // transition: Bounce,
                        theme : "colored"
                    })

                    setTimeout(() => {
                        navigate('/property');
                    }, 2000);

                })
                .catch(err=>console.log(err))
        }
    }

    function EditOrChat(){
        if(isCurrentUser) navigate("/property/create", {state : { id : id && id, details : details }})
        else{
            navigate(`/messageRoom/${id}-${details?.creator._id}-${user._id}`,{state : {
                secondName : details?.creator._id,
                customer : user?.name,
                name : details?.creator.name,
                propertyName : details?.title
            }})
        }
    }

    function DeleteOrCall(){
        if(!isCurrentUser) return
        if(!confirm("Do you want to delete the property?")) return

         id && handleDeleteProperty ( id )
    }


    return (
        <Box borderRadius="15px"
             padding="20px"
             mr="20px"
             ml="20px"
             bgcolor="#fcfcfc"
             width="fit-content"

        >
            <Typography fontSize={25}>Details</Typography>

            <Box  display="flex"  mt="20px" flexDirection={{xs : "column", lg : "row"}} gap={4}>
                <Box flex={1} maxWidth={764}>
                    <img height={600} width="100%" style={{objectFit : "cover", borderRadius : '10px'}}  src={details?.photo} alt="detailed-property-photo"/>
                    <Box mt="15px">
                        <Stack direction="row" justifyContent="space-between" flexWrap="wrap" alignItems="center">
                            <Typography fontSize={18} fontWeight={500} color="#11142D" textTransform="capitalize">{details?.propertyType}</Typography>
                            <Rating  value={value} onChange={(event, newValue) => {
                                event.preventDefault()
                                setValue(newValue);
                            }}/>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between" flexWrap="wrap"  alignItems="center">
                            <Box>
                                <Typography mt="10px" fontSize={22} fontWeight={600} color="#11142D" textTransform="capitalize">{details?.title}</Typography>
                                <Stack mt={0.5} direction="row" alignItems="center" gap={0.5}>
                                    <MdPlace color="#808191" />
                                    <Typography fontSize={14} color="#808191">
                                        {details?.location}
                                    </Typography>
                                </Stack>
                            </Box>
                            <Box>
                                <Typography mt="10px" fontSize={16} fontWeight={600} color="#11142D" textTransform="capitalize">Price</Typography>
                                <Stack direction="row" alignItems="baseline" gap={1}>
                                    <Typography fontSize={25} fontWeight={700} color="#475BE8">${details?.price}</Typography>
                                    <Typography fontSize={14} color="#808191" >
                                        for one day
                                    </Typography>
                                </Stack>
                            </Box>
                        </Stack>
                        <Stack direction="column" gap="10px" mt="25px" >
                            <Typography fontSize={18} color="#11142D">
                                Description
                            </Typography>
                            <Typography fontSize={14} color="#808191">
                                {details?.description}
                            </Typography>
                        </Stack>
                    </Box>
                </Box>

                <Box  width="100%" flex={1}  maxWidth={ {lg : 326 , xs : "100%"}} display="flex" flexDirection="column" gap="20px">
                    <Stack p={2} width="100%" direction="column" justifyContent="center" alignItems="center" border="1px solid #E4E4E4" borderRadius={2}>
                        <Stack mt={2} justifyContent="center" alignItems="center" textAlign="center">
                            <img src={ validImage }  alt="avatar"
                                 width={90}
                                 height={90}
                                 style={{
                                     borderRadius: "100%",
                                     objectFit: "cover",
                                 }}
                            />
                            <Box mt="15px">
                                <Typography fontSize={18} fontWeight={600} color="#11142D" sx={{ textTransform : "Capitalize" }} >
                                    {details?.creator?.name}
                                </Typography>
                                <Typography
                                    mt="5px"
                                    fontSize={14}
                                    fontWeight={400}
                                    color="#808191"
                                >
                                    Agent
                                </Typography>
                            </Box>
                            <Stack mt="15px" direction="row" alignItems="center" gap={1}>
                                <MdPlace style={{ color: "#808191" }} />
                                <Typography fontSize={14} fontWeight={400} color="#808191">
                                    { details?.creator?.address }
                                </Typography>
                            </Stack>

                            <Typography mt={1} fontSize={16} fontWeight={600} color="#11142D">
                                {details?.creator?.allProperties?.length} Properties
                            </Typography>
                        </Stack>

                        <Stack
                            width="100%"
                            mt="25px"
                            direction="row"
                            flexWrap={ {sm: "nowrap", xs : "wrap" }}
                            gap={2}
                        >
                            <CustomButton
                                title={isCurrentUser ? "Edit" : "Message"}
                                sx={{backgroundColor : "#475BE8", color :"#FCFCFC" }}
                                fullWidth
                                icon={isCurrentUser ? <MdEdit/> : <MdChatBubble/>}
                                handleClick={()=>EditOrChat()}
                            />
                            <CustomButton
                                title={isCurrentUser ? "Delete" : "Call"}
                                sx={{backgroundColor : `${ isCurrentUser ? "#d42e2e" : "#2ED480" }`, color :"#FCFCFC" }}
                                fullWidth
                                icon={isCurrentUser ? <MdDelete/> : <MdPhone/>}
                                handleClick={DeleteOrCall}
                            />
                            <ToastContainer
                                position="top-center"
                                autoClose={5000}

                            />
                        </Stack>
                    </Stack>

                    <Stack>
                        <img
                            src="https://serpmedia.org/scigen/images/googlemaps-nyc-standard.png?crc=3787557525"
                            width="100%"
                            height={306}
                            style={{ borderRadius: 10, objectFit: "cover" }}
                        />
                    </Stack>

                    <Box>
                        <CustomButton
                            title="Book Now"
                            sx={{ backgroundColor : "#475BE8", color : "#FCFCFC" }}
                            fullWidth
                        />
                    </Box>

                </Box>

            </Box>

        </Box>
    );
}

