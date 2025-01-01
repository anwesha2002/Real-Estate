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

function App() {

    const { open   } = useSidebar()

    console.log(open)


  return (
    <Container fluid className="overflow-hidden">


                {/*<Sidebar/>*/}



                {/*    <Routes>*/}
                {/*        <Route path="/dashboard" element={<HomeScreen><Dashboard/></HomeScreen>}/>*/}
                {/*    </Routes>*/}

                <Row>
                    <Col className="me-0 pe-0" xs={open ? 4 : 3} sm={open ? 3 : 3}  md={open ? 2 : 1}>
                        <Sidebar/>
                    </Col>
                    <Col className="m-0 p-0" xs={open ? 8 : 9} sm={open ? 8 : 9} md={open ? 10 : 11} >
                        {/*hello*/}
                        <HomeScreen>
                            <Routes>
                                <Route path="/dashboard" element={<Dashboard/>}/>
                                <Route path="/property" element={<Properties/>}/>
                                <Route path="/agent" element={<Agents/>}/>
                                <Route path="/review" element={<Reviews/>}/>
                                <Route path="/message" element={<Messages/>}/>
                                <Route path="/my profile" element={<MyProfile/>}/>
                                <Route path="/logout" element={<Logout/>}/>
                            </Routes>
                        </HomeScreen>

                    </Col>
                </Row>


        {/*<Navbar/>*/}


    </Container>
  )
}

export default App
