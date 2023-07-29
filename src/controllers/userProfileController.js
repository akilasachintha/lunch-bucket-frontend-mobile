import {getDataFromLocalStorage} from "../helpers/storage/asyncStorage";
import {ERROR_STATUS} from "../errorLogs/errorStatus";
import axios from "axios";
import {log} from "../helpers/logs/log";

export async function getUserDetailsController() {
    try {
        const token = await getDataFromLocalStorage('token');
        if (!token) return ERROR_STATUS.ERROR;

        const response = await axios.get(`https://fmrlw0xn6h.execute-api.ap-south-1.amazonaws.com/dev/getUser`, {
            headers: {
                'token': token,
                'project_code': '64a7aec4932166ca272cd176AVT60UVT4300',
            }
        });

        log("info", "controller", "sendMessageToConversation", response.data, "chatController.js");
        if (response.status === 200) return response.data;

    } catch (error) {
        log("error", "controller", "sendMessageToConversation", error.message, "chatController.js");
        return ERROR_STATUS.ERROR;
    }
}