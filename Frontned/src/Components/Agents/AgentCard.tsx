import {UserModels} from "../../Models/UserModels.ts";
import {Link} from "react-router-dom";
import { Box , Stack , Typography} from "@mui/material";
// import {checkImage} from "../../Util/checkImage.ts";
import {ElementType } from "react";
import {MdEmail , MdLocationCity , MdPhone , MdPlace} from "react-icons/md";
import { useCheckImage} from "../../Util/checkImage.ts";

interface agentCardProperties extends UserModels{
    index : number,
    length : number
}

export function AgentCard({_id, name, avatar, email, allProperties, index, length, address, ph_no} : agentCardProperties) {

    const userData = localStorage.getItem("tokens")

    if(userData == null) return

    const currentUser  = JSON.parse(userData)

    console.log(_id)


    const validImage = useCheckImage(avatar , "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png")


    return (
        <Box
            component={Link as ElementType}
            to={currentUser?.email === email ? "/my_profile" : `show/${_id}`}
            width="100%"
            className="border border-bottom-0"
            sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: "20px",
                padding: "20px",
                "&:hover": {
                    boxShadow: index === length-1 ?  "0 -22px 45px 2px rgba(176,176,176,0.1)" : "0 22px 45px 2px rgba(176,176,176,0.1)" ,
                },
                textDecoration : "none"
            }}
        >
            <img
                src={
                    // checkImage(avatar)
                    //         ? avatar
                    //         : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"

                    // avatar || "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                    validImage
                }
                alt="user"
                width={90}
                height={90}
                style={{ borderRadius: 8, objectFit: "cover" }}
            />
            <Stack
                direction="column"
                justifyContent="space-between"
                flex={1}
                gap={{ xs: 4, sm: 2 }}
            >
                <Stack gap={2} direction="row" flexWrap="wrap" alignItems="center">
                    <Typography fontSize={22} fontWeight={600} color="#11142d">
                        {name}
                    </Typography>
                    <Typography fontSize={14} color="#808191">
                        Real-Estate Agent
                    </Typography>
                </Stack>
                <Stack
                    direction="row"
                    flexWrap="wrap"
                    justifyContent="space-between"
                    alignItems="center"
                    gap={2}
                >
                    { [
                        {
                            icon : <MdEmail style={{ color: "#808191" }}/> ,
                            name : `${ email }`
                        } ,
                        {
                            icon : <MdPlace style={{ color: "#808191" }}/> ,
                            name : `${ address ? address : "Not Available" }`
                        } ,
                        {
                            icon : <MdPhone style={{ color: "#808191" }}/> ,
                            name : `${ ph_no ? ph_no : "Not Available" }`
                        } ,
                        {
                            icon : <MdLocationCity style={{ color: "#808191" }}/> ,
                            name : `${ allProperties?.length } properties`
                        }
                    ].map(item=>(
                        <InfoBar icon={item.icon} name={item.name}/>
                    )) }

                    {/*<InfoBar*/}
                    {/*    icon={<EmailOutlined sx={{ color: "#808191" }} />}*/}
                    {/*    name={email}*/}
                    {/*/>*/}
                    {/*<InfoBar icon={<Place sx={{ color: "#808191" }} />} name="London" />*/}
                    {/*<InfoBar*/}
                    {/*    icon={<Phone sx={{ color: "#808191" }} />}*/}
                    {/*    name="+502-3231-4141"*/}
                    {/*/>*/}
                    {/*<InfoBar*/}
                    {/*    icon={<LocationCity sx={{ color: "#808191" }} />}*/}
                    {/*    name={`${noOfProperties} Properties`}*/}
                    {/*/>*/}
                </Stack>
            </Stack>
        </Box>
    );
}

function InfoBar({name , icon} : {name : string, icon : any }){
    return(
        <Stack flex={1}  maxWidth={{xs : "100%", sm : 300}} gap={1.5} alignItems="center" direction="row" >
            <span>{icon}</span>
            <Typography fontSize={14} color="#808191">{name}</Typography>
        </Stack>
    )
}

