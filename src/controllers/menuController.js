import {ERROR_STATUS} from "../errorLogs/errorStatus";
import {lunchBucketAPI} from "../apis/lunchBucketAPI";
import {getDataFromLocalStorage} from "../helpers/storage/asyncStorage";
import {log} from "../helpers/logs/log";

export async function getLunchMenuController() {
    try {
        const token = await getDataFromLocalStorage('token');

        if (!token) {
            return ERROR_STATUS.ERROR;
        }

        const response = await lunchBucketAPI.get('lunch/getMenus', {
            headers: {
                'token': token,
            }
        });

        if (response.status === 200) return response.data;

    } catch (error) {
        log("error", "controller", "getLunchMenuController", error.message, "menuController.js");
        return ERROR_STATUS.ERROR;
    }
}

export async function getDinnerMenuController() {
    try {
        const token = await getDataFromLocalStorage('token');

        if (!token) {
            return ERROR_STATUS.ERROR;
        }

        const response = await lunchBucketAPI.get('dinner/getMenus', {
            headers: {
                'token': token,
            }
        });

        if (response.status === 200) return response.data;

    } catch (error) {
        log("error", "controller", "getDinnerMenuController", error.message, "menuController.js");
        return ERROR_STATUS.ERROR;
    }
}
