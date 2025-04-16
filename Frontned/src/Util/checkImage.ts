import {useEffect , useState} from "react";

export function useCheckImage(url : string | undefined, fallbackImage : any) {

    const [validImageURL, setValidImageURL] = useState<string>(fallbackImage)

    useEffect(()=>{
        if(!url) return
        const image = new Image();
        image.onload = () => setValidImageURL(url)
        image.onerror = () => setValidImageURL(fallbackImage)
        image.src = url

        return () => {
            image.onload = null;
        }

    },[url, fallbackImage])

    return validImageURL


        // const image = new Image();
        // if (typeof url === "string") {
        //     image.src = url;
        // }
        // return image.width !== 0 && image.height !== 0 ;


}