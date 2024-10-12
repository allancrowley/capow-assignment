import React, {useState} from 'react';

import {
    Button,
    Typography,
    Box,
    TextField,
    Divider,
    TableCell,
    TableHead, TableContainer, TableRow, TableBody, Table
} from '@mui/material';


const DeviceList = ({devices, onDeviceDeleted, onDeviceUpdated}) => {
    const [editingDevice, setEditingDevice] = useState(null);
    const [updatedName, setUpdatedName] = useState('');
    const [updatedSerialNumber, setUpdatedSerialNumber] = useState('');

    const handleEdit = (device) => {
        setEditingDevice(device);
        setUpdatedName(device.name);
        setUpdatedSerialNumber(device.serialNumber);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedDevice = {name: updatedName, serialNumber: updatedSerialNumber};
        onDeviceUpdated(editingDevice._id, updatedDevice);
        setEditingDevice(null);
        setUpdatedName('');
        setUpdatedSerialNumber('');
    };

    const handleDelete = async (id) => {
        onDeviceDeleted(id);
    };


    return (
        <Box sx={{ mt: 3, height: '70vh' }}>
            <Typography variant="h5">Device List</Typography>
            <TableContainer sx={{ height: '90%' }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Serial Number</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {devices.map((device) => (
                            <TableRow key={device._id}>
                                <TableCell>{device.name}</TableCell>
                                <TableCell>{device.serialNumber}</TableCell>
                                <TableCell>{device.createdAt}</TableCell>
                                <TableCell
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        gap: 1,
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleEdit(device)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleDelete(device._id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Divider sx={{ my: 2 }} />
            {editingDevice && (
                <Box
                    component="form"
                    onSubmit={handleUpdate}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        my: 2,
                    }}
                >
                    <TextField
                        value={updatedName}
                        onChange={(e) => setUpdatedName(e.target.value)}
                        placeholder="Device Name"
                        required
                        sx={{ mb: 0, mr: 1, width: '20vw' }}
                    />
                    <TextField
                        value={updatedSerialNumber}
                        onChange={(e) => setUpdatedSerialNumber(e.target.value)}
                        placeholder="Serial Number"
                        required
                        sx={{ mb: 0, mr: 1, width: '20vw'}}
                    />
                    <Button variant="contained" type="submit" sx={{ mr: 1 }}>
                        Update Device
                    </Button>
                    <Button variant="outlined" onClick={() => setEditingDevice(null)}  sx={{ mr: 1 }}>
                        Cancel
                    </Button>
                </Box>
            )}
        </Box>
    );


};

export default DeviceList;