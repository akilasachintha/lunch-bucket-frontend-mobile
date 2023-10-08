import {getDataFromLocalStorage} from "../helpers/storage/asyncStorage";
import {ERROR_STATUS} from "../errorLogs/errorStatus";
import {log} from "../helpers/logs/log";
import {i2AuthBaseUrl, lunchBucketBaseUrl, projectCode} from "../apis/lunchBucketEnvConfig";

export async function getUserDetailsController() {
    try {
        const token = await getDataFromLocalStorage('token');
        if (!token) return ERROR_STATUS.ERROR;

        const response = await i2AuthBaseUrl.get(`getUser`, {
            headers: {
                'token': token,
                'project_code': projectCode,
            }
        });

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

        const response = await lunchBucketBaseUrl.get(`getCustomer`, {
            headers: {
                'token': token,
            }
        });

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

        const response = await lunchBucketBaseUrl.get(`getCustomerPoints`, {
            headers: {
                'token': token,
            }
        });

        if (response.status === 200) return response.data;

    } catch (error) {
        log("error", "controller", "getUserPointsController", error.message, "userProfileController.js");
        return ERROR_STATUS.ERROR;
    }
}