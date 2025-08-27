import mongoose from "mongoose";

let isConnected = false;

export async function connect() {
    if (isConnected && mongoose.connection.readyState === 1) {
        console.log("Already connected to MongoDB");
        return;
    }
    
    try {
        console.log("Connecting to MongoDB...");
        
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI environment variable is not defined");
        }
        
        await mongoose.connect(process.env.MONGO_URI, {
            bufferCommands: false,
        });
        
        isConnected = true;
        console.log("MongoDB connected successfully");
        
        const connection = mongoose.connection;
        
        connection.on('connected', () => {
            console.log("MongoDB Connection Successfully");
        });
        
        connection.on('error', (err) => {
            console.error("MongoDB Connection Error:", err);
            isConnected = false;
        });
        
        connection.on('disconnected', () => {
            console.log("MongoDB disconnected");
            isConnected = false;
        });
        
    } catch (err) {
        console.error("MongoDB connection failed:", err);
        isConnected = false;
        throw err;
    }
}