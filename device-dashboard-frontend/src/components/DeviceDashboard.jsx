import React, {useState, useEffect} from 'react';
import DeviceForm from './DeviceForm';
import DeviceList from './DeviceList';
import {fetchDevices, createDevice, deleteDevice, updateDevice} from '../services/api';


const DeviceDashboard = () => {
    const [devices, setDevices] = useState([]);
    const [errMsg, setErrMsg] = useState('');


    useEffect(() => {
        const getDevices = async () => {
            const devicesData = await fetchDevices();
            setDevices(devicesData);
        };

        getDevices();
    }, []);


    const handleDeviceAdded = async (newDevice) => {
        try {
            const createdDevice = await createDevice(newDevice);
            setDevices([...devices, createdDevice]);
            setErrMsg('')
        } catch (err) {
            setErrMsg(`Device with serial number ${newDevice.serialNumber} already exists`);
        }
    };


    const handleDeviceDeleted = async (id) => {
        try {
            await deleteDevice(id);
            setDevices((prevDevices) => prevDevices.filter(device => device._id !== id));
            setErrMsg('')
        } catch (err) {
            setErrMsg(`Device with serial number ${id} already deleted`);
        }
    };


    const handleDeviceUpdated = async (id, deviceToUpdate) => {
        try {
            const updatedDevice = await updateDevice(id, deviceToUpdate);
            const newDevices = devices.filter(device => device._id !== id)
            setDevices([...newDevices, updatedDevice]);
            setErrMsg('')
        } catch (err) {
            setErrMsg(`Device with serial number ${id} not exists`);
        }
    }


    return (
        <div>
            <h1>Device Dashboard</h1>
            <DeviceForm onDeviceAdded={handleDeviceAdded}/>
            <DeviceList devices={devices} onDeviceDeleted={handleDeviceDeleted} onDeviceUpdated={handleDeviceUpdated}/>
            {errMsg && (<h3>{errMsg}</h3>)}
        </div>
    );
};

export default DeviceDashboard;