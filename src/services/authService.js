import {loginController, registerController} from "../controllers/authController";
import {ERROR_STATUS, SUCCESS_STATUS} from "../errorLogs/errorStatus";
import {addDataToLocalStorage} from "../helpers/storage/asyncStorage";
import {log} from "../helpers/logs/log";


export async function loginService(email, password) {
    try {
        if (email === "" || password === "") {
            return ERROR_STATUS.ERROR;
        }

        const result = await loginController(email, password);
        const data = await result.data;

        if (result === "error") {
            log("error", "service", "loginService | result", result, "authService.js");
            return ERROR_STATUS.ERROR;
        } else if (data && data.state === false) {
            log("info", "service", "loginService | state", data.state, "authService.js");
            return ERROR_STATUS.ERROR;
        } else {
            await addDataToLocalStorage('token', data.token);
            await addDataToLocalStorage('customerId', data.id);
            await addDataToLocalStorage('loginStatus', "true");
            log("success", "service", "loginService", "Login Success", "authService.js");
            return SUCCESS_STATUS.SUCCESS;
        }
    } catch (error) {
        log("error", "service", "loginService", error.message, "authService.js");
        return ERROR_STATUS.ERROR;
    }
}

export async function registerService(email, password) {
    try {
        if (email === "" || password === "") {
            return ERROR_STATUS.ERROR;
        }

        const result = await registerController(email, password);
        const data = await result.data;

        if (result === "error") {
            log("error", "service", "registerService | result", data.response, "authService.js");
            return ERROR_STATUS.ERROR;
        } else if (data && data.state === false) {
            log("error", "service", "registerService | state", data.state, "authService.js");
            return ERROR_STATUS.ERROR;
        } else {
            await addDataToLocalStorage('token', data.token);
            log("success", "service", "registerService", "Register Success", "authService.js");
            return SUCCESS_STATUS.SUCCESS;
        }
    } catch (error) {
        log("error", "service", "registerService", error.message, "authService.js");
        return ERROR_STATUS.ERROR;
    }
}