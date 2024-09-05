import mongoose, { mongo } from "mongoose";

const mongoDbUrl:string = process.env.MONGO_DB_URL||'';

if (!mongoDbUrl) console.error("No connection string specified");
let isConnected = false;

export const connectToDB = async () => {
    mongoose.set("strictQuery", true);
    if (isConnected) {
        return ;
    }

    try {
        await mongoose.connect(mongoDbUrl);
        isConnected = true;
    } catch (error) {
        console.error(error);
    }
}

