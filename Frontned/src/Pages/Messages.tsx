import {ElementType , useEffect , useState} from "react";
import {getAgentsById} from "../Network/Document_api.ts";
import {Box , Stack , Typography} from "@mui/material";
import { MdLocationCity } from "react-icons/md";
import {Link} from "react-router-dom";


interface chatIds {
    chatId : string,
    chatName? : string
    firstUserId? : string,
    messages : {
        from : string,
        to : string,
        message : string
    }[],
    secondUserId? : string
}

export function Messages() {

    const userData = localStorage.getItem("tokens")

    if(userData == null) return

    const currentUser = JSON.parse(userData)
    const [allChats, setAllChats] = useState<any[]>([])


    useEffect ( () => {
        (async ()=>{
            console.log(currentUser?._id)
            await getAgentsById(currentUser?._id)
                .then((res)=>{
                    console.log(res)

                    return res.allChatIds as chatIds[]
                })
                .then((data)=>{
                    setAllChats(data )
                })
        })()
    } , [] );

    console.log(allChats)

    return (
        <Box flexGrow={1}>
            <Typography fontSize={25} fontWeight={700} color="#11142d">
                All Messages
            </Typography>

            <Box
                mt="20px"
                sx={{
                    // display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                    // backgroundColor: "#fcfcfc",
                }}
                px={1}


            >
                {allChats.map((chat, index) => (
                    <Box
                        component={Link as ElementType}
                        to={`../messageRoom/${chat?.chatId}`}
                        width="100%"
                        className="border border-bottom-0 rounded-4"

                        sx={{
                            backgroundColor: "#fcfcfc",
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                            gap: "20px",
                            padding: "20px",
                            "&:hover": {
                                boxShadow: index === length-1 ?  "0 -22px 45px 2px rgba(176,176,176,0.1)" : "0 22px 45px 2px rgba(176,176,176,0.1)" ,
                            },
                            textDecoration : "none",
                            marginBottom : "10px"
                        }}
                    >
                        <Stack
                            direction="column"
                            justifyContent="space-between"
                            flex={1}
                            gap={{ xs: 4, sm: 2 }}
                        >
                            <Stack gap={2} direction="row" flexWrap="wrap" alignItems="center">
                                <MdLocationCity size={23} color="green"/>
                                {
                                    currentUser._id === chat.secondUserId ?
                                        <Typography fontSize={22}  color="#11142d" className="text-capitalize">{ chat?.customer }</Typography> :
                                        <>
                                            <Typography fontSize={22} fontWeight={500}  color="#11142d" className="text-capitalize">
                                                { (chat.chatName).split ( "-" )[0] }
                                            </Typography>
                                            <span className="text-capitalize text-body-tertiary fs-6">{ (chat.chatName).split ( "-" )[1] }</span>
                                        </>
                                }
                                {/*<Typography fontSize={22}  color="#11142d" className="text-capitalize">*/}
                                {/*    */}
                                {/*    */}
                                {/*    */}
                                {/*    {user._id === chat.secondUserId ? chat?.customer :  (chat.chatName).split("-")[1]}*/}
                                {/*</Typography>*/}
                                {/*<Typography fontSize={14} color="#808191">*/}
                                {/*    Real-Estate Agent*/}
                                {/*</Typography>*/}
                            </Stack>

                        </Stack>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

