import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://api.kampo-care.fu-it.com',  //https://api.kampo-care.fu-it.com   ||   http://192.168.0.59:3000
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(config => {
    return config;
});

export default apiClient;