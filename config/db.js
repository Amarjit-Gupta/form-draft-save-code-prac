import mongoose from "mongoose";

const connectDB = () => {
    if (!mongoose.connection.readyState) {
        try {
            mongoose.connect("mongodb://localhost:27017/college");
            console.log("database connected...");
        }
        catch (err) {
            console.log("database connectuion failed...");
        }
    }
}

export default connectDB;

