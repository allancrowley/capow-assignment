const Device = require('../models/Device');


const getDevices = async (req, res) => {
    try {
        const devices = await Device.find();
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(devices));
    } catch (error) {
        console.error(error);
        res.writeHead(500, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: 'Server error'}));
    }
};


const createDevice = async (req, res) => {
    let body = '';

    req.on('data', chunk => body += chunk);

    req.on('end', async () => {
        try {
            const { name, serialNumber } = JSON.parse(body);
            const existingDevice = await Device.findOne({ serialNumber });

            console.log(await Device.find())
            if (existingDevice) {
                console.error('Error: serialNumber must be unique:', serialNumber);
                res.writeHead(409, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ message: 'Device with this serial number already exists.' }));
            }

            const newDevice = new Device({ name, serialNumber });
            await newDevice.save();
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newDevice));
        } catch (error) {
            console.error('Error creating device:', error.message);
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Failed to create device', error: error.message }));
        }
    });

    req.on('error', () => {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid request body' }));
    });
};


const updateDevice = async (req, res, id) => {
    let body = '';
    req.on('data', chunk => body += chunk);

    req.on('end', async () => {
        try {
            const updates = JSON.parse(body);
            const updatedDevice = await Device.findByIdAndUpdate(id, updates, {new: true});
            if (!updatedDevice) {
                return res.writeHead(404, {'Content-Type': 'application/json'})
                    .end(JSON.stringify({message: 'Device not found'}));
            }
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(updatedDevice));
        } catch (error) {
            console.error(error); // Log the error for debugging
            res.writeHead(400, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: 'Failed to update device'}));
        }
    });

    req.on('error', () => {
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: 'Invalid request body'}));
    });
};


const deleteDevice = async (req, res, id) => {
    try {
        const deletedDevice = await Device.findByIdAndDelete(id);
        if (!deletedDevice) {
            return res.writeHead(404, {'Content-Type': 'application/json'})
                .end(JSON.stringify({message: 'Device not found'}));
        }
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: 'Device deleted'}));
    } catch (error) {
        console.error(error);
        res.writeHead(500, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: 'Failed to delete device'}));
    }
};


module.exports = {getDevices, createDevice, updateDevice, deleteDevice};