import axios from 'axios';
import {i2AuthBaseUrl, lunchBucketBaseUrl} from "../apis/lunchBucketEnvConfig";

const BASE_URL = {
    I2_AUTH: i2AuthBaseUrl,
    LUNCHBUCKET: lunchBucketBaseUrl,
};

const createAxiosInstance = (authHook, baseURL) => {
    const instance = axios.create({
        baseURL,
    });

    // Request Interceptor
    instance.interceptors.request.use(
        (config) => {
            const token = authHook.token;

            if (token) {
                config.headers['token'] = `${token}`;
            }

            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Response Interceptor
    instance.interceptors.response.use(
        (response) => {
            if (response.data && response.data.data && response.data.data.state === false) {
                authHook.logout();
                return Promise.reject(response.data);
            }

            return response;
        },
        (error) => {
            if (error.message === 'Network Error') {
                console.error('Network Error:', error);
            } else if (error.response) {
                console.error('HTTP Error:', error.response.status, error.response.data);
            } else {
                console.error('Error:', error);
            }

            return Promise.reject(error);
        }
    );

    return instance;
};

export {createAxiosInstance, BASE_URL};
