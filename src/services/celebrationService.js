import {log} from "../helpers/logs/log";
import {getCelebrationController} from "../controllers/celebrationController";

export async function getCelebrationService() {
    try {
        const result = await getCelebrationController();

        if (result === "error") {
            return false;
        } else {
            return result && result.data && result.data.open_state;
        }
    } catch (error) {
        log("error", "service", "getCelebrationService", error.message, "celebrationService.js");
        return false;
    }
}