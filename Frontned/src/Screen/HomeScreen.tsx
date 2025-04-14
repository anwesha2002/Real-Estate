import {Sidebar} from "../Components/Sidebar.tsx";
import {ReactNode , useState} from "react";
import "../Style/Homescreen.scss"
import {
    MdDehaze ,
    MdOutlineDashboard ,
    MdOutlineDomain ,
    MdOutlineGroup ,
    MdOutlineMarkChatRead ,
    MdOutlinePermIdentity ,
    MdOutlineStarBorder
} from "react-icons/md";
import {Backdrop , Box , IconButton , Stack , useMediaQuery , useTheme} from "@mui/material";
import {useNavigate} from "react-router-dom";
import zIndex from "@mui/material/styles/zIndex";

export interface resourceProps {
    name :string
    link? : any
    icon : any
}

export const resources : resourceProps[] = [
    {
        name : "Dashboard",
        icon : <MdOutlineDashboard size={20}/>,
        link : "dashboard"
    },
    {
        name : "Property",
        icon : <MdOutlineDomain size={20}/>,
        link : "property"
    },
    {
        name : "Agent",
        icon : <MdOutlineGroup size={20}/>,
        link : "agent"
    },
    {
        name : "Review",
        icon : <MdOutlineStarBorder size={20}/>,
        link : "review"
    },
    {
        name : "Message",
        icon : <MdOutlineMarkChatRead size={20}/>,
        link : "message"
    },
    {
        name : "My Profile",
        icon : <MdOutlinePermIdentity size={20}/>,
        link : "my_profile"
    }

]

export function HomeScreen({children} : {children : ReactNode} ){

    const navigate = useNavigate()

    const userData = localStorage.getItem("tokens")

    if(userData == null) return

    const user = JSON.parse(userData)
    const iscomplete = user?.ph_no
    const [open , setOpen] = useState(false)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const theme = useTheme()

    const issmallScreen = useMediaQuery(theme.breakpoints.down("lg"))

    function handleOpenMenu(){
        setDrawerOpen(!drawerOpen);
    }

    return(

            // <div className="homescreen p-0 m-0 h-100" style={{backgroundColor : "#e0ebeb"}}>
                <Box flexGrow={1} className="me-0 pe-0  "
                //      style={{
                //     height : "100vh",
                //     "@media (max-width: 768px)": { height: "full" },
                //     "@media (max-width: 540px)": { height: "full" },
                //     // "@media (min-width: 992px)": { height: "100vh" }
                // }}
                     sx={{
                         height: {
                             xs: "100%",  // Small screens
                             sm: "100%",  // Medium-small screens
                             md: "100%",  // Medium screens
                             lg: "100vh"  // Large screens
                         }
                     }}
                >


                    <Backdrop
                        sx={{  zIndex: zIndex.modal  }}
                        open={!iscomplete}
                    >
                        <Stack gap={2} textAlign="center" direction="column" className="bg-secondary-subtle p-5 rounded-4 border border-dark-subtle border-1">
                            <span>Welcome to the RE</span>
                            <span>Please complete your profile first!</span>
                            <button className="btn btn-secondary" onClick={()=> {
                                if(!open) {
                                    navigate ( "/my_profile" )
                                    setOpen(true)
                                }
                                else window.location.reload()
                            }}>Go to profile</button>
                        </Stack>
                    </Backdrop>

                    <Stack display="flex" position="relative" flexDirection="row"
                           // style={{height : "100vh"}}
                    >

                        <IconButton
                            className={ ` ${ issmallScreen ? "d-block" : "d-none" } toggleMenu position-absolute top-0 end-0 me-4 mt-2 btn btn-outline-secondary` }
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenMenu}
                            color="inherit"
                        >
                            <MdDehaze size={23} />
                        </IconButton>

                        {/*<Drawer*/}
                        {/*    open={open}*/}
                        {/*    onClose={handleOpenMenu}*/}
                        {/*>*/}
                            <Box
                                sx={{
                                    bgcolor: "#fcfcfc",
                                    zIndex: zIndex.tooltip,
                                    position  : { lg : "sticky" , md : "absolute" },
                                    top: 0,
                                    display : { md : drawerOpen ? "block" : "none", lg : drawerOpen ? "block" : "block" },
                                    overflow: "hidden",
                                    width : "fit-content",
                                    height : "100vh",

                                }}


                                // style={{width : "fit-content", height : "100vh"}}
                            >
                                <Sidebar drawerOpen={drawerOpen} resources={resources}/>
                            </Box>
                        {/*</Drawer>*/}
                        <Box sx={{height : {
                            xs: "100%",  // Small screens
                            sm: "100%",  // Medium-small screens
                            md: "100%",  // Medium screens
                            lg: "100vh"  // Large screens
                        }, overflowY : "auto"}} width="fit-content" flexGrow={1} style={{ backgroundColor : "#b3cccc"}}>
                            {children}
                        </Box>


                    </Stack>



                    {/*<Box className="position-relative">*/}


                    {/*    <Box className="position-absolute top-50 end-50 bg-danger">*/}
                    {/*        <Stack gap={2} textAlign="center" direction="column">*/}
                    {/*            <span>Welcome to the RE</span>*/}
                    {/*            <span>Please complete your profile first!</span>*/}
                    {/*            <button className="btn btn-secondary">Go to profile</button>*/}
                    {/*        </Stack>*/}
                    {/*    </Box>*/}
                    {/*</Box>*/}



                    {/*<Modal*/}
                    {/*    aria-labelledby="modal-title"*/}
                    {/*    aria-describedby="modal-desc"*/}
                    {/*    open={true}*/}
                    {/*    // onClose={()=>setOpen(false)}*/}
                    {/*    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width : "50%" }}*/}

                    {/*>*/}
                    {/*    <ModalDialog*/}
                    {/*        layout="center"*/}
                    {/*        variant="outlined"*/}
                    {/*        className="bg-secondary-subtle w-50"*/}
                    {/*    >*/}
                    {/*        <DialogTitle textAlign="center">Welcome to the RE</DialogTitle>*/}
                    {/*        <DialogContent>*/}
                    {/*            <Stack gap={2} textAlign="center" direction="column">*/}
                    {/*                <span>Please complete your profile first!</span>*/}
                    {/*                <button className="btn btn-secondary">Go to profile</button>*/}
                    {/*            </Stack>*/}
                    {/*        </DialogContent>*/}
                    {/*    </ModalDialog>*/}
                    {/*</Modal>*/}
                </Box>

            // </div>

    )
}