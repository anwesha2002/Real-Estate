import {
    createContext ,
    Dispatch ,
    ReactNode ,
    SetStateAction  ,
    useContext ,
    useEffect ,
    useState
} from "react";
import io , {Socket} from "socket.io-client";
import {api_route } from "../Network/Document_api.ts";
import {ChatRoommodels} from "../Models/chatModels.ts";

interface socketContextProps {
    // setUserConnected : Dispatch<SetStateAction<boolean>>
    // userConnected : boolean
    // setUsers : Dispatch<SetStateAction<any[]>>
    // users : any[]
    setSocketConn : Dispatch<SetStateAction<Socket | any | null >>
    socketConn : Socket | null
    setNotification : Dispatch<SetStateAction<ChatRoommodels | null>>
    notification : ChatRoommodels | null
    // setAuthUser : Dispatch<SetStateAction<any>>
    // authUser : any
    setSelected : Dispatch<SetStateAction<string>>
    selected : string
    // setTotalUnreadCount : Dispatch<SetStateAction<number>>
    // totalUnreadCount : number
}

const socketContext = createContext({} as socketContextProps)

export const useSocket = ()=>{
    return useContext(socketContext)
}

export function SocketContextProvider({children} : {children : ReactNode}){

    // const existingNotif  = JSON.parse(localStorage.getItem("notification"))
    // Object.entries(existingNotif)
    //
    // console.log(existingNotif)

    // const [ userConnected , setUserConnected ] = useState<boolean>(false)
    // const [ users , setUsers ] = useState<any[]>([])
    const [ socketConn , setSocketConn ] = useState<Socket | any | null>(null)
    const [ notification , setNotification ] = useState<ChatRoommodels | null>(null)
    // const [authUser, setAuthUser] = useState<any | null>(null)
    const [selected, setSelected] = useState<string>("")

    const userData = localStorage.getItem("tokens")

    if(!userData) return
    const currentUser = JSON.parse(userData)


    useEffect(()=>{
        if(!socketConn){
            const socket = io(api_route,{
                query: {
                    userId: currentUser?._id,
                },
                transports: ['websocket','polling'],
            })
            setSocketConn(socket)
        }

        socketConn?.emit("setup",currentUser)

    },[currentUser])

    // useCallback(()=>{setNotification(newMessage)},[newMessage])



    useEffect(()=>{

        if(!socketConn) return

        //



        // setNotification(existingNotif)
        //
        // console.log ( selected )
        console.log ( notification )
        // console.log ( existingNotif )


        socketConn.on("updated convo",(newMessage : ChatRoommodels)=> {

            // console.log ( selected )
            // console.log ( notification )
            // console.log ( existingNotif )
            // console.log ( newMessage.chatId )
            console.log ( newMessage )
            setNotification(newMessage)


            // console.log(selected.trim() == " " || selected != newMessage.chatId)

            // console.log("message received" )

            // if (!selected || selected != newMessage.chatId) {
            //
            //     console.log("notification received" )
            //
            //     notification ? setNotification ( [newMessage , ...notification] ) : setNotification ( [newMessage] )
            //     notification ? localStorage.setItem ( "notification" , JSON.stringify ( [newMessage , ...notification] ) ) : localStorage.setItem ( "notification" , JSON.stringify ( [newMessage ] ) )
            //     // existingNotif && localStorage.setItem ( "notification" , JSON.stringify ( [newMessage , ...existingNotif] ) )
            // }



        })

        socketConn.on("read",()=>{
            // const notif = {...notification, unReadCount : 0}
            setNotification(null)
        })

        // console.log(notification)
    })


    return(
        <socketContext.Provider  value={{ setSocketConn, socketConn, notification, setNotification,  selected, setSelected}}>
            {children}
        </socketContext.Provider>
    )
}