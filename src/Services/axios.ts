import axios from 'axios';
export const apiBaseUrl = process.env.NEXT_PUBLIC_HOST;
export const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;


const axiosInstance = axios.create({
    baseURL : apiBaseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export default axiosInstance;