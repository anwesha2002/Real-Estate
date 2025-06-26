import {Profile} from "../My_Profile/Profile.tsx";
import {useEffect , useState} from "react";
import {getAgentsById} from "../../Network/Document_api.ts";
import {useParams} from "react-router-dom";
import {UserModels} from "../../Models/UserModels.ts";
import {Toast} from "../../Util/Toast.ts";

export function AgentProfile() {

    const { id } = useParams()

    if(!id) return

    const [profile , setProfile ] =  useState<UserModels | null>(null)
    useEffect ( () => {

        (async ()=>{
            await getAgentsById(id)
                .then(res=> setProfile(res))
                .catch((err)=>Toast.error(err?.message || err?.response?.data?.message || "Couldn't fetch agent details"))
        })()
    } , [] );

    return (
        <Profile type="Agent"  profile={profile}  />

    );
}

