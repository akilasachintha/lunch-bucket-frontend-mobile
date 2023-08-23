import {getDataFromLocalStorage} from "../helpers/storage/asyncStorage";
import {ERROR_STATUS} from "../errorLogs/errorStatus";
import {log} from "../helpers/logs/log";
import {lunchBucketAPI} from "../apis/lunchBucketAPI";

export async function setOrderController(data) {
    try {
        const token = await getDataFromLocalStorage('token');
        if (!token) return ERROR_STATUS.ERROR;

        log("info", "controller", "setOrderController | data", data, "checkoutController.js");

        const response = await lunchBucketAPI.post(
            'addOrders',
            data,
            {
                headers: {
                    'token': token,
                }
            }
        );

        log("info", "controller", "setOrderController | response", response.data, "checkoutController.js");

        if (response.status === 200) {
            log("info", "controller", "setOrderController", response.data, "checkoutController.js");
            return response.data;
        }
        if (response && response.data && response.data.state === false) {
            log("error", "controller", "setOrderController", response.data, "checkoutController.js");
            return ERROR_STATUS.ERROR;
        }

    } catch (error) {
        log("error", "controller", "setOrderController", error.message, "checkoutController.js");
        return ERROR_STATUS.ERROR;
    }
}