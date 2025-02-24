import Button from "@mui/material/Button";
import {BiPlus} from "react-icons/bi";

type customTypeProps = {
    type? : any,
    icon? : any,
    title  : string,
    disabled? :  any,
    [x: string] : any,
    handleClick : () => void
}

export function CustomButton({type, icon,title,disabled,handleClick,...props}  ) {
    return (
        <Button onClick={handleClick} type={type} {...props} disabled={disabled}>
            {icon && <span className="me-2">{ icon }</span> }
            {title}
        </Button>
    );
}

