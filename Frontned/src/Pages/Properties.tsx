import {Box , Stack , Typography} from "@mui/material";
import {Button} from "react-bootstrap";
import {BiPlus} from "react-icons/bi";
import {useNavigate} from "react-router-dom";

export function Properties() {

    const navigate = useNavigate()

    return (
        <Box>
            <Stack direction="row" justifyContent="space-between" p={2}>
                <Typography fontSize={25} fontWeight={700} color="#11142d">All Properties</Typography>
                <Button onClick={()=>{navigate("/property/create")}}>
                    <span ><BiPlus/></span>
                    Add Property
                </Button>
            </Stack>
        </Box>
    );
}

