import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connect = await mongoose.connect("mongodb://localhost:27017/domain_week_project");
        console.log(`MongoDB Connected: ${connect.connection.host}`)
    } catch (e) {
        console.log(e)
    }
}
export default connectDB;