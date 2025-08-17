import "../Style/Sidebar.scss"
import { useState} from "react";
import {MdArrowBack , MdArrowForward , MdLogout ,} from "react-icons/md";
import {useLocation , useNavigate} from "react-router-dom";
import {useSidebar} from "../Context/SidebarContext.tsx";
import {
    Box ,
    List ,
    ListItem ,
    ListItemButton ,
    ListItemIcon ,
    ListItemText ,
    useMediaQuery ,
    useTheme
} from "@mui/material";
import {resourceProps} from "../Screen/HomeScreen.tsx";
import {useSocket} from "../Context/socketContext.tsx";
import {usePrevLocation} from "./Hooks/UsePrevLocation.ts";

interface sidebarProps {
    resources : resourceProps[],
    drawerOpen : boolean
}

export function Sidebar({drawerOpen,resources} : sidebarProps){
    const [isSelected, setIsSelected] = useState("")
    // const[open, setOpen] = useState(true)
    const navigate= useNavigate()
    const theme = useTheme()

    const userData = localStorage.getItem("tokens")

    if(userData == null) return

    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"))

    const { open, setOpen   } = useSidebar()

    const {socketConn} =  useSocket()

    const location = useLocation()

    const prevLocation = usePrevLocation(location)

    function handleClick(){
        setOpen(!open)
    }

    function logout(){
        if(prevLocation.pathname.includes("/messageRoom/") ) {
            socketConn?.emit("leave room", prevLocation?.state?.chatDetails?.chatId)
        }
        localStorage.removeItem("tokens")
        navigate("/")
    }

    socketConn?.on("userLeft",(id : string)=> {
        console.log ( "userLeft : " , id )
    })



    console.log( prevLocation )




    return(
        <>
            <Box
                // sx={{  zIndex: zIndex.tooltip }}
                className={ ` ${drawerOpen && isSmallScreen ? "w-auto position-absolute " : ""}  sidebar  h-100 border border-2  start-0 top-0 vh-100 ${!open ? "open" : "" }` }

            >


                <div className="d-flex  flex-column gap-4 my-4 justify-content-center align-items-start">
                    <List className="mx-1"
                        // type="none" className=" d-flex flex-column gap-4 my-4 mx-0 "
                    >
                        { resources.map ( (value ) => (
                            <ListItem className="li">
                                <ListItemButton selected={isSelected === value.name} onClick={ (e: any) => {
                                    e.preventDefault ()
                                    setIsSelected ( e.target.textContent )
                                    if(prevLocation.pathname.includes("/messageRoom/") ) {
                                        socketConn?.emit("leave room", prevLocation?.state?.chatDetails?.chatId)
                                    }
                                    navigate(`/${value.link}`)
                                } } className={ `d-flex flex-nowrap  rounded rounded-3 } ` }>
                                {/*<li  >*/}
                                    <ListItemIcon>{ value?.icon }</ListItemIcon>


                                    <ListItemText className={ ` ${open ? "" : "d-none"} ` } primary={value?.name}/>
                                    {/*<span className={ `ms-4 ${open ? "" : "d-none"} ` }>{  }</span>*/}
                                {/*</li>*/}
                                </ListItemButton>
                            </ListItem>
                        ) ) }
                        <ListItem >
                            <ListItemButton onClick={logout}>
                                <ListItemIcon><MdLogout size={20}/></ListItemIcon>
                                <ListItemText className={ ` ${open ? "" : "d-none"} ` } primary="Logout"/>
                            </ListItemButton>
                        </ListItem>
                        {/*<li onClick={logout}>*/}
                        {/*    <MdLogout size={20}/>*/}
                        {/*    <span className={ `ms-4 ${open ? "" : "d-none"} ` }>Logout</span>*/}
                        {/*</li>*/}
                    </List>
                </div>
                <div onClick={ handleClick } style={{backgroundColor :"#b3cccc"}} className=" py-2 d-flex justify-content-center">
                    {open ? <MdArrowBack size={ 26 }/> : <MdArrowForward size={ 26 }/> }
                </div>

            </Box>
        </>
    )
}