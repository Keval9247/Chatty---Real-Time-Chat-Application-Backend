const mongoose = require('mongoose');


const MONGO_URI = 'mongodb://localhost:27017/MyChat';

const connectDB = async () => {
    try {
        console.log('MongoDB Connecting...');
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB Connected.');

    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
