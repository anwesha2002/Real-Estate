import {cleanEnv , port , str} from "envalid";
export default cleanEnv(process.env,{
    MONGODB_URL : str(),
    PORT : port(),
    CLOUDINARY_CLOUD_NAME : str(),
    CLOUDINARY_API_KEY : str(),
    CLOUDINARY_API_SECRET : str()
})