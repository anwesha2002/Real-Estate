import {toast} from "react-toastify";

export class Toast{
    static  error(errormessage : string){
        toast.error(errormessage, {theme : "colored"})
    }

    static success(errormessage : string){
        toast.success(errormessage, {theme : "colored"})
    }

    static  info(errormessage : string){
        toast.info(errormessage, {theme : "colored"})
    }
}