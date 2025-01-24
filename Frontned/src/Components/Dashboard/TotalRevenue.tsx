import {Box , Stack , Typography} from "@mui/material";
import {BiUpArrowCircle} from "react-icons/bi";
import ReactApexChart from "react-apexcharts";
import {TotalRevenueOptions , totalRevenueSeries} from "../../Data/chart.config.ts";

export function TotalRevenue() {
    return (
        <Box p={4} flex={2} bgcolor="#fcfcfc" id="chart" display="flex" flexDirection="column" borderRadius="15px">
            <Typography fontSize={18} fontWeight={500}>
                Total Revenue
            </Typography>
            <Stack my="20px" direction="row" gap={4} flexWrap="wrap">
                <Typography fontSize={28} fontWeight={700} color="#11142d">
                    $678,184
                </Typography>
                <Stack direction="row" alignItems="center" gap={1}>
                    <BiUpArrowCircle size={25} color="#475be8"/>
                    <Stack direction="column"  >
                        <Typography fontSize={15}>0.8%</Typography>
                        <Typography fontSize={12}>Than last month</Typography>
                    </Stack>
                </Stack>
            </Stack>
                <ReactApexChart  series={totalRevenueSeries} type="bar" height={310} options={TotalRevenueOptions}/>
        </Box>
    );
}

