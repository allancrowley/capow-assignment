const mongoose = require('mongoose');
const { mongoUri } = require('../config/config');

let isConnected;

const connect = async () => {
    if (isConnected) return mongoose;

    try {
        await mongoose.connect(mongoUri);
        isConnected = true;
        console.log('Connected to MongoDB');
        return mongoose;
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        throw err;
    }
};

const disconnect = async () => {
    if (isConnected) {
        await mongoose.connection.close();
        isConnected = false;
        console.log('Disconnected from MongoDB');
    }
};

module.exports = { connect, disconnect };