import {forgetPasswordController, registerController} from "../controllers/authController";
import {ERROR_STATUS, SUCCESS_STATUS} from "../errorLogs/errorStatus";
import {log} from "../helpers/logs/log";
import {useAuth} from "../context/AuthContext";
import {useNavigation} from "@react-navigation/native";
import {BASE_URL, createAxiosInstance} from "../config/axiosConfig";
import {projectCode} from "../apis/lunchBucketEnvConfig";

export const useAuthService = () => {
    const authContext = useAuth();
    const axiosInstanceForI2Auth = createAxiosInstance(authContext, BASE_URL.I2_AUTH);
    // const axiosInstanceForLunchBucket = createAxiosInstance(authContext, BASE_URL.LUNCHBUCKET);
    const navigation = useNavigation();
    const {login, deviceToken, role} = useAuth();

    async function loginService(email, password) {
        try {
            const response = await axiosInstanceForI2Auth.post('/userLogin', {
                email: email,
                password: password,
                project_code: projectCode,
                device_token: deviceToken ?? '',
            });

            login(response.data.data);

            if (response.data.data.type === "user") {
                navigation.replace('Menu');
            } else if (response.data.data.type === "admin") {
                console.log("Admin");
                navigation.replace('AdminHome');
            }

        } catch (error) {
            log("error", "service", "loginService", error.message, "useAuthService.js");
            return ERROR_STATUS.ERROR;
        }
    }

    async function registerService(email, password, contactNo) {
        try {
            if (email === "" || password === "" || contactNo === "") {
                return ERROR_STATUS.ERROR;
            }

            const result = await registerController(email, password, contactNo);
            const data = await result.data;

            if (result === "error") {
                log("error", "service", "registerService | result", data.response, "useAuthService.js");
                return ERROR_STATUS.ERROR;
            } else if (data && data.state === false) {
                log("error", "service", "registerService | state", data.state, "useAuthService.js");
                return ERROR_STATUS.ERROR;
            } else {
                log("success", "service", "registerService", "Register Success", "useAuthService.js");
                return SUCCESS_STATUS.SUCCESS;
            }
        } catch (error) {
            log("error", "service", "registerService", error.message, "useAuthService.js");
            return ERROR_STATUS.ERROR;
        }
    }

    async function forgetPasswordService(email, password) {
        try {
            if (email === "" || password === "") {
                return ERROR_STATUS.ERROR;
            }

            const result = await forgetPasswordController(email, password);
            const data = await result.data;

            if (result === "error") {
                log("error", "service", "forgetPasswordService | result", data.response, "useAuthService.js");
                return ERROR_STATUS.ERROR;
            } else if (data && data.state === false) {
                log("error", "service", "forgetPasswordService | state", data.state, "useAuthService.js");
                return ERROR_STATUS.ERROR;
            } else {
                log("success", "service", "forgetPasswordService", "Register Success", "useAuthService.js");
                return SUCCESS_STATUS.SUCCESS;
            }
        } catch (error) {
            log("error", "service", "forgetPasswordService", error.message, "useAuthService.js");
            return ERROR_STATUS.ERROR;
        }
    }

    return {
        loginService,
        registerService,
        forgetPasswordService,
    }
}