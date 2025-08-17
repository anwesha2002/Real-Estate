import {toast} from "react-toastify";

export class Toast{
    static  error(errormessage : string){
        toast.error(errormessage, {theme : "colored"})
    }

    static success(successmessage : string){
        toast.success(successmessage, {theme : "colored"})
    }

    static  info(errormessage : string){
        toast.info(errormessage, {theme : "colored"})
    }
}