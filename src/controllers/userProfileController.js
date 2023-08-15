import {getDataFromLocalStorage} from "../helpers/storage/asyncStorage";
import {ERROR_STATUS} from "../errorLogs/errorStatus";
import {log} from "../helpers/logs/log";
import {auth2API} from "../apis/lunchBucketAPI";

export async function getUserDetailsController() {
    try {
        const token = await getDataFromLocalStorage('token');
        if (!token) return ERROR_STATUS.ERROR;

        const response = await auth2API.get(`getUser`, {
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