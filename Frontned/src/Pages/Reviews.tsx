import { Box , MenuItem , Rating , Select , Stack , Typography} from "@mui/material";
import { MdPlace} from "react-icons/md";
import {ElementType , useEffect , useState} from "react";
import {getProperties} from "../Network/Document_api.ts";
import {PropertyModel} from "../Models/PropertyModel.ts";
import  Grid  from "@mui/material/Grid2";
import {UserModels} from "../Models/UserModels.ts";
import {Link} from "react-router-dom";

interface propertyDetailsProps extends PropertyModel{
    creator : UserModels
}

export function Reviews() {

    const [allProperties, setAllProperties] = useState<propertyDetailsProps[]>([])
    const [pageSize, setPageSize] = useState<any>(10)

    useEffect(()=>{

        (async()=>{
            await getProperties( {sort_parameter : "avgRating", order : "desc", title : "", type : "all", pageSize : pageSize, start :  0  } )
                .then(res=>{
                return res as propertyDetailsProps[]
            } )
                .then((data)=>setAllProperties(data))
        }) ()
    },[])

    console.log(allProperties)



    return (

            <Box flexGrow={1} mt={2}>
                <Box display="flex"  gap={3}>

                    <Typography fontSize={25} fontWeight={700} color="#11142d">
                        All Reviews
                    </Typography>

                    <Select
                        size="small"
                        variant="outlined"
                        color="info"
                        displayEmpty
                        required
                        defaultValue={10}
                        // value=""
                        onChange={ (e) => setPageSize(e.target.value ? Number(e.target.value) : 14) }
                        inputProps={ { 'aria-label' : 'without label' } }
                    >
                        { [ 10, 20 , 30 , 40 , 50, 'Default'].map ( item => (
                            <MenuItem key={item} value={item}>{ `${ item === 'Default' ? "" : "Show" }` } { item }</MenuItem>
                        ) ) }
                    </Select>
                </Box>

                <Box
                    mt="20px"
                    sx={{
                        // display: "flex",
                        flexWrap: "wrap",
                        gap: "20px",
                        // backgroundColor: "#fcfcfc",
                    }}
                    px={1}
                >
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                    {allProperties.map((props, index)=>

                            <Grid
                                component={Link as ElementType}
                                to={`/property/show/${props._id}`}
                                width="fit-content"
                                className="border border-bottom-0 rounded-4 "
                                key={index} size={{ xs: 2, sm: 4, md: 3 }}
                                sx={{
                                            backgroundColor: "#fcfcfc",

                                            gap: "20px",
                                            padding: "20px",
                                            "&:hover": {
                                                boxShadow: index === length-1 ?  "0 -22px 45px 2px rgba(176,176,176,0.1)" : "0 22px 45px 2px rgba(176,176,176,0.1)" ,
                                            },
                                            textDecoration : "none",
                                            marginBottom : "10px",

                                        }}

                            >
                                <Stack
                                        direction="column"
                                        // justifyContent="space-between"
                                        flex={1}
                                        gap={{ xs: 4, sm: 2 }}

                                    >
                                        <Stack gap={2} direction="column" flexWrap="wrap" >
                                            <Stack direction="row" justifyContent="center">
                                                { props.photo && <img width={100} height={100} className="rounded-3" src={props.photo}/> }

                                            </Stack>


                                            <Stack  direction="row" justifyContent="space-between"  alignItems="center"
                                            >

                                                <Box>
                                                    <Typography className="fs-5 text-capitalize text-black">{props.title}</Typography>
                                                    <Typography  style={{fontSize : "13px"}} className=" text-secondary text-capitalize">{props.propertyType}</Typography>

                                                </Box>

                                                <Box>
                                                    <Typography className="text-black text-capitalize">{props?.creator?.name}</Typography>
                                                    <Stack direction="row" gap={1} >
                                                        <MdPlace color="#597e94"/>
                                                        <Typography style={{fontSize : "13px"}} className=" text-secondary text-capitalize">{props.location}</Typography>
                                                    </Stack>

                                                </Box>
                                            </Stack>

                                            <Stack direction="row" justifyContent="center" gap={1}>

                                                { props.avgRating && <Rating readOnly value={props.avgRating} /> }
                                                {props.count && <Typography>({props.count})</Typography>}

                                            </Stack>


                                        </Stack>

                                    </Stack>
                            </Grid>

                            // <Box
                            //     // component={Link as ElementType}
                            //     // to={`../messageRoom/${chat?.chatId}`}
                            //     width="fit-content"
                            //     className="border border-bottom-0 rounded-4"
                            //     // onClick={()=>{navigate(`../messageRoom/${chat?.chatId}`,{state : { chatDetails : allChats[index] }})}}
                            //
                            //     sx={{
                            //         backgroundColor: "#fcfcfc",
                            //         display: "flex",
                            //         flexDirection: "column",
                            //         gap: "20px",
                            //         padding: "20px",
                            //         "&:hover": {
                            //             boxShadow: index === length-1 ?  "0 -22px 45px 2px rgba(176,176,176,0.1)" : "0 22px 45px 2px rgba(176,176,176,0.1)" ,
                            //         },
                            //         textDecoration : "none",
                            //         marginBottom : "10px"
                            //     }}
                            // >
                            //     <Stack
                            //         direction="column"
                            //         justifyContent="space-between"
                            //         flex={1}
                            //         gap={{ xs: 4, sm: 2 }}
                            //     >
                            //         <Stack gap={2} direction="row" flexWrap="wrap" alignItems="center">
                            //
                            //             { props.photo && <img width={70} height={70} className="rounded-3" src={props.photo}/> }
                            //             <Box>
                            //                 <Typography className="fs-5 text-capitalize">{props.title}</Typography>
                            //                 <Typography style={{fontSize : "13px"}} className=" text-secondary text-capitalize">{props.propertyType}</Typography>
                            //
                            //             </Box>
                            //
                            //         </Stack>
                            //
                            //     </Stack>
                            // </Box>
                )}
                    </Grid>


                </Box>
            </Box>


    );
}

