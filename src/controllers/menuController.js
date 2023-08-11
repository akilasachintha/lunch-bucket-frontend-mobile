import {ERROR_STATUS} from "../errorLogs/errorStatus";
import {lunchBucketAPI} from "../apis/lunchBucketAPI";
import {getDataFromLocalStorage} from "../helpers/storage/asyncStorage";
import {log} from "../helpers/logs/log";
import axios from "axios";

export async function getLunchMenuController() {
    try {
        const token = await getDataFromLocalStorage('token');

        if (!token) {
            return ERROR_STATUS.ERROR;
        }

        const res = axios.get('https://1p8cy9d7v2.execute-api.ap-south-1.amazonaws.com/dev/lunch/invokeSuitabilities'
            , {
                headers: {
                    'token': token,
                }
            });

        console.log(res.data);

        const response = await lunchBucketAPI.get('/dev/lunch/getMenus', {
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

        const res = axios.get('https://1p8cy9d7v2.execute-api.ap-south-1.amazonaws.com/dev/dinner/invokeSuitabilities', {
            headers: {
                'token': token,
            }
        });

        const response = await lunchBucketAPI.get('/dev/dinner/getMenus', {
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

export async function getLunchVegetablePercentageController(vegiId1, vegiId2) {
    try {
        if (!vegiId1 || !vegiId2) return ERROR_STATUS.ERROR;

        const token = await getDataFromLocalStorage('token');
        if (!token) return ERROR_STATUS.ERROR;

        const response = await axios.get(`https://1p8cy9d7v2.execute-api.ap-south-1.amazonaws.com/dev/vegeSuitability/${vegiId1}/${vegiId2}`, {
            headers: {'token': token,}
        });

        console.log(response.data);

        if (response.status === 200) return response.data;

    } catch (error) {
        log("error", "controller", "getLunchVegetablePercentageController", error.message, "menuController.js");
        return ERROR_STATUS.ERROR;
    }
}

export async function getLunchStewPercentageController(vegiId1, vegiId2) {
    try {
        if (!vegiId1 || !vegiId2) return ERROR_STATUS.ERROR;

        const token = await getDataFromLocalStorage('token');

        if (!token) return ERROR_STATUS.ERROR;

        const response = await axios.get(`https://1p8cy9d7v2.execute-api.ap-south-1.amazonaws.com/dev/lunch/stewSuitability/${vegiId1}/${vegiId1}`, {
            headers: {'token': token,}
        });

        if (response.status === 200) return response.data;

    } catch (error) {
        log("error", "controller", "getLunchStewPercentageController", error.message, "menuController.js");
        return ERROR_STATUS.ERROR;
    }
}

export async function getLunchMeetPercentageController(vegiId1, vegiId2, stewId) {
    try {
        if (!vegiId1 || !vegiId2 || !stewId) return "Invalid Parameters";

        const token = await getDataFromLocalStorage('token');

        if (!token) return ERROR_STATUS.ERROR;

        const response = await axios.get(`https://1p8cy9d7v2.execute-api.ap-south-1.amazonaws.com/dev/lunch/meatSuitability/${vegiId1}/${vegiId2}/${stewId}`, {
            headers: {'token': token,}
        });

        if (response.status === 200) return response.data;

    } catch (error) {
        log("error", "controller", "getLunchMeetPercentageController", error.message, "menuController.js");
        return ERROR_STATUS.ERROR;
    }
}

export async function getDinnerStewPercentageController(vegiId1, vegiId2) {
    try {
        if (!vegiId1 || !vegiId2) return ERROR_STATUS.ERROR;

        const token = await getDataFromLocalStorage('token');

        if (!token) return ERROR_STATUS.ERROR;

        const response = await axios.get(`https://1p8cy9d7v2.execute-api.ap-south-1.amazonaws.com/dev/dinner/stewSuitability/${vegiId1}/${vegiId2}`, {
            headers: {'token': token,}
        });

        if (response.status === 200) return response.data;

    } catch (error) {
        log("error", "controller", "getDinnerStewPercentageController", error.message, "menuController.js");
        return ERROR_STATUS.ERROR;
    }
}

export async function getDinnerMeetPercentageController(vegiId1, vegiId2, stewId) {
    try {
        if (!vegiId1 || !vegiId2 || !stewId) return "Invalid Parameters";

        const token = await getDataFromLocalStorage('token');

        if (!token) return ERROR_STATUS.ERROR;

        const response = await axios.get(`https://1p8cy9d7v2.execute-api.ap-south-1.amazonaws.com/dev/dinner/meatSuitability/${vegiId1}/${vegiId2}/${stewId}`, {
            headers: {'token': token,}
        });

        if (response.status === 200) return response.data;

    } catch (error) {
        log("error", "controller", "getDinnerMeetPercentageController", error.message, "menuController.js");
        return ERROR_STATUS.ERROR;
    }
}