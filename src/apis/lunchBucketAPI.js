import axios from 'axios';

let lunchBucketAPI = axios.create({baseURL: 'https://1p8cy9d7v2.execute-api.ap-south-1.amazonaws.com/dev/'});
let projectCode = "64a7aec4932166ca272cd176AVT60UVT4300";

// if (process.env.NODE_ENV === "development") {
//     console.log("Running in development mode");
//
// } else if (process.env.NODE_ENV === "qa") {
//     projectCode = process.env.PROJECT_CODE;
//     lunchBucketAPI = axios.create({baseURL: process.env.LUNCH_BUCKET_APP_URL});
//     console.log("Running in QA mode");
// } else {
//     projectCode = process.env.PROJECT_CODE;
//     lunchBucketAPI = axios.create({baseURL: process.env.LUNCH_BUCKET_APP_URL});
//     console.log("Running in production mode");
// }

const auth2API = axios.create({baseURL: 'https://fmrlw0xn6h.execute-api.ap-south-1.amazonaws.com/dev/'});


export {lunchBucketAPI, auth2API, projectCode};