import {Sidebar} from "../Components/Sidebar.tsx";
import {Navbar} from "../Components/Navbar.tsx";
import {ReactNode} from "react";
import "../Style/Homescreen.scss"

export function HomeScreen({children} : {children : ReactNode}){
    return(

            <div className="homescreen p-0 m-0 h-100" style={{backgroundColor : "#e0ebeb"}}>
                {/*<Navbar/>*/}

                {children}
            </div>

    )
}