import {createContext , Dispatch , ReactNode , SetStateAction , useContext , useState} from "react";

interface sideBarContextProps {
    open : boolean,
    setOpen : Dispatch<SetStateAction<boolean>>
}

const sideBarContext = createContext({} as sideBarContextProps)

export function useSidebar(){
    return useContext(sideBarContext)
}

export function SideBarProvider({children} : {children : ReactNode}){

    const [open, setOpen] = useState<boolean>(true)

    return (
        <sideBarContext.Provider value={{setOpen, open}}>
            {children}
        </sideBarContext.Provider>
    )
}