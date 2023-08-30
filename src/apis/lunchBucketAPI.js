import axios from 'axios';

if (process.env.NODE_ENV === "development") {
    console.log("Running in development mode");

} else if (process.env.NODE_ENV === "qa") {
    console.log("Running in QA mode");
} else {
    console.log("Running in production mode");
}

const lunchBucketAPI = axios.create({baseURL: process.env.LUNCH_BUCKET_APP_URL});
const auth2API = axios.create({baseURL: 'https://fmrlw0xn6h.execute-api.ap-south-1.amazonaws.com/dev/'});
const projectCode = process.env.PROJECT_CODE;


export {lunchBucketAPI, auth2API, projectCode};