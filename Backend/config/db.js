import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        //Avoid depreceation noise and make queries fast 
    mongoose.set("strictQuery", true);

    let uri = process.env.MONGO_URI;

    if(!uri){
        throw new Error("MONGO_URI not defined in env")
    }

    const conn = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 10000,
    });

    console.log(`Mongo db connected ${conn.connection.host}/${conn.connection.name}` );
    return conn 
    } catch (error) {
        console.error("MongoDB Connection Failed", error.message)
    }
 
};  

export const stopDB = async () => {
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
};