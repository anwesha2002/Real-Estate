import {
    Avatar ,
    Box ,
    CircularProgress ,
    OutlinedInput ,
    Paper ,
    Stack ,
    Typography
} from "@mui/material";
import {ChangeEvent , MutableRefObject  , useEffect  , useRef , useState} from "react";
import {MdAttachFile  , MdLocationCity , MdSend} from "react-icons/md";
import {getChat , sendMessage} from "../../Network/Document_api.ts";
import {useLocation , useNavigate , useParams} from "react-router-dom";
import {ChatModels} from "../../Models/chatModels.ts";
import Button from "@mui/material/Button";
import {useCheckImage} from "../../Util/checkImage.ts";
import styles from "../../Style/messageRoom.module.css"
import {DotLottieReact} from "@lottiefiles/dotlottie-react";
import { useSocket} from "../../Context/socketContext.tsx";

interface chatProperties {
    _id : string,
    from : {
        avatar : string,
        name : string,
        _id : string,
    },
    to : {
        avatar : string,
        name : string,
        _id : string,
    },
    chatId : string,
    // chatName : string,
    // customer : string,
    message : string

}

// interface conversationProps {
//     id : string
//     firstUserId : {
//         avatar : string,
//         name : string,
//         _id : string,
//     },
//     secondUserId : {
//         avatar : string,
//         name : string,
//         _id : string,
//     },
//     chatId : string
//     chatName : string
//     customer : string
//     createdAt : string
//     updatedAt : string
//     unReadCount : number
// }

// interface messageProperties {
//     to : string,
//     from : string ,
//     message : string,
//     createdAt : string
// }

export function MessageRoom() {

    const eleRef : MutableRefObject<HTMLDivElement | null | any> = useRef(null)
    const location = useLocation()
    const navigate = useNavigate()

    const {id } = useParams()

    const userData = localStorage.getItem("tokens")
    if(!userData) return
    const currentuser = JSON.parse(userData)



    const [chats, setChats] = useState<chatProperties[]>([])
    const [sendingMessage, setSendingMessage] = useState<boolean>(false)
    const [socketConnected, setSocketConnected] = useState< any>()
    const [typing, setTyping] = useState(false)
    const [isTyping, setIsTyping] = useState(false)
    // const [socket, setSocket] = useState<any>()
    // const [onlineUser,setOnlineUsers] = useState()

    const [messagebody, setInputfield] = useState<ChatModels>({
        to : location?.state?.secondNameId ? location?.state?.secondNameId : location?.state?.chatDetails?.secondUserId?._id != currentuser._id ? location?.state?.chatDetails?.secondUserId?._id : location?.state?.chatDetails?.firstUserId?._id ,
        from : currentuser._id,
        message : "",
        name :  `${location?.state?.propertyName} - ${location?.state?.customer} `,
        customer :  location?.state?.customer ,
        propertyImage : location?.state?.propertyImage
    })

    const {    socketConn : socket, setSelected } = useSocket()

    console.log(location)

    // let count = useMemo(()=>{return 0}, [])




    // const socket  = useMemo(()=>{
    //     return  io(api_route,{
    //         transports: ['websocket','polling'],
    //         // path : '/api/chat',
    //         // reconnectionAttempts: 5
    //         // hostname: 'localhost',
    //         // secure: false,
    //         // port: '5000'
    //     })
    // },[id])

    // selectedChatCompare = useMemo(()=>{
    //     return id
    // },[id])


    // const resetNotif = () => {
    //     notification.filter(notif=>notif.chatId != id)
    // }



    useEffect(()=>{

        if(!socket) return

        socket.emit("setup",currentuser)
        socket.on("connected",()=> {
            setSocketConnected ( true )
        })

        socket.on("typing",(user)=> {
            user === currentuser._id && setIsTyping ( true )
        })
        socket.on("stop typing",()=> {
            setIsTyping ( false )
        })

        socket.on("connect_error", (err) => {
            console.log(`connect_error due to ${err}`);
        });

        (async ()=>{
            await getChat(id as string)
                .then((res)=> {
                    setChats ( res)
                    // setMessages( [...res?.messages])
                    console.log(res)
                    socket?.emit("join chat", id)
                    if(currentuser._id != res[res.length-1].from._id) socket?.emit("mark as read", id , currentuser._id)
                })
                // .then(()=>{
                //     socket?.on("userJoined",(chatData)=>{
                //         console.log("userJoined : ", chatData)
                //         id && setSelected(id)
                //
                //         // setNotification(newNotif)
                //         // console.log(notification)
                //         // console.log(newNotif)
                //     })
                // })
        })()

        // selectedChatCompare = id
        id && setSelected(id)


    },[])

    // useCallback(()=>{
    //     setSelected(id)
    // },[id])


    // console.log(socketConnected)


    // useEffect ( () => {
    //
    //
    //
    //     selectedChatCompare = id
    //     id && setSelected(id)
    //
    // } , [] );

    socket?.on("userJoined",(chatData)=> {
        console.log ( "userJoined : " , chatData )
    })


    async function handleClick(event : any){
        try {

            if(!id) return

            if(messagebody.message.trim().length === 0 || !messagebody.to || messagebody.from) return
            setSendingMessage(true)
            event.preventDefault()
            setInputfield( {to : messagebody.to, from : currentuser._id, message : messagebody.message })

            await sendMessage(  id ,  messagebody )
                .then((result)=>{
                    console.log(result)
                    // console.log(socket)
                    // socket?.emit("newMessage", result);
                    // setMessages((prevState)=>([ ...prevState , result ]))
                    setChats([ ...chats , result ])
                })
                .then(()=>{
                    // setChatID(res._id)
                    setInputfield((prevState)=>({...prevState,message : ""}))
                    eleRef.current = null
                }).then(()=>setSendingMessage(false))
            // console.log(messagebody)

        }catch (e) {
            console.log(e)
        }
    }

    useEffect(()=>{

        eleRef.current?.scrollIntoView();

        // console.log(selectedChatCompare)

        // setSelected(selectedChatCompare)



        // socket?.on("updated convo", (lastConversation) => {
        //     setConvoDetails(lastConversation)
        //
        // });

        // socket?.on("userJoined",(chatId) => {
        //     if(chatId)
        // })

        socket?.on("message received", (newMessageRecieved) => {

            // console.log("message received" )

            // console.log(selectedChatCompare)
            // console.log(newMessageRecieved.chatId)

            // id && setSelected(id)

            // if (
            //     !selectedChatCompare || // if chat is not selected or doesn't match current chat
            //     selectedChatCompare !== newMessageRecieved.chatId
            // ) setSelected(false)
            // else setSelected(true)

            console.log(newMessageRecieved)

            // count += 1;

            // console.log(count)

            // if(count == 5) {
            //     socket?.emit ( "mark as read" , id , currentuser._id )
                // count = 0
            // }

            // if (
            //     !selected || // if chat is not selected or doesn't match current chat
            //     selected !== newMessageRecieved.chatId
            // ) {
            //     // if (!notification.includes(newMessageRecieved)) {
            //     //     setNotification([newMessageRecieved, ...notification]);
            //     //
            //     //     // setFetchAgain(!fetchAgain);
            //     // }
            //
            //     if(notification) setNotification([newMessageRecieved, ...notification]);
            //     else setNotification(newMessageRecieved)
            // } else {
                setChats([...chats, newMessageRecieved]);
            // }
        });

    })

    // console.log(notification)

    function handleTyping(event :  ChangeEvent<HTMLTextAreaElement | HTMLInputElement> ){

        setInputfield ( (prevState) => ({ ...prevState , message : event.target.value }) )

        if(!socketConnected) return

        if(!typing ){
            setTyping(true)
            socket?.emit('typing', { chatId : id, id : messagebody.to })
        }

        const lastTyping = new Date().getTime()
        const timerLength = 3000

        setTimeout(()=>{
            const timeNow = new Date().getTime()
            const timeDiffrence = timeNow - lastTyping
            if(timeDiffrence > timerLength) {
                socket?.emit('stop typing',{ chatId : id, id : messagebody.to })
                setTyping(false)
            }
        },timerLength)

    }

    // console.log(isTyping)
    // console.log(typing)

    function handleImageChange(file : FileList | null){

        if(!file) return
        const reader = (readFile : File) => new Promise<string>((resolve)=>{
            const fileReader = new FileReader()

            fileReader.onload =() => resolve(fileReader.result as string)
            fileReader.readAsDataURL(readFile)
        })

        reader(file[0])
            .then((result : string)=>{
                setInputfield({to : messagebody.to, from : currentuser._id, message : result })
            })
            .then(()=> {
                eleRef.current ? eleRef.current.value = file[0].name : ""
            })
            .catch((error)=>alert(error))

    }



    return (
        <Box>
            <Box className="p-2" >
                <Stack direction="row" display="flex" gap={1} mb={1} alignItems="center">
                    <Typography className=" fs-4 p-1 text-capitalize">
                        {location?.state?.chatDetails ? currentuser._id === location?.state?.chatDetails?.firstUserId?._id ? location?.state?.chatDetails?.chatName.split("-")[0] : location?.state?.chatDetails?.chatName :` ${location?.state?.propertyName} - ${location?.state?.secondNameId}`}
                    </Typography>
                    <button
                        onClick={()=>{
                            const propertyId = id && id.split("-")[0]
                            navigate(`../property/show/${propertyId}`)
                        }}
                        className="btn btn-outline-secondary rounded rounded-pill"><MdLocationCity size={30} className=" rounded rounded-circle "/></button>
                </Stack>
                <Box className="rounded-4 p-3 " flexGrow={1}  sx={{bgcolor : "#fff", height : "90vh", overflowY: "scroll", scrollbarColor : "primary", scrollbarWidth : 10 , display: "flex", flexDirection: "column", justifyContent : "space-between"}}>
                    <Box   sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                        {chats?.map((chat : any, index : number) => (
                            <ChatBubble
                                key={index}
                                message={chat?.message}
                                isSentByCurrentUser={currentuser._id === chat?.from._id}
                                avatar={chat?.from?.avatar }
                            />
                        ))}
                        {
                            isTyping &&
                            <DotLottieReact
                                src="https://lottie.host/3479a7ec-bc6e-4837-bab7-37d9fa276ed4/x1EEs1GQBu.lottie"
                                loop
                                autoplay
                                style={{height : "100px", width : "100px"}}
                            />
                            // <div>typing</div>
                        }
                    </Box>
                    <form onSubmit={handleClick} className="d-flex border border-1 bottom-0 justify-content-end rounded-3 flex-row align-items-center flex-nowrap position-relative">
                        <Button component="label" className="btn  start-0 " >
                            <MdAttachFile size={22}/>
                            <input
                                   onChange={(e)=>handleImageChange(e.target?.files)}
                                   hidden accept="image/*" type="file" />
                        </Button>

                        <OutlinedInput sx={{
                            flexGrow: 1,
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderWidth: 0
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {

                                borderWidth: 0
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {

                                borderWidth: 0
                            },
                            '&:focus': {
                                outline: 'none'
                            },
                            '& .MuiInputBase-input:focus': {
                                // Optional: If you want to remove focus style while typing (no blue background)
                                outline : 'none' ,
                            }
                        }}  onChange={
                            (event)=> {
                            // setInputfield ( (prevState) => ({ ...prevState , message : event.target.value }) )
                                handleTyping(event)
                            }
                        } ref={eleRef} value={eleRef?.current?.value ? eleRef.current.value : messagebody.message}  className="d-flex flex-grow-1 focus:outline-none mui-f" />
                        {sendingMessage ?
                            <CircularProgress size={20} color="inherit" className="me-2"/> :
                            <button  type="submit" className="btn btn-secondary position-absolute end-0 me-2"><MdSend  size={26}/></button>
                        }
                        {/*<ScrollToBottom/>*/}
                    </form>
                </Box>
            </Box>
        </Box>
    );
}

function ChatBubble({ message, isSentByCurrentUser, avatar } : {message : string | undefined, isSentByCurrentUser : boolean, avatar : string | undefined}) {

    const validImage = useCheckImage(message , "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png")

    const [enlarge, setEnlarge] = useState<boolean>(false)


    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                justifyContent: isSentByCurrentUser ? "flex-end" : "flex-start",
                mb: 3
            }}
        >
            <Box  maxWidth="70%"  >
                <Stack direction={isSentByCurrentUser ? "row-reverse" : "row"} gap={2} alignItems="flex-end ">
                    <Avatar src={avatar }/>

                    <Paper elevation={3} style={{ padding: '10px', borderRadius: '10px', backgroundColor: isSentByCurrentUser ? '#DCF8C6' : '#FFFFFF', wordBreak : "break-word", overflowX : "hidden" }} className={`${enlarge ? styles.enlargeImage : styles.normalSize} `}>

                        {
                            validImage ? <img
                                src={ message }
                                // width={78}
                                // height={78}
                                style={{
                                    objectFit: "cover", aspectRatio  : "1:1"
                                }}
                                alt="picture"
                                className={ `h-100 w-100 rounded-full `}
                                onClick={()=>setEnlarge(!enlarge)}
                            /> :
                            <Typography variant="body2" style={{ color: isSentByCurrentUser ? 'black' : 'black' }}>
                                {message}
                            </Typography>
                        }

                    </Paper>
                </Stack>
            </Box>
        </Box>



    );
}

