import {log} from "../helpers/logs/log";
import {getDataFromLocalStorage, removeDataFromLocalStorage} from "../helpers/storage/asyncStorage";
import {setOrderController} from "../controllers/checkoutController";
import {ERROR_STATUS, SUCCESS_STATUS} from "../errorLogs/errorStatus";

export async function handleCheckoutService() {
    try {
        const [basket, customerId] = await Promise.all([
            getDataFromLocalStorage("basket"),
            getDataFromLocalStorage("customerId"),
        ]);

        if (!basket) {
            log("error", "checkoutService", "handleCheckoutService | basket", basket, "checkoutService.js");
            return ERROR_STATUS.ERROR;
        }

        if (!customerId) {
            log("error", "checkoutService", "handleCheckoutService | customerId", customerId, "checkoutService.js");
            return ERROR_STATUS.ERROR;
        }

        const basketItems = JSON.parse(basket);

        const checkoutMenu = {
            orders: [],
            customer_id: customerId,
        }

        if (basketItems && basketItems.venue) {
            checkoutMenu.type = basketItems.venue;
        } else {
            log("error", "checkoutService", "handleCheckoutService | basketItems.venue", basketItems.venue, "checkoutService.js");
            return ERROR_STATUS.ERROR;
        }

        if (basketItems && basketItems.meal && basketItems.meal.length > 0) {
            basketItems.meal.forEach((meal) => {
                checkoutMenu.orders.push({
                    order_type: "non_vegi",
                    vege1: meal.items[0]?.id || "",
                    vege2: meal.items[1]?.id || "",
                    meat: meal.items[2]?.id || "",
                    stew: meal.items[3]?.id || "",
                    packet_amount: meal.count,
                    order_status: 'pending',
                    meal: meal.venue,
                    customer_id: customerId,
                    comment: "",
                    price: meal.totalPrice,
                });
            });
        } else {
            log("error", "checkoutService", "handleCheckoutService | basketItems.meal", basketItems.meal, "checkoutService.js");
            return ERROR_STATUS.ERROR;
        }

        console.log("checkoutMenu", checkoutMenu);

        const result = await setOrderController(checkoutMenu);
        const data = await result.data;

        if (result === ERROR_STATUS.ERROR) {
            log("error", "checkoutService", "addCheckoutMenuService | result", result, "checkoutService.js");
            return ERROR_STATUS.ERROR;
        } else if (data.state === false) {
            log("error", "checkoutService", "addCheckoutMenuService", data.data, "checkoutService.js");
            return ERROR_STATUS.ERROR;
        } else {
            log("success", "checkoutService", "addCheckoutMenuService", data.data, "checkoutService.js");
            await removeDataFromLocalStorage("basket");
            return SUCCESS_STATUS.SUCCESS;
        }
    } catch (error) {
        log("error", "checkoutService", "addCheckoutMenuService", error.message, "checkoutService.js");
        return ERROR_STATUS.ERROR;
    }
}
