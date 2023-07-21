import axios from "axios";
import {getDataFromLocalStorage} from "../helpers/storage/asyncStorage";
import {ERROR_STATUS} from "../errorLogs/errorStatus";
import {log} from "../helpers/logs/log";
import {useNavigation} from "@react-navigation/native";

export async function setOrderController(data) {
    const navigation = useNavigation();

    try {
        const token = await getDataFromLocalStorage('token');

        if (!token) return ERROR_STATUS.ERROR;

        const response = await axios.post(
            'https://1p8cy9d7v2.execute-api.ap-south-1.amazonaws.com/dev/addOrders',
            data,
            {
                headers: {
                    'token': token,
                }
            }
        );

        if (response.status === 200) {
            log("info", "controller", "setOrderController", response.data, "checkoutController.js");
            return response.data;
        }
        if (response && response.data && response.data.state === false) {
            log("error", "controller", "setOrderController", response.data, "checkoutController.js");
            navigation.navigate('Login');
            return ERROR_STATUS.ERROR;
        }

    } catch (error) {
        log("error", "controller", "setOrderController", error.message, "checkoutController.js");
        return ERROR_STATUS.ERROR;
    }
}