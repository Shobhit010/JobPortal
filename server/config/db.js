import mongoose from "mongoose";

// Fucntion to connect to MongoDB database

const connectDB = async () => {

    mongoose.connection.on('connected', () => console.log('Database connected'))

    await mongoose.connect(`${process.env.MONGODB_URI}/JobPortal`)
}

export default connectDB