import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server"

let mongoServer;

export const connectDB = async () => {
    //Avoid depreceation noise and make queries fast 
    mongoose.set("strictQuery", true);

    let uri = process.env.MONGO_URI;

    const useMemoryDB = process.env.USE_MEMORY_DB === "true" || !uri;

    if(useMemoryDB){
        mongoServer = await MongoMemoryServer.create();
        uri = mongoServer.getUri();
        console.log("Using in memory server")
    }

    if(!uri){
        throw new Error("MONGOURI not defined in env")
    }

    const conn = await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 10000,
    });

    console.log(`Mongo db connected ${conn.connection.host}/${conn.connection.name}` );
    return conn 
}

export const stopDB = async () => {
    await mongoose.disconnect();

    if(mongoServer){
        await mongoServer.stop();
        console.log("In memory server stopped")
    }
}