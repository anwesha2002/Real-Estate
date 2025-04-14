import {Avatar , Box , OutlinedInput , Paper , Stack , Typography} from "@mui/material";
import {useEffect , useRef , useState} from "react";
import {MdLocationCity , MdSend} from "react-icons/md";
import {getChat , sendMessage} from "../../Network/Document_api.ts";
import {useLocation , useNavigate , useParams} from "react-router-dom";
import {ChatModels} from "../../Models/chatModels.ts";


// const messages = [
//     {
//         to : "abc",
//         from : "anwesha",
//         time : Date.now(),
//         message : "Hello sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg"
//     },
//     {
//         to : "anwesha",
//         from : "abc",
//         time : Date.now(),
//         message : "Hi sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg  sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg  sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg  sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg  sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg  sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg  sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg  sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg sfgigsgsigibsfbsfiubsfugsvbfibfguugbbubrg "
//     }
// ]

export function MessageRoom() {

    const userData = localStorage.getItem("tokens")

    if(!userData) return

    const currentuser = JSON.parse(userData)
    const location = useLocation()
    const [chats, setMessages] = useState<any>([])
    const {id } = useParams()
    const eleRef = useRef<null | HTMLDivElement>(null)
    const navigate = useNavigate()

    console.log(location.state)

    useEffect ( () => {

        (async ()=>{
            await getChat(id as string)
                .then((res)=> {
                    setMessages ( res )
                })
        })()
    } , [] );

    const [messagebody, setInputfield] = useState<ChatModels>({
        to : location?.state?.secondName,
        from : currentuser._id,
        message : "",
        name : location.state ? `${location?.state?.propertyName} - ${location?.state?.name} ` : chats?.chatName,
        customer : location?.state?.customer
    })

    useEffect(()=>{
        (eleRef?.current as HTMLDivElement)?.scrollIntoView()
    },[])

    console.log(eleRef)

    async function handleClick(event : any){

        if(!id) return

        event.preventDefault()
        setInputfield( {to : location?.state?.secondName, from : currentuser._id, message : messagebody.message , name : chats?.name})
        await sendMessage(  id ,  messagebody )
            .then(()=>{
                // setChatID(res._id)
                setInputfield((prevState)=>({...prevState,message : ""}))
            })
        console.log(messagebody)

    }

    console.log(id)



    return (
        <Box>
            <Box className="p-2" >
                <Stack direction="row" display="flex" gap={1} mb={1} alignItems="center">
                    <Typography className=" fs-4 p-1 text-capitalize">
                        {chats?.secondUserId?.name || location?.state?.name}
                        {/*SecondPerson*/}
                    </Typography>
                    <button
                        onClick={()=>{
                            const propertyId = id && id.split("-")[0]
                            navigate(`../property/show/${propertyId}`)
                        }}
                        className="btn btn-outline-secondary rounded rounded-pill"><MdLocationCity size={30} className=" rounded rounded-circle "/></button>
                </Stack>
                <Box className="rounded-4 p-3 " flexGrow={1}  sx={{bgcolor : "#fff", height : "90vh", overflowY: "auto", display: "flex", flexDirection: "column", justifyContent : "space-between"}}>
                    <Box   sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                        {chats?.messages?.map((chat : ChatModels, index : number) => (
                            <ChatBubble
                                key={index}
                                message={chat.message}
                                isSentByCurrentUser={currentuser._id === chat?.from}
                            />
                        ))}
                    </Box>
                    <form onSubmit={handleClick} className="d-flex border border-1 rounded-3 flex-row align-items-center flex-nowrap position-relative">
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
                        }}  onChange={(event)=>(setInputfield((prevState)=> ({...prevState, message : event.target.value })))}  value={messagebody.message}  className="d-flex flex-grow-1 focus:outline-none mui-f" />
                        <button  type="submit" className="btn btn-secondary position-absolute end-0 me-2"><MdSend  size={26}/></button>
                    </form>
                    <div ref={eleRef}></div>
                </Box>
            </Box>
        </Box>
    );
}

function ChatBubble({ message, isSentByCurrentUser } : {message : string , isSentByCurrentUser : boolean}) {
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
                    <Avatar src="Frontned/src/assets/img.png"/>

                    <Paper elevation={3} style={{ padding: '10px', borderRadius: '10px', backgroundColor: isSentByCurrentUser ? '#DCF8C6' : '#FFFFFF', wordBreak : "break-word" }}>


                            <Typography variant="body2" style={{ color: isSentByCurrentUser ? 'black' : 'black' }}>
                                {message}
                            </Typography>

                    </Paper>
                </Stack>
            </Box>
        </Box>



    );
}

