import {PropertyModel} from "../../Models/PropertyModel.ts";
import {Box , Card , CardContent , CardMedia  , Stack , Typography} from "@mui/material";
import {MdPlace} from "react-icons/md";
import {ElementType } from "react";
import {Link } from "react-router-dom";

export function PropertyCard({title, photo, price, location, _id } ) {
    return (
        <Card
            component={Link as ElementType}
            to={`/property/show/${_id}`}
            sx={{maxWidth : "330px", padding : "10px", '&:hover' : {boxShadow : "0 22px 45px 2px rgba(176, 176, 176, 0.1)"}, cursor : "pointer",  textDecoration : "none"}}
            elevation={0}


        >
            <CardMedia component="img" width="100%" height={210} image={photo} alt="property photo" sx={{borderRadius : '10px'}} />
            <CardContent sx={ { display : "flex", flexDirection : "row", justifyContent : "space-between", gap : "10px", paddingX : "5px" } }>
                <Stack direction="column" gap={1}>
                    <Typography fontSize={16} fontWeight={550} color="#597e94">{title}</Typography>
                    <Stack direction="row" gap={0.5} alignItems="center">
                        <MdPlace />
                        <Typography fontSize={14} color="#7191a5">
                            {location}
                        </Typography>
                    </Stack>
                </Stack>
                <Box px={1.5} py={0.5} borderRadius={1} bgcolor="lightblue" height="fit-content">
                    <Typography fontSize={12} fontWeight={600} color="slateblue">${price}</Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

