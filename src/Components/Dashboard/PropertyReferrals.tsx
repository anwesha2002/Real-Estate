import {Box , LinearProgress , Stack , Typography} from "@mui/material";
import {PropertyReferralsInfo} from "../../Data/Dummy_Property.ts";


function ProgressBar({title, percentage, color}){
    // const normalise = (value) => ((value - MIN) * 100) / (MAX - MIN);

    return(
        <Box width="100%">
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography fontSize={16} fontWeight={500} color="#11142d">{title}</Typography>
                <Typography fontSize={16} fontWeight={500} color="#11142d">{percentage}</Typography>
            </Stack>
            <Box width="100%" >
                <LinearProgress color={color} variant="determinate" value={percentage} />
            </Box>
        </Box>
    )
}

export function PropertyReferrals() {
    return (
        <Box p={4}   bgcolor="#fcfcfc" id="chart"  display="flex" flexDirection="column" borderRadius="15px">
            <Typography fontSize={18} fontWeight={600} color="#11142d">Property Referrals</Typography>
            <Stack direction="column" gap={4}>
                {PropertyReferralsInfo.map(bar=>(
                    <ProgressBar {...bar}/>
                ))}
            </Stack>
        </Box>
    );
}

