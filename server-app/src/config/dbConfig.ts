import mongoose from "mongoose";
//async - since creating dbconnect 
const connectDb = async () => {
    try {
        const connect = await mongoose.connect(`${process.env.CONNECTION_STRING}`);
        console.log("Database connected: ", connect.connection.host, connect.connection.name);
    }
    catch (error){
        console.log(error);
        process.exit(1);
    }
};

export default connectDb;