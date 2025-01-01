import {HomeScreen} from "../Screen/HomeScreen.tsx";
import {PieChart} from "../Components/Dashboard/Piechart.tsx";
import {Box , Stack} from "@mui/material";
import {TotalRevenue} from "../Components/Dashboard/TotalRevenue.tsx";
import {PropertyReferrals} from "../Components/Dashboard/PropertyReferrals.tsx";

export function Dashboard() {

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

    return (
        <HomeScreen>
            <h4 className="fw-light fs-4 p-1">Dashboard</h4>
            <Box flex={1} display="flex" flexWrap="wrap" gap={ 4 } px="10px" mt={3}>
                {PieCharts.map(item=>(
                    <PieChart {...item}/>
                ))}
            </Box>
            <Stack ml={2}  gap={2} mt="25px" width="100%"  direction={{xs : "column" , lg : "row"}}>
                <TotalRevenue/>
                <PropertyReferrals/>
            </Stack>
            {/*<div >Dashboard</div>*/}
        </HomeScreen>
    );
}

