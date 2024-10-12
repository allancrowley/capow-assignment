const request = require('supertest');
const Device = require("../models/Device");
const {startServer, shutdownServer} = require("../index");

describe('Device API', () => {
    let server;

    beforeEach(async () => {
        server = await startServer();
        await Device.insertMany([{
                'name': 'Device 1',
                'serialNumber': '12345'
            }]);
    });

    afterEach(async () => {
        await Device.deleteMany({});
        await shutdownServer();
    });


    //POSITIVE FLOW
    test('given device with unique serial number, when POST /api/devices, then should create a new device', async () => {
        const deviceToBeAdded = { name: 'Device1', serialNumber: '123456' };
        const response = await request(server).post('/api/devices').send(deviceToBeAdded);

        expect(response.status).toBe(201);
        expect(response.body).toMatchObject(deviceToBeAdded);
        expect(await Device.countDocuments()).toBe(2);
    });


    test('given DB with devices, when GET /api/devices, then should return all devices list', async () => {
        const response = await request(server).get('/api/devices');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(await Device.countDocuments()).toBe(1);
    });


    test('given empty DB, when GET /api/devices, then should return empty list', async () => {
        await Device.deleteMany({});
        const response = await request(server).get('/api/devices');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(await Device.countDocuments()).toBe(0);
    });


    test('given device id, when PUT /api/devices/:id, then should update an existing device', async () => {
        const newDevice = { name: 'Device2', serialNumber: '654321' };
        const createResponse = await request(server).post('/api/devices').send(newDevice);
        const deviceId = createResponse.body._id;
        const updatedDevice = { name: 'Updated Device' };
        const response = await request(server)
            .put(`/api/devices/${deviceId}`)
            .send(updatedDevice);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe(updatedDevice.name);
    });


    test('given device id, when DELETE /api/devices/:id, then should delete an existing device', async () => {
        const existingDevice = (await Device.find())[0];
        const deviceId = existingDevice._id;

        const response = await request(server).delete(`/api/devices/${deviceId}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Device deleted');
        expect(await Device.countDocuments()).toBe(0);
    });


    //NEGATIVE FLOW
    test('given device with duplicated serial number, when POST /api/devices, then 409 code is returned', async () => {
        const deviceToBeAdded = { name: 'Device1', serialNumber: '12345'};
        const expected = {message: "Device with this serial number already exists."}
        const response = await request(server).post('/api/devices').send(deviceToBeAdded);
        expect(response.status).toBe(409);
        expect(response.body).toMatchObject(expected);
        expect(await Device.countDocuments()).toBe(1);
    });


    test('given non-existing id, when DELETE /api/devices/:id, then 404 code is returned', async () => {
        const response = await request(server).delete(`/api/devices/67115d229021d77d83a9a498`);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Device not found');
        expect(await Device.countDocuments()).toBe(1);
    });


});