import axios from 'axios';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token') || null
const BASE_URL = 'http://192.168.0.150:3000/api/'

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;