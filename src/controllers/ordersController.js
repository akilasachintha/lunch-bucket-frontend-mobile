import {getDataFromLocalStorage} from "../helpers/storage/asyncStorage";
import {ERROR_STATUS} from "../errorLogs/errorStatus";
import axios from "axios";
import {log} from "../helpers/logs/log";

export async function getOrdersController() {
    try {
        const token = await getDataFromLocalStorage('token');
        const customerId = await getDataFromLocalStorage('customerId');

        log("info", "controller", "getOrdersController | token", customerId, "ordersController.js");
        if (!token) return ERROR_STATUS.ERROR;
        if (!customerId) return ERROR_STATUS.ERROR;

        const response = await axios.get(`https://1p8cy9d7v2.execute-api.ap-south-1.amazonaws.com/dev/getOrderByCustomer/${customerId}`, {
            headers: {'token': token,}
        });

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

        const response = await axios.delete(`https://1p8cy9d7v2.execute-api.ap-south-1.amazonaws.com/dev/deleteOrder/${id}`, {
            headers: {'token': token,}
        });

        if (response.status === 200) return response.data;

    } catch (error) {
        log("error", "controller", "deleteOrdersController", error.message, "ordersController.js");
        return ERROR_STATUS.ERROR;
    }
}