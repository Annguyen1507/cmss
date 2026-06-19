import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.0.1.87:3001/api/v1'
});

export default api;