import React from 'react';

import {TextField, Button, Box, Typography} from '@mui/material';


const DeviceForm = ({onDeviceAdded}) => {

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            onDeviceAdded({
                name: e.target.name.value,
                serialNumber: e.target.serialNumber.value
            });
            e.target.name.value = '';
            e.target.serialNumber.value = '';
            console.log(e.target.createdAt.value)
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around', // Center the items horizontally
                mt: 5,
                flexWrap: 'wrap' // Allow wrapping to new lines if necessary
            }}
        >
            <TextField
                label="Device Name"
                variant="outlined"
                name="name"
                required
                sx={{ mb: 0, mx: 2, width: 500 }} // Horizontal margin for spacing
            />
            <TextField
                label="Serial Number"
                variant="outlined"
                name="serialNumber"
                required
                sx={{ mb: 0, mx: 2, width: 500 }} // Horizontal margin for spacing
            />
            <Button variant="contained" color="primary" type="submit">Add Device</Button>
        </Box>
    );
};

export default DeviceForm;