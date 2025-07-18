import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true, // to include cookies
});

export default instance;