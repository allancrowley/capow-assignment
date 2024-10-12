const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    serialNumber: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Device', deviceSchema);