import {getUserDetailsController} from "../controllers/userProfileController";
import {log} from "../helpers/logs/log";

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