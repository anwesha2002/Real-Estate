import {PieChartModels} from "../../Models/piechartModels.ts";
import {Box , Stack , Typography} from "@mui/material";
import ReactApexChart from "react-apexcharts"

export function PieChart({ title , value , series , colors }: PieChartModels) {
    return (
        <Box id="chart" flex={1} display="flex" bgcolor="#fcfcfc" flexDirection="row" justifyContent="space-between" alignItems="center" pl={3.5} py={2} gap={2} borderRadius="15px" minHeight="110px" width="fit-content">
            <Stack direction="column">
                <Typography fontSize={ 14 } color="#808191">{ title }</Typography>
                <Typography fontSize={ 24 } fontWeight={ 700 } color="#11142d" mt={ 1 }>{ value }</Typography>
            </Stack>
            <ReactApexChart series={ series } type="donut" options={ {
                chart : { type : "donut" } ,
                colors : colors ,
                legend : { show : false },
                dataLabels : {enabled : false}
            } } width="120px"/>
        </Box>
    // <div>PieChart</div>
    );
}

