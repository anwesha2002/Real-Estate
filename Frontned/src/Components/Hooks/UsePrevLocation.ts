import {useEffect , useRef} from "react";

export const usePrevLocation = (location :  any) => {

    const prevLocRef = useRef(location)

    useEffect(()=>{

        prevLocRef.current = location

    },[location])

    // console.log("usePrevLocation : " , prevLocRef.current)

    return prevLocRef.current

}