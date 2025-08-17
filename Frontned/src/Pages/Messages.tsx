import {ElementType  , useCallback , useEffect   , useState} from "react";
import {clearChat , deleteChat , getAgentsById} from "../Network/Document_api.ts";
import {
    Badge ,
    Box ,
    Button , CircularProgress ,
    Popover ,
    Stack ,
    Typography
} from "@mui/material";
import { MdLocationCity } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSocket} from "../Context/socketContext.tsx";
import _ from "lodash"
import {Toast} from "../Util/Toast.ts";
import { HiDotsVertical} from "react-icons/hi";


interface chatIds {
    chatId : string,
    chatName? : string
    firstUserId? : string,
    // messages : {
    //     from : string,
    //     to : string,
    //     message : string
    // }[],
    secondUserId? : string
    unReadCount : number
}

export function Messages() {

    const userData = localStorage.getItem("tokens")

    if(userData == null) return

    const currentUser = JSON.parse(userData)
    const [allChats, setAllChats] = useState<any[]>([])
    const navigate = useNavigate()
    const [open, setOpen] = useState<boolean>(false)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const {socketConn,notification, setNotification} =  useSocket()
    const [clearChatLoading, setClearChatLoading] = useState<boolean>(false)
    const [deleteChatLoading, setDeleteChatLoading] = useState<boolean>(false)

    useCallback(()=>{setNotification(notification)},[notification])


    useEffect ( () => {
        (async ()=>{
            console.log(currentUser?._id)
            await getAgentsById(currentUser?._id)
                .then((res)=>{
                    console.log(res)
                    setNotification(null)
                    // setNotification(notifGroup)
                    return res.allChatIds as chatIds[]
                })
                .then((data)=>{
                    setAllChats(data )
                })
                .catch((err)=>Toast.error(err?.message || err?.response?.data?.message || "Couldn't fetch agent detail"))
        })()
    } , [notification] );


    socketConn?.on("userLeft",(id : string)=> {
        console.log ( "userLeft : " , id )
    })


    async function clearchat(id : string){
        setClearChatLoading(true)
        await clearChat(id)
            .then(()=>{
                setClearChatLoading(false)
                console.log("cleared")
            })
            .catch((err)=>Toast.error(err?.message || err?.response?.data?.message || "Couldn't clear chat"))
    }

    async function deletechat(e : MouseEvent , id : string){
        setDeleteChatLoading(true)
        e.stopPropagation()
        console.log("start deleting")
        try {
            console.log("About to call deleteChat");
            await deleteChat(id)
            console.log("Updating state...");
            setAllChats(prevState =>  prevState.filter(chat => chat?.chatId !== id) )
            console.log("deleted")
        }catch (err : any){
            Toast.error(err?.message || err?.response?.data?.message || "Couldn't delete chat")
        }finally {
            console.log("Setting loading to false");
            setDeleteChatLoading(false)
            setOpen(false)
            setAnchorEl(null)
        }
        // deleteChat(id)
        //     .then(()=>{
        //
        //         setAllChats(prevState =>  prevState.filter(chat => chat.id !== id) )
        //         console.log("deleted")
        //
        //     })
        //     .catch((err)=>Toast.error(err?.message || err?.response?.data?.message || "Couldn't delete chat"))


    }

    const id = open ? 'simple-popover' : undefined;

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

                {allChats?.length == 0 ?
                    <Typography fontSize={30} fontWeight={100}>
                        No messages to show
                    </Typography>
                    :  allChats.map((chat, index) => (
                    <Box
                        // component={Link as ElementType}
                        // to={`../messageRoom/${chat?.chatId}`}
                        width="100%"
                        className="border border-bottom-0 rounded-4"
                        onClick={()=>{navigate(`../messageRoom/${chat?.chatId}`,{state : { chatDetails : allChats[index] }})}}

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
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            flex={1}
                            gap={{ xs: 4, sm: 2 }}
                        >
                            <Stack  gap={2} direction="row" flexWrap="wrap" alignItems="center" width="fit-content">

                                <Badge color="primary" badgeContent={notification ? notification.chatId === chat.chatId ?  notification?.unReadCount : 0 : chat?.lastMessage?.from === currentUser?._id ? 0 : chat?.unReadCount  } anchorOrigin={{
                                    vertical: 'bottom',

                                }}>

                                {/*<Badge color="primary" badgeContent={notification ? notification?.lastMessage?.from === currentUser?._id ? 0 : notification?.unReadCount : chat?.lastMessage?.from === currentUser?._id ? 0 : chat?.unReadCount  } anchorOrigin={{*/}
                                {/*    vertical: 'bottom',*/}

                                {/*}}>*/}
                                    { chat.propertyImage ? <img width={70} height={70} className="rounded-3" src={chat.propertyImage}/> : <Box height={70} width={70} border={1} className="rounded-3" display="flex" justifyContent="center" alignItems="center"><MdLocationCity size={50} color="green"/></Box> }
                                </Badge>

                                {/*{*/}
                                {/*    currentUser._id === chat.secondUserId ?*/}
                                {/*        <Typography fontSize={22} display="flex" alignSelf="start" color="#11142d" className="text-capitalize">{ chat?.customer }</Typography> :*/}
                                        <Stack display="flex" alignSelf="start">
                                            <Typography fontSize={22} fontWeight={500}  color="#11142d" className="text-capitalize">
                                                { chat.chatName }
                                                {/*{ currentUser?._id === chat.firstUserId._id ? (chat.chatName)?.split ( "-" )[0] + "-" + chat.secondUserId.name : chat.chatName }*/}
                                                {/*{ (chat.chatName)?.split ( "-" )[0] }*/}
                                            </Typography>
                                            <span className="text-capitalize text-body-tertiary fs-6">{ currentUser?._id === chat.secondUserId._id ? chat?.firstUserId?.name : chat?.secondUserId?.name }</span>
                                            {/*<span style={{fontSize:"12px"}} className="text-capitalize text-primary ">online</span>*/}
                                        </Stack>
                                {/*}*/}
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

                            <Box>

                                <Button aria-describedby={id} variant="text" size="small" color="secondary"

                                    className="text-secondary "

                                    onClick={(e )=> {
                                        e.stopPropagation()
                                        e.preventDefault()
                                        setAnchorEl(e.currentTarget);
                                        setOpen ( !open )
                                    }}
                                >
                                    <HiDotsVertical size={ 26 }/>
                                </Button>

                                <Popover
                                    id={id}
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={(e : MouseEvent)=> {
                                        if (e) {
                                            e.stopPropagation();
                                        }
                                        setAnchorEl ( null )
                                        setOpen(false);
                                    }}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                    }}
                                >
                                    <Box display="flex" flexDirection="column" border={1} borderColor="#e0e0e0" >
                                        {clearChatLoading ?
                                            <CircularProgress size={20} color="inherit" className="me-2"/>  : <Typography component={Button as ElementType} onClick={()=>clearchat(chat?.chatId)}  sx={{ p: 2 }} borderBottom={1}>Clear Chat</Typography>
                                        }
                                        {
                                            deleteChatLoading ?
                                                <CircularProgress size={20} color="inherit" className="me-2"/> :
                                                <Typography component={Button as ElementType} onClick={(e : MouseEvent)=> deletechat (e , chat?.chatId )
                                                } sx={{ p: 2 }}>Delete Chat</Typography>
                                        }

                                    </Box>
                                </Popover>

                            </Box>

                        </Stack>
                    </Box>
                    ) ) }
            </Box>
        </Box>
    );
}

