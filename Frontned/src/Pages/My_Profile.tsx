import {useEffect , useState} from "react";
import {getAgentsById} from "../Network/Document_api.ts";
import {UserModels} from "../Models/UserModels.ts";
import {Profile} from "../Components/My_Profile/Profile.tsx";

export function MyProfile() {

    const userData = localStorage.getItem("tokens")

    if(userData == null) return

    const currentUser = JSON.parse(userData)
    const [profile, setProfile] = useState<UserModels | null>(null)

    useEffect ( () => {
        (async ()=>{
            await getAgentsById( currentUser._id).then(res=>setProfile(res))
        })()
    } , [currentUser?._id ] );

    console.log(profile)

    return (
        <Profile type="My"  profile={profile}  />
    );
}

