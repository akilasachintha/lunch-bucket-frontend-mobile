import {
    getUserDetailsController,
    getUserFullDetailsController,
    getUserPointsController
} from "../controllers/userProfileController";
import {log} from "../helpers/logs/log";
import {ERROR_STATUS} from "../errorLogs/errorStatus";

export async function getUserDetailsService() {
    try {
        const result = await getUserDetailsController();
        log("info", "service", "getUserDetailsService | result", result, "userProfileService.js");
        if (result === "error") {
            return [];
        } else {
            const data = await result.data;
            log("success", "service", "getUserDetailsService | data", data, "userProfileService.js");
            return data;
        }
    } catch (error) {
        log("error", "service", "getUserDetailsService", error.message, "userProfileService.js");
        return [];
    }
}

export async function getUserFullDetailsService() {
    try {
        const result = await getUserFullDetailsController();
        log("info", "service", "getUserFullDetailsService | result", result, "userProfileService.js");

        if (result === "error") {
            return ERROR_STATUS.ERROR;
        } else {
            const data = await result.data?.data;
            log("success", "service", "getUserFullDetailsService | data", data, "userProfileService.js");
            return data;
        }
    } catch (error) {
        log("error", "service", "getUserFullDetailsService", error.message, "userProfileService.js");
        return ERROR_STATUS.ERROR;
    }
}

export async function getUserPointsService() {
    try {
        const result = await getUserPointsController();
        log("info", "service", "getUserPointsService | result", result, "userProfileService.js");

        if (result === "error") {
            return 0;
        } else {
            const data = await result.data?.points;
            log("success", "service", "getUserPointsService | data", data, "userProfileService.js");
            return data;
        }
    } catch (e) {
        log("error", "service", "getUserPointsService", e.message, "userProfileService.js");
    }
}