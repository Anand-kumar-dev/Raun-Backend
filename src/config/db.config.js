import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose";

const dbconnect = async () => {
    const MONGO_URI = process.env.MONGODB_URI;

    if (!MONGO_URI) {
        console.error("MONGO_URI not found in .env");
        process.exit(1);
    }

    try {
        const conn = await mongoose.connect(MONGO_URI, {
            autoIndex: false,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });

        console.log(`Database connected`);
    } catch (error) {
        console.log("database connection failed", error);
    }
};



process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("🔌 MongoDB connection closed due to app termination");
  process.exit(0);
});


export default dbconnect;