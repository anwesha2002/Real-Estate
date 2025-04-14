import {useEffect , useState} from "react";
import {getAllAgents} from "../Network/Document_api.ts";
import {UserModels} from "../Models/UserModels.ts";
import {Box , Typography} from "@mui/material";
import {AgentCard} from "../Components/Agents/AgentCard.tsx";

export function Agents() {

    const [agents, setAgents] = useState<UserModels[]>([])

    useEffect ( () => {
       ( async () => {
           await getAllAgents()
               .then((res)=>setAgents(res))
       } )()
    } , [] );

    console.log(agents)

    return (
        <Box flexGrow={1}>
            <Typography fontSize={25} fontWeight={700} color="#11142d">
                Agents List
            </Typography>

            <Box
                mt="20px"
                sx={{
                    // display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                    backgroundColor: "#fcfcfc",
                }}
            >
                {agents.map((agent, index) => (
                    <AgentCard {...agent}
                        index={index} length={agents.length}
                        // key={agent._id}
                        // id={agent._id}
                        // name={agent.name}
                        // email={agent.email}
                        // avatar={agent.avatar}
                        // noOfProperties={agent.allProperties?.length}
                    ></AgentCard>
                ))}
            </Box>
        </Box>
    );
}

