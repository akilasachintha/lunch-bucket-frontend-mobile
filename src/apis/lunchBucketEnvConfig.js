import axios from "axios";

export const lunchBucketBaseUrl = axios.create({
    baseURL: process.env.EXPO_PUBLIC_LUNCH_BUCKET_API,
});

export const i2AuthBaseUrl = axios.create({
    baseURL: process.env.EXPO_PUBLIC_I2_AUTH_API,
});

export const projectCode = process.env.EXPO_PUBLIC_PROJECT_CODE;

export const ENV_STRING = process.env.EXPO_PUBLIC_ENV.toUpperCase() + ' ENVIRONMENT';
export const ENV = process.env.EXPO_PUBLIC_ENV;

