export function checkImage(url : string | undefined){
    const image = new Image();
    if (typeof url === "string") {
        image.src = url;
    }
    return image.width !== 0 && image.height !== 0 ;
}