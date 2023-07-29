import {getDataFromLocalStorage} from "../helpers/storage/asyncStorage";
import {ERROR_STATUS} from "../errorLogs/errorStatus";
import axios from "axios";
import {log} from "../helpers/logs/log";

export async function getChatsController() {
    try {
        const token = await getDataFromLocalStorage('token');
        const customerId = await getDataFromLocalStorage('customerId');
        if (!token) return ERROR_STATUS.ERROR;
        if (!customerId) return ERROR_STATUS.ERROR;

        const response = await axios.get(`https://1p8cy9d7v2.execute-api.ap-south-1.amazonaws.com/dev/getUserChat/${customerId}`, {
            headers: {'token': token,}
        });

        log("info", "controller", "getChatsController", response.data, "chatController.js");

        if (response.status === 200) return response.data;

    } catch (error) {
        log("error", "controller", "getChatsController", error.message, "chatController.js");
        return ERROR_STATUS.ERROR;
    }
}


export async function createNewConversationController(customerId, message) {
    try {
        const token = await getDataFromLocalStorage('token');
        if (!token) return ERROR_STATUS.ERROR;

        const response = await axios.post(`https://1p8cy9d7v2.execute-api.ap-south-1.amazonaws.com/dev/addUserMessage`, {
            customer_id: customerId,
            message: message,
        }, {
            headers: {'token': token,}
        });

        log("info", "controller", "createNewConversationController", response.data, "chatController.js");

        if (response.status === 200) return response.data;

    } catch (error) {
        log("error", "controller", "createNewConversationController", error.message, "chatController.js");
        return ERROR_STATUS.ERROR;
    }
}

export async function sendMessageToConversation(chatId, message) {
    try {
        const token = await getDataFromLocalStorage('token');
        if (!token) return ERROR_STATUS.ERROR;

        const response = await axios.post(`https://1p8cy9d7v2.execute-api.ap-south-1.amazonaws.com/dev/addUserReply`, {
            chat_id: chatId,
            message: message,
        }, {
            headers: {'token': token,}
        });

        log("info", "controller", "sendMessageToConversation", response.data, "chatController.js");

        if (response.status === 200) return response.data;

    } catch (error) {
        log("error", "controller", "sendMessageToConversation", error.message, "chatController.js");
        return ERROR_STATUS.ERROR;
    }
}