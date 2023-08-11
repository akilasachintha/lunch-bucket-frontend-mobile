import {ERROR_STATUS} from "../errorLogs/errorStatus";
import axios from "axios";
import {log} from "../helpers/logs/log";
import {getDataFromLocalStorage} from "../helpers/storage/asyncStorage";
import {lunchBucketAPI} from "../apis/lunchBucketAPI";

export async function loginController(email, password) {
    try {
        const response = await axios.post(
            'https://fmrlw0xn6h.execute-api.ap-south-1.amazonaws.com/dev/userLogin',
            {
                email: email,
                password: password,
                project_code: "64a7aec4932166ca272cd176AVT60UVT4300",
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
        const response = await axios.post(
            'https://1p8cy9d7v2.execute-api.ap-south-1.amazonaws.com/dev/addCustomer',
            {
                email: email,
                password: password,
                contact_no: contactNo,
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

        const response = await lunchBucketAPI.get('/dev/lunch/getMenus', {
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
