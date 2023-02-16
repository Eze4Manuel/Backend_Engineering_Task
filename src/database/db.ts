import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        mongoose.connect('mongodb://mongodb:27017/mainstack_db');
        console.log('MongoDB Connected');
    } catch (err: any) {
        console.error(err.message);
        process.exit(1);
    }
};