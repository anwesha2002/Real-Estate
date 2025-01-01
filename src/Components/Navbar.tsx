import logo from "../assets/img.png"
import {Nav , Navbar as NavbarBs} from "react-bootstrap"

export function Navbar(){
    return(
        <NavbarBs expand="lg" className="border border-2">
            <NavbarBs.Brand>
                <img height={80} width={80} style={{borderRadius : "50%", marginLeft : "10px"}} src={logo}/>
            </NavbarBs.Brand>
            <NavbarBs.Toggle aria-controls="navbar-nav"/>
            <NavbarBs.Collapse id="navbar-nav" className="absolute">
                <Nav>
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                </Nav>
            </NavbarBs.Collapse>
        </NavbarBs>
    )
}