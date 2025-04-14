import Button from "@mui/material/Button";

type customTypeProps = {
    type? : any,
    icon? : any,
    title  : string,
    disabled? :  any,
    handleClick? : () => void
    [key: string]: any,
}

export function CustomButton({type, icon,title,disabled,handleClick, ...props} : customTypeProps  ) {
    return (
        <Button
            type={type}
            onClick={handleClick}
            disabled={disabled}
            { ...props }
        >
            {icon && <span className="me-2">{ icon }</span> }
            {title}
        </Button>
    );
}

