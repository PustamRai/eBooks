import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      process.env.MONGODB_URI as string
    );
    console.log(`MongoDB connected : ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("Failed to connected to MongoDB: ", error);
    process.exit(1);
  }
};

export default connectDB;
