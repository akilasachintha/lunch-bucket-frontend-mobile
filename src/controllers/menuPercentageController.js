import {getDataFromLocalStorage} from "../helpers/storage/asyncStorage";
import {ERROR_STATUS} from "../errorLogs/errorStatus";
import {log} from "../helpers/logs/log";
import axios from "axios";

export async function menuPercentageDinnerForTwoIDsController(id1, id2) {
    if (!id1 || !id2) return ERROR_STATUS.ERROR;

    try {
        const response = await axios.get(`http://15.206.195.120:5000/dev/dinner/suitability_for_two/${id1}/${id2}`,
            {
                headers: {"Accept": "application/json, text/plain, /", "Content-Type": "multipart/form-data"}
            });

        if (response.status === 200) return response.data;

    } catch (error) {
        console.error(error.data);
        log("error", "controller", "menuPercentageDinnerForTwoIDsController", error, "menuPercentageController.js");
        return ERROR_STATUS.ERROR;
    }
}

export async function menuPercentageLunchForTwoIDsController(id1, id2) {
    if (!id1 || !id2) return ERROR_STATUS.ERROR;

    try {
        const response = await axios.get(`http://15.206.195.120:5000/dev/lunch/suitability_for_two/${id1.toString()}/${id2.toString()}`, {
            headers:{"Accept":"application/json, text/plain, /","Content-Type": "multipart/form-data"},
        });

        if (response.status === 200) return response.data;

    } catch (error) {
        console.error(error);
        log("error", "controller", "menuPercentageLunchForTwoIDsController", error, "menuPercentageController.js");
        return ERROR_STATUS.ERROR;
    }
}

export async function menuPercentageDinnerForThreeIDsController(id1, id2, id3) {
    if (!id1 || !id2 || !id3) {
        console.log(id1, id2, id3);
    }

    try {
        const token = await getDataFromLocalStorage('token');
        if (!token) return ERROR_STATUS.ERROR;

        const response = await axios.get(`http://15.206.195.120:5000/dev/lunch/suitability_for_three/${id1}/${id2}/${id3}`);

        if (response.status === 200) return response.data;

    } catch (error) {
        console.error(error);
        log("error", "controller", "menuPercentageDinnerForThreeIDsController", error.message, "menuPercentageController.js");
        return ERROR_STATUS.ERROR;
    }
}

export async function menuPercentageLunchForThreeIDsController(id1, id2, id3) {
    if (!id1 || !id2 || !id3) return ERROR_STATUS.ERROR;

    try {
        const response = await axios.get(`http://15.206.195.120:5000/dev/lunch/suitability_for_three/${id1}/${id2}/${id3}`);

        if (response.status === 200) return response.data;

    } catch (error) {
        console.error(error);
        log("error", "controller", "menuPercentageLunchForThreeIDsController", error.message, "menuPercentageController.js");
        return ERROR_STATUS.ERROR;
    }
}
