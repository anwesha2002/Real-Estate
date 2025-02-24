import mongoose from "mongoose"

const connectDb = (url : string | undefined) => {
    if ( url) {
        mongoose.connect ( url )
            .then ( () => console.log ( `mongodb connected ` ) )
            .catch ( (error) => console.log ( error ) )
    }
}

export default connectDb