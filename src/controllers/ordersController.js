import {getDataFromLocalStorage} from "../helpers/storage/asyncStorage";
import {ERROR_STATUS} from "../errorLogs/errorStatus";
import {log} from "../helpers/logs/log";
import {lunchBucketAPI} from "../apis/lunchBucketAPI";

export async function getOrdersController() {
    try {
        const token = await getDataFromLocalStorage('token');
        const customerId = await getDataFromLocalStorage('customerId');
        console.log(customerId);

        if (!token) return ERROR_STATUS.ERROR;
        if (!customerId) return ERROR_STATUS.ERROR;

        const response = await lunchBucketAPI.get(`getOrderByCustomer/${customerId}`, {
            headers: {'token': token,}
        });

        console.log(response.data);

        if (response.status === 200) return response.data;

    } catch (error) {
        log("error", "controller", "getLunchMeetPercentageController", error.message, "menuController.js");
        return ERROR_STATUS.ERROR;
    }
}

export async function deleteOrdersController(id) {
    try {
        const token = await getDataFromLocalStorage('token');
        if (!token) return ERROR_STATUS.ERROR;

        const response = await lunchBucketAPI.delete(`deleteOrder/${id}`, {
            headers: {'token': token,}
        });

        if (response.status === 200) return response.data;

    } catch (error) {
        log("error", "controller", "deleteOrdersController", error.message, "ordersController.js");
        return ERROR_STATUS.ERROR;
    }
}