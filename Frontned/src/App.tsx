import './App.css'
import {Button , Col , Container , Row} from "react-bootstrap";

import {HomeScreen} from "./Screen/HomeScreen.tsx";
import {Navbar} from "./Components/Navbar.tsx";
import {Sidebar} from "./Components/Sidebar.tsx";
import {Route , Router , Routes} from "react-router";
import {Dashboard} from "./Pages/Dashboard.tsx";
import {SideBarProvider , useSidebar} from "./Context/SidebarContext.tsx";
import {Properties} from "./Pages/Properties.tsx";
import {Agents} from "./Pages/Agents.tsx";
import {Reviews} from "./Pages/Reviews.tsx";
import {Messages} from "./Pages/Messages.tsx";
import {MyProfile} from "./Pages/My_Profile.tsx";
import {Logout} from "./Pages/Logout.tsx";
import {
    MdOutlineDashboard ,
    MdOutlineDomain ,
    MdOutlineGroup ,
    MdOutlineMarkChatRead , MdOutlinePermIdentity ,
    MdOutlineStarBorder
} from "react-icons/md";
import {PropertyDetails} from "./Components/Property/PropertyDetails.tsx";
import {CreateProperty} from "./Components/Property/CreateProperty.tsx";
import {EditProperty} from "./Components/Property/EditProperty.tsx";
import {AgentProfile} from "./Components/Agents/AgentProfile.tsx";
import {Stack} from "@mui/material";
import {Login} from "./Pages/Login.tsx";

interface resourceProps {
    name :string
    list? : any
    show? : any
    create? : any
    Edit? : any
    icon : any
}


export const resources : resourceProps[] = [
    {
        name : "Dashboard",
        list :<Dashboard/>,
        icon : <MdOutlineDashboard size={20}/>
    },
    {
        name : "Property",
        list : <Properties/>,
        show : <PropertyDetails/>,
        create : <CreateProperty/>,
        Edit : <EditProperty/>,
        icon : <MdOutlineDomain size={20}/>
    },
    {
        name : "Agent",
        list : <Agents/>,
        show : <AgentProfile/>,
        icon : <MdOutlineGroup size={20}/>
    },
    {
        name : "Review",
        list :<Dashboard/>,
        icon : <MdOutlineStarBorder size={20}/>
    },
    {
        name : "Message",
        list :<Dashboard/>,
        icon : <MdOutlineMarkChatRead size={20}/>
    },
    {
        name : "My Profile",
        list :<MyProfile/>,
        icon : <MdOutlinePermIdentity size={20}/>
    },
    {
        name : "Logout",
        icon : <MdOutlinePermIdentity size={20}/>
    }
]

function App() {

    const { open   } = useSidebar()

    console.log(open)


  return (
    <Container fluid >
        <Stack direction="row" flex={0} width="100%">
            <div className="me-0 pe-0" >
                <Sidebar resources={resources}/>
            </div>
            <div className="m-0 p-0"  style={{width : "100%"}}>
                {/*hello*/}
                <HomeScreen>
                    <Routes>
                        <Route path="/" element={<Login/>}/>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        <Route path="/property" element={<Properties/>}/>
                        <Route path="/property/show/:id" element={<PropertyDetails/>}/>
                        <Route path="/property/create" element={<CreateProperty/>}/>
                        <Route path="/agent" element={<Agents/>}/>
                        <Route path="/review" element={<Reviews/>}/>
                        <Route path="/message" element={<Messages/>}/>
                        <Route path="/my profile" element={<MyProfile/>}/>
                        <Route path="/logout" element={<Logout/>}/>
                    </Routes>
                </HomeScreen>

            </div>
        </Stack>


        {/*<Navbar/>*/}


    </Container>
  )
}

export default App
