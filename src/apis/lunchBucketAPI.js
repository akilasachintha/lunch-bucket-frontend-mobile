import axios from 'axios';

let lunchBucketAPI = axios.create({baseURL: 'https://1p8cy9d7v2.execute-api.ap-south-1.amazonaws.com/dev/'});
// let lunchBucketAPI = axios.create({baseURL: 'https://m9sbeatlg0.execute-api.ap-south-1.amazonaws.com/prod/'});
let projectCode = "64fef5352733ffb579bdc92dAVT60UVT8600";
//let projectCode = "64fdb96f15be57cccddf86bbAVT60UVT8600"
let auth2API = axios.create({baseURL: 'https://fw2svr60sl.execute-api.ap-south-1.amazonaws.com/beta'});
// let auth2API = axios.create({baseURL: 'https://a2og6gjwae.execute-api.ap-south-1.amazonaws.com/prod/'});

// if (process.env.NODE_ENV === "development") {
//     console.log("Running in development mode");
//
// } else if (process.env.NODE_ENV === "test") {
//     auth2API = axios.create({baseURL: process.env.AUTH2_APP_URL});
//     projectCode = process.env.PROJECT_CODE;
//     lunchBucketAPI = axios.create({baseURL: process.env.LUNCH_BUCKET_APP_URL});
//     console.log("Running in QA mode");
//     console.log("auth2API", auth2API);
//     console.log("projectCode", projectCode);
//     console.log("lunchBucketAPI", lunchBucketAPI);
// } else {
//     auth2API = axios.create({baseURL: process.env.AUTH_URL});
//     projectCode = process.env.PROJECT_CODE;
//     lunchBucketAPI = axios.create({baseURL: process.env.LUNCH_BUCKET_APP_URL});
//     console.log("Running in production mode");
// }

export {lunchBucketAPI, auth2API, projectCode};