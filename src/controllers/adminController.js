import {getDataFromLocalStorage} from "../helpers/storage/asyncStorage";
import {ERROR_STATUS} from "../errorLogs/errorStatus";
import {EXPERT_API, lunchBucketAPI} from "../apis/lunchBucketAPI";
import {log} from "../helpers/logs/log";

export async function getLunchAdminNotificationsController() {
    try {
        const token = await getDataFromLocalStorage('token');

        if (!token) {
            return ERROR_STATUS.ERROR;
        }

        const response = await lunchBucketAPI.get('informArrival/Lunch', {
            headers: {
                'token': token,
            }
        });

        if (response.status === 200) return response.data;

    } catch (error) {
        log("error", "controller", "getLunchAdminNotificationsController", error.message, "adminController.js");
        return ERROR_STATUS.ERROR;
    }
}

export async function getDinnerAdminNotificationsController() {
    try {
        const token = await getDataFromLocalStorage('token');

        if (!token) {
            return ERROR_STATUS.ERROR;
        }

        const response = await lunchBucketAPI.get('informArrival/Dinner', {
            headers: {
                'token': token,
            }
        });

        if (response.status === 200) return response.data;

    } catch (error) {
        log("error", "controller", "getDinnerAdminNotificationsController", error.message, "adminController.js");
        return ERROR_STATUS.ERROR;
    }
}

export async function getLunchReportController() {
    try {
        const response = await EXPERT_API.get('getReport/Lunch');

        if (response.status === 200) return response.data;

    } catch (error) {
        log("error", "controller", "getLunchReportController", error.message, "adminController.js");
        return ERROR_STATUS.ERROR;
    }
}

export async function getDinnerReportController() {
    try {
        const response = await EXPERT_API.get('getReport/Dinner');

        if (response.status === 200) return response.data;

    } catch (error) {
        log("error", "controller", "getLunchReportController", error.message, "adminController.js");
        return ERROR_STATUS.ERROR;
    }
}