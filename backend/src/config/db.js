import { Mongoose } from "mongoose";
import config from "./index.js";

const connectDB = async () =>{
    try{
        const conn = await mongoose.connect(config.databaseURL,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.uderline);
    }catch(error){
        console.error(`Error: ${error.message}`.red.uderline.bold);
        process.exit(1);
    }
};

export default connectDB;