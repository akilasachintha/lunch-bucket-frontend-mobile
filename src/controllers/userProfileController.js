import {getDataFromLocalStorage} from "../helpers/storage/asyncStorage";
import {ERROR_STATUS} from "../errorLogs/errorStatus";
import {log} from "../helpers/logs/log";
import {auth2API, lunchBucketAPI, projectCode} from "../apis/lunchBucketAPI";

export async function getUserDetailsController() {
    try {
        const token = await getDataFromLocalStorage('token');
        if (!token) return ERROR_STATUS.ERROR;

        const response = await auth2API.get(`getUser`, {
            headers: {
                'token': token,
                'project_code': projectCode,
            }
        });

        log("info", "controller", "getUserDetailsController", response.data, "userProfileController.js");
        if (response.status === 200) return response.data;

    } catch (error) {
        log("error", "controller", "getUserDetailsController", error.message, "userProfileController.js");
        return ERROR_STATUS.ERROR;
    }
}

export async function getUserFullDetailsController() {
    try {
        const token = await getDataFromLocalStorage('token');
        if (!token) return ERROR_STATUS.ERROR;

        const response = await lunchBucketAPI.get(`getCustomer`, {
            headers: {
                'token': token,
            }
        });

        log("info", "controller", "getUserFullDetailsController", response.data, "userProfileController.js");
        if (response.status === 200) return response.data;

    } catch (error) {
        log("error", "controller", "getUserFullDetailsController", error.message, "userProfileController.js");
        return ERROR_STATUS.ERROR;
    }
}

export async function getUserPointsController() {
    try {
        const token = await getDataFromLocalStorage('token');
        if (!token) return ERROR_STATUS.ERROR;

        const response = await lunchBucketAPI.get(`getCustomerPoints`, {
            headers: {
                'token': token,
            }
        });

        log("info", "controller", "getUserPointsController", response.data, "userProfileController.js");
        if (response.status === 200) return response.data;

    } catch (error) {
        log("error", "controller", "getUserPointsController", error.message, "userProfileController.js");
        return ERROR_STATUS.ERROR;
    }
}