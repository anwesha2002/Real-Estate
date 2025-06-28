import { useCallback , useEffect , useMemo , useState} from "react";
import { getAgentsById} from "../Network/Document_api.ts";
import {Badge , Box , Stack , Typography} from "@mui/material";
import { MdLocationCity } from "react-icons/md";
import { useNavigate} from "react-router-dom";
import { useSocket} from "../Context/socketContext.tsx";
import _ from "lodash"
import {Toast} from "../Util/Toast.ts";


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
    const {socketConn,notification, setNotification} =  useSocket()

    useCallback(()=>{setNotification(notification)},[notification])

    // const socket  = useMemo(()=>{
    //     return io(`${api_route}`,{
    //         transports: ['websocket','polling'],
    //         // path : '/api/chat',
    //         // reconnectionAttempts: 5
    //         // hostname: 'localhost',
    //         // secure: false,
    //         // port: '5000'
    //     })
    // },[currentUser])

    // let socekt = useMemo(()=>{
    //     return io(`${api_route}/message`
    //     // ,{
    //     //     path : api_route
    //     // }
    //     )
    // },[])

    // const socket  = useMemo(()=>{
    //     return   io(api_route,{
    //         transports: ['websocket','polling'],
    //         // path : '/api/chat',
    //         // reconnectionAttempts: 5
    //         // hostname: 'localhost',
    //         // secure: false,
    //         // port: '5000'
    //     })
    // },[])

    // const [notif, setNotif] = useState()

    // useEffect(()=>{
    //
    //     if(!socketConn) return
    //
    //     socketConn.on("message received",(newMessage)=>{
    //         if(!selected){
    //             setNotification([newMessage,...notification])
    //         }
    //     })
    //
    //     // socketConn?.emit("setup",currentUser)
    //     // socketConn?.on("connected",(userdata)=>{
    //     //     console.log("connected",userdata)
    //     // })
    //
    //     console.log(notification)
    // })

    // console.log(notification)
    // console.log(socketConn)


    // const existingNotif  = JSON.parse(localStorage.getItem("notification"))

    // useEffect(()=>{
    //
    //     setNotification(existingNotif || [])
    // },[setNotification])


    // Object.entries(existingNotif)

    // console.log(existingNotif)


    // console.log(notifGroup)


    // console.log(socketConn)
    // console.log(users)

    // useEffect(()=>{
    //
    //     socketConn?.on("message received", (newMessageRecieved) => {
    //
    //         console.log(notification)
    //         console.log(newMessageRecieved)
    //     });
    //
    //     console.log(notification)
    // },[notification,socketConn])


    // async function isUserInRoom(currentUser?._id, room) {
    //     const sockets = await io.in(room).fetchSockets();
    //     return sockets.some(socket => socket.id === userId); // Check if any socket matches the userId
    // }


    // useEffect ( () => {
    //     socket.leave("myRoom");
    // } , [] );


    useEffect ( () => {
        (async ()=>{
            console.log(currentUser?._id)
            await getAgentsById(currentUser?._id)
                .then((res)=>{
                    console.log(res)
                    socketConn?.emit("leave room", notification?.chatId)
                    setNotification(null)
                    // setNotification(notifGroup)
                    return res.allChatIds as chatIds[]
                })
                .then((data)=>{
                    setAllChats(data )
                })
                .catch((err)=>Toast.error(err?.message || err?.response?.data?.message || "Couldn't fetch agent detail"))
        })()
    } , [] );

    socketConn?.on("userLeft",(id : string)=> {
        console.log ( "userLeft : " , id )
    })

    const notifGroup = useMemo(()=>{return  _.groupBy(allChats,'chatId')},[])
    //
    console.log(notifGroup)
    // console.log(allChats)


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
                            direction="column"
                            justifyContent="space-between"
                            flex={1}
                            gap={{ xs: 4, sm: 2 }}
                        >
                            <Stack gap={2} direction="row" flexWrap="wrap" alignItems="center">

                                <Badge color="primary" badgeContent={notification ?  notification?.unReadCount : chat?.lastMessage?.from === currentUser?._id ? 0 : chat?.unReadCount  } anchorOrigin={{
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
                                                { currentUser?._id === chat.firstUserId._id ? (chat.chatName)?.split ( "-" )[0] + "-" + chat.secondUserId.name : chat.chatName }
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

                        </Stack>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

