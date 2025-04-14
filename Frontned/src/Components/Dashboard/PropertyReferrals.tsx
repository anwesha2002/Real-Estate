import {Box , LinearProgress , Stack , Typography} from "@mui/material";
import {PropertyReferralsInfo} from "../../Data/Dummy_Property.ts";

interface ProgressBarPrps {
    title : string,
    percentage : number,
    color : string
}
function ProgressBar({title, percentage, color} : ProgressBarPrps){
    // const normalise = (value) => ((value - MIN) * 100) / (MAX - MIN);

    return(
        <Box width="100%">
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography fontSize={16} fontWeight={500} color="#11142d">{title}</Typography>
                <Typography fontSize={16} fontWeight={500} color="#11142d">{percentage}</Typography>
            </Stack>
            <Box width="100%" mt={2}>
                <LinearProgress sx={{'& .MuiLinearProgress-bar': {
                        backgroundColor: color
                    }, bgcolor : "#e4e8ef" }}  variant="determinate" value={percentage} />
            </Box>
        </Box>
    )
}

export function PropertyReferrals() {
    return (
        <Box p={4} flex={1} bgcolor="#fcfcfc" id="chart" minWidth={400} display="flex" flexDirection="column" borderRadius="15px">
            <Typography fontSize={18} fontWeight={600} color="#11142d">Property Referrals</Typography>
            <Stack direction="column" gap={4} mt={3}>
                {PropertyReferralsInfo.map(bar=>(
                    <ProgressBar {...bar}/>
                ))}
            </Stack>
        </Box>
    );
}

