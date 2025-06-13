import {
    createContext ,
    Dispatch ,
    ReactNode ,
    SetStateAction , useCallback ,
    useContext ,
    useEffect ,
    useMemo ,
    useState
} from "react";
import io , {Socket} from "socket.io-client";
import {api_route} from "../Network/Document_api.ts";
import _ from "lodash";

interface socketContextProps {
    setUserConnected : Dispatch<SetStateAction<boolean>>
    userConnected : boolean
    setUsers : Dispatch<SetStateAction<any[]>>
    users : any[]
    setSocketConn : Dispatch<SetStateAction<any>>
    socketConn : null
    setNotification : Dispatch<SetStateAction<any[]>>
    notification : any[]
    setAuthUser : Dispatch<SetStateAction<any>>
    authUser : any
    setSelected : Dispatch<SetStateAction<string>>
    selected : string
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

    const [ userConnected , setUserConnected ] = useState<boolean>(false)
    const [ users , setUsers ] = useState<any[]>([])
    const [ socketConn , setSocketConn ] = useState<any>(null)
    const [ notification , setNotification ] = useState<any[]>([])
    const [authUser, setAuthUser] = useState<any | null>(null)
    const [selected, setSelected] = useState<string>("")

    const userData = localStorage.getItem("tokens")

    if(!userData) return
    const currentUser = JSON.parse(userData)

    // const existingNotif  = useCallback(()=>{return  JSON.parse(localStorage.getItem("notification"))},[notification])

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
    },[])



    useEffect(()=>{

        if(!socketConn) return


        socketConn.emit("setup",currentUser)


        // setNotification(existingNotif)

        console.log ( selected )
        console.log ( notification )
        // console.log ( existingNotif )


        socketConn.on("message received",(newMessage)=> {

            console.log ( selected )
            console.log ( notification )
            // console.log ( existingNotif )
            console.log ( newMessage.chatId )
            console.log ( newMessage )

            console.log(selected.trim() == " " || selected != newMessage.chatId)

            console.log("message received" )

            if (!selected || selected != newMessage.chatId) {

                console.log("notification received" )

                notification ? setNotification ( [newMessage , ...notification] ) : setNotification ( [newMessage] )
                notification ? localStorage.setItem ( "notification" , JSON.stringify ( [newMessage , ...notification] ) ) : localStorage.setItem ( "notification" , JSON.stringify ( [newMessage ] ) )
                // existingNotif && localStorage.setItem ( "notification" , JSON.stringify ( [newMessage , ...existingNotif] ) )
            }



        },[selected])


        // const notifGroup = _.groupBy(notification,'chatId')

        // localStorage.setItem("notification",JSON.stringify(notification))

        // socketConn?.emit("setup",currentUser)
        // socketConn?.on("connected",(userdata)=>{
        //     console.log("connected",userdata)
        // })

        console.log(notification)
    })

    // useEffect(()=>{
    //     localStorage.setItem("notification",JSON.stringify(notification))
    // },[notification>0])


    return(
        <socketContext.Provider  value={{userConnected, setUserConnected, setUsers, users, setSocketConn, socketConn, notification, setNotification, setAuthUser, authUser, selected, setSelected}}>
            {children}
        </socketContext.Provider>
    )
}