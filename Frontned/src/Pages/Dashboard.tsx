import {PieChart} from "../Components/Dashboard/Piechart.tsx";
import {Box , Stack , Typography} from "@mui/material";
import {TotalRevenue} from "../Components/Dashboard/TotalRevenue.tsx";
import {PropertyReferrals} from "../Components/Dashboard/PropertyReferrals.tsx";
import {useEffect , useState} from "react";
import {PropertyCard} from "../Components/Property/PropertyCard.tsx";
import {getProperties} from "../Network/Document_api.ts";
import {PropertyModel} from "../Models/PropertyModel.ts";
import {useSocket} from "../Context/socketContext.tsx";
import {Toast} from "../Util/Toast.ts";

export function Dashboard() {

    const [allProperties , setAllProperties] = useState<PropertyModel[]>([])

    const PieCharts = [
        {
            title : "properties for sale",
            value : "550",
            series : [60,40],
            colors :['#475be8','#e4e8ef']
        },
        {
            title : "properties for sale",
            value : "550",
            series : [60,40],
            colors :['#475be8','#e4e8ef']
        },
        {
            title : "properties for sale",
            value : "550",
            series : [60,40],
            colors :['#475be8','#e4e8ef']
        },
        {
            title : "properties for sale",
            value : "550",
            series : [60,40],
            colors :['#475be8','#e4e8ef']
        }
    ]

    useEffect(()=>{

        (async()=>{
            await getProperties( {sort_parameter : "price", order : "asc", title : "", type : "all", pageSize : 10, start :  0  } ).then(res=>{
                return res as PropertyModel[]
            } )
                .then((data)=>setAllProperties(data))
                .catch((err)=>Toast.error(err?.message || err?.response?.data?.message || "couldn't get properties"))
        }) ()
    },[])

    const { notification } = useSocket()

    console.log(notification)


    return (
        // <HomeScreen>
            <Box flexGrow={1}>
                <Typography className="fw-light fs-4 p-1">Dashboard</Typography>
                <Box
                    // sx={{
                    //     // display: "flex",
                    //     flexWrap: "wrap",
                    //     gap: "20px",
                    //
                    // }}
                >


                <Box flex={1} display="flex" flexWrap="wrap" gap={ 4 }  mt={3}>
                    {PieCharts.map(item=>(
                        <PieChart {...item}/>
                    ))}
                </Box>
                <Box flex={1}  display="flex" flexWrap="wrap">
                    <Stack  gap={2} mt="25px" width="100%"  direction={{xs : "column" , lg : "row"}}>
                        <TotalRevenue/>
                        <PropertyReferrals/>
                    </Stack>
                </Box>
                <Box
                    flex={1}
                    borderRadius="15px"
                    padding="20px"
                    bgcolor="#fcfcfc"
                    display="flex"
                    flexDirection="column"
                    minWidth="100%"
                    mt="25px"
                >
                    <Typography fontSize="18px" fontWeight={600} color="#11142d">
                        Latest Properties
                    </Typography>

                    <Box mt={2.5} sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                        {allProperties.map((property) => (
                            <PropertyCard {...property}/>
                        ))}
                    </Box>
                </Box>
                </Box>

            </Box>

        // </HomeScreen>
    );
}

