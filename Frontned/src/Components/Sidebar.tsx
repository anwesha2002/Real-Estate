import "../Style/Sidebar.scss"
import {useRef , useState} from "react";
import {MdArrowBack , MdArrowForward  , MdOutlineDashboard} from "react-icons/md";
import { MdOutlineDomain } from "react-icons/md";
import { MdOutlineGroup } from "react-icons/md";
import { MdOutlineMarkChatRead } from "react-icons/md";
import { MdOutlinePermIdentity } from "react-icons/md";
import { MdOutlineStarBorder } from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {useSidebar} from "../Context/SidebarContext.tsx";
import {resources} from "../App.tsx";




export function Sidebar({resources}){
    const [isSelected, setIsSelected] = useState("")
    // const[open, setOpen] = useState(true)
    const navigate= useNavigate()

    const { open, setOpen   } = useSidebar()

    const sideBarElement = [
        {
            name : "Dashboard",
            icon : <MdOutlineDashboard size={20}/>
        },
        {
            name : "Property",
            icon : <MdOutlineDomain size={20}/>
        },
        {
            name : "Agent",
            icon : <MdOutlineGroup size={20}/>
        },
        {
            name : "Review",
            icon : <MdOutlineStarBorder size={20}/>
        },
        {
            name : "Message",
            icon : <MdOutlineMarkChatRead size={20}/>
        },
        {
            name : "My Profile",
            icon : <MdOutlinePermIdentity size={20}/>
        },
        {
            name : "Logout",
            icon : <MdOutlinePermIdentity size={20}/>
        }
    ]

    function handleClick(){
        setOpen(!open)
    }

    console.log(isSelected)


    return(
        <>

                <div className={ `sidebar border border-2 vh-100 ${!open ? "open" : "" }` }>
                    <div className="d-flex  flex-column gap-4 my-4 justify-content-center align-items-start">
                        <ul  type="none" className=" d-flex flex-column gap-4 my-4 mx-0 ">
                            { resources.map ( (value , index) => (
                                <li onClick={ (e: any) => {
                                    e.preventDefault ()
                                    setIsSelected ( e.target.textContent )
                                    navigate(`/${(e.target.textContent).toLowerCase()}`)
                                } } className={ `d-flex flex-nowrap  ${ isSelected === value.name  ? "active" : "" } ` }>
                                   { value?.icon }
                                    <span className={ `ms-4 ${open ? "" : "d-none"} ` }>{ value?.name }</span>
                                </li>
                            ) ) }
                        </ul>
                    </div>
                    <div onClick={ handleClick } style={{backgroundColor :"#b3cccc"}} className=" py-2 d-flex justify-content-center">
                        {open ? <MdArrowBack size={ 26 }/> : <MdArrowForward size={ 26 }/> }
                    </div>
                </div>

        </>
    )
}