import {ERROR_STATUS} from "../errorLogs/errorStatus";
import {log} from "../helpers/logs/log";
import {getDataFromLocalStorage} from "../helpers/storage/asyncStorage";
import {auth2API, lunchBucketAPI} from "../apis/lunchBucketAPI";

export async function loginController(email, password) {
    try {

        const expoPushToken = await getDataFromLocalStorage('expoPushToken');
        if (!expoPushToken) return ERROR_STATUS.ERROR;

        const response = await auth2API.post(
            'userLogin',
            {
                email: email,
                password: password,
                project_code: "64b611b5999970218fd7b23fAVT60UVT4300",
                device_token: expoPushToken ? expoPushToken : "",
            }
        );

        if (response.status === 200) {
            log("info", "controller", "loginController", response.data, "authController.js");
            return response.data;
        }

    } catch (error) {
        log("error", "controller", "loginController", error.message, "authController.js");
        return ERROR_STATUS.ERROR;
    }
}

export async function registerController(email, password, contactNo) {
    try {
        const expoPushToken = await getDataFromLocalStorage('expoPushToken');
        console.log(expoPushToken);

        const response = await lunchBucketAPI.post(
            'addCustomer',
            {
                email: email,
                password: password,
                contact_no: contactNo,
                device_token: expoPushToken ? expoPushToken : "",
            }
        );

        if (response.status === 200) {
            log("info", "controller", "registerController", response.data, "authController.js");
            return response.data;
        }

    } catch (error) {
        log("error", "controller", "signUpController", error.message, "authController.js");
        return ERROR_STATUS.ERROR;
    }
}

export async function validateTokenController() {
    try {
        const token = await getDataFromLocalStorage('token');
        if (!token) {
            return ERROR_STATUS.ERROR;
        }

        const response = await lunchBucketAPI.get(
            'lunch/getMenus',
            {
            headers: {
                'token': token,
            }
        });

        if (response.status === 200) return response.data;

    } catch (error) {
        log("error", "controller", "validateTokenController", error.message, "authController.js");
        return ERROR_STATUS.ERROR;
    }
}
