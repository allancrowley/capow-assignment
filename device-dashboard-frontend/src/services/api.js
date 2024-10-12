const API_URL = 'http://localhost:5001/api/devices';

export const fetchDevices = async () => {

    const response = await fetch(API_URL);
    const js =  await response.json();
    console.log(js);
    return js;
};


export const createDevice = async (device) => {

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(device),
    });
    return await response.json();
};


export const updateDevice = async (id, updates) => {

    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
    });
    return await response.json();
};


export const deleteDevice = async (id) => {

    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
};