const http = require('http');
const Router = require('./routes/router');
const { connect, disconnect } = require('./db/mongodb');
const { getDevices, createDevice, updateDevice, deleteDevice } = require('./controllers/deviceController');

const router = new Router();
router.register('GET', '/api/devices', getDevices);
router.register('POST', '/api/devices', createDevice);
router.register('PUT', '/api/devices/:id', updateDevice);
router.register('DELETE', '/api/devices/:id', deleteDevice);

let server;

const shutdownServer = async () => {
    server.close(err => {
        if (err) {
            console.error('Error shutting down server:', err);
        } else {
            console.log('Server shut down gracefully');
        }
    });
    await disconnect();
};

const startServer = async () => {
    server = http.createServer((req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow specific methods
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow specific headers

        // Handle preflight requests
        if (req.method === 'OPTIONS') {
            res.writeHead(204);
            return res.end();
        }

        router.handleRequest(req, res);
    });

    try {
        await connect();
        await new Promise((resolve, reject) => {
            server.listen(5001, (err) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('Server running on port 5001');
                    resolve(server);
                }
            });
        });
        return server;
    } catch (err) {
        console.log('Failed to start server due to MongoDB connection error', err);
        throw err;
    }
}

if (require.main === module) {
    startServer().catch(err => {
        console.error('Failed to start server:', err);
        process.exit(1);
    });
}

module.exports = {startServer, shutdownServer};