import Button from "@mui/material/Button";

export function CustomButton({type,title,...props}) {
    return (
        <Button type={type} {...props}>
            {title}
        </Button>
    );
}

