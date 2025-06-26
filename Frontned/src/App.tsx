import './App.css'
import {Container} from "react-bootstrap";

import {HomeScreen} from "./Screen/HomeScreen.tsx";
import {Route , Routes} from "react-router";
import {Dashboard} from "./Pages/Dashboard.tsx";
import {Properties} from "./Pages/Properties.tsx";
import {Agents} from "./Pages/Agents.tsx";
import {Reviews} from "./Pages/Reviews.tsx";
import {Messages} from "./Pages/Messages.tsx";
import {MyProfile} from "./Pages/My_Profile.tsx";
import {Logout} from "./Pages/Logout.tsx";
import {PropertyDetails} from "./Components/Property/PropertyDetails.tsx";
import {CreateProperty} from "./Components/Property/CreateProperty.tsx";
import {AgentProfile} from "./Components/Agents/AgentProfile.tsx";
import {Box , Stack} from "@mui/material";
import {Login} from "./Pages/Login.tsx";
import {MessageRoom} from "./Components/Messages/MessageRoom.tsx";
import {SignIn} from "./Components/Login/SignIn.tsx";
import {ToastContainer} from "react-toastify";


function App() {


    // const { socketConn } = useSocket()
    //
    // console.log(socketConn)

    // useEffect(()=>{
    //     setAuthUser(localStorage.getItem("tokens"))
    // },[])



  return (
    <Container fluid >
        <Stack direction="row" display="flex" flex={1} width="100%">
            {/*{   tokens &&*/}
            {/*    <div style={{width : "fit-content"}}>*/}
            {/*        <Sidebar resources={resources}/>*/}
            {/*    </div>*/}
            {/*}*/}

            <Box className="m-0 p-0  w-100  "
                 sx={{flex : 1, flexBasis: '100%', flexGrow: 1 }}
                 style={{width : "auto" }}
            >
                {/*hello*/}

                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/signin" element={<SignIn/>}/>

                    <Route path="/dashboard" element={
                        <HomeScreen>
                            <Dashboard/>
                        </HomeScreen>

                    }/>
                    <Route path="/property" element={
                        <HomeScreen>
                            <Properties/>
                        </HomeScreen>
                    }/>
                    <Route path="/property/show/:id" element={
                        <HomeScreen>
                            <PropertyDetails/>
                        </HomeScreen>
                    }/>
                    <Route path="/property/create" element={
                        <HomeScreen>
                            <CreateProperty/>
                        </HomeScreen>
                    }/>
                    <Route path="/agent" element={
                        <HomeScreen>
                            <Agents/>
                        </HomeScreen>
                    }/>
                    <Route path="/review" element={
                        <HomeScreen>
                            <Reviews/>
                        </HomeScreen>
                    }/>
                    <Route path="/message" element={
                        <HomeScreen>
                            <Messages/>
                        </HomeScreen>
                    }/>
                    <Route path="/my_profile" element={
                        <HomeScreen>
                            <MyProfile/>
                        </HomeScreen>
                    }/>
                    <Route path="/agent/show/:id" element={
                        <HomeScreen>
                            <AgentProfile/>
                        </HomeScreen>
                    }/>
                    <Route path="/logout" element={
                        <HomeScreen>
                            <Logout/>
                        </HomeScreen>
                    }/>
                    <Route path="/messageRoom/:id" element={
                        <HomeScreen>
                            <MessageRoom/>
                        </HomeScreen>
                    }/>

                    {/*<Route path="/home" element={<HomeScreen/>}/>*/}

                </Routes>
            </Box>

        </Stack>
                    {/*<ToastContainer style={{zIndex : 999999999999}} position='top-center'  autoClose={2000}/>*/}
        <ToastContainer
            position="bottom-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            stacked
            style={{zIndex : 99999}}
        />


        {/*<Navbar/>*/}

    </Container>
  )
}

export default App
