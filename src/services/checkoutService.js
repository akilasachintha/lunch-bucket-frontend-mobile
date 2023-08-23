import {log} from "../helpers/logs/log";
import {getDataFromLocalStorage, removeDataFromLocalStorage} from "../helpers/storage/asyncStorage";
import {setOrderController} from "../controllers/checkoutController";
import {ERROR_STATUS} from "../errorLogs/errorStatus";

export async function handleCheckoutService() {
    try {
        const [basket, customerId] = await Promise.all([
            getDataFromLocalStorage("basket"),
            getDataFromLocalStorage("customerId"),
        ]);

        log("info", "checkoutService", "handleCheckoutService | basket", JSON.stringify(basket), "checkoutService.js");

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
            cash: basketItems.isCash,
        }

        if (basketItems && basketItems.venue) {
            checkoutMenu.type = basketItems.venue;
        } else {
            log("error", "checkoutService", "handleCheckoutService | basketItems.venue", basketItems.venue, "checkoutService.js");
            return ERROR_STATUS.ERROR;
        }

        if (basketItems && basketItems.meal && basketItems.meal.length > 0) {
            log("info", "checkoutService", "handleCheckoutService | basketItems.meal", basketItems.meal, "checkoutService.js");
            basketItems.meal.forEach((meal) => {
                if (meal.isSpecial) {
                    checkoutMenu.orders.push({
                        order_type: "special",
                        packet_amount: meal.count,
                        order_status: 'pending',
                        meal: meal.venue,
                        customer_id: customerId,
                        comment: "",
                        price: meal.totalPrice,
                        potion: false,
                        special_meal: meal.items[0]?.id || "",
                    });
                } else if (meal.isVegi) {
                    checkoutMenu.orders.push({
                        order_type: "vegi",
                        rice: meal.items[0]?.type || "",
                        vege1: meal.items[1]?.type || "",
                        vege2: meal.items[2]?.type || "",
                        vege3: meal.items[3]?.type || "",
                        vege4: meal.items[4]?.type || "",
                        packet_amount: meal.count,
                        order_status: 'pending',
                        meal: meal.venue,
                        customer_id: customerId,
                        comment: "",
                        price: meal.totalPrice,
                        potion: false,
                    });
                } else {
                    checkoutMenu.orders.push({
                        order_type: "non_vegi",
                        rice: meal.items[0]?.type || "",
                        vege1: meal.items[1]?.type || "",
                        vege2: meal.items[2]?.type || "",
                        stew: meal.items[3]?.type || "",
                        meat: meal.items[4]?.type || "",
                        packet_amount: meal.count,
                        order_status: 'pending',
                        meal: meal.venue,
                        customer_id: customerId,
                        comment: "",
                        price: meal.totalPrice,
                        potion: false,
                    });
                }
            });

            log("info", "checkoutService", "handleCheckoutService | checkoutMenu", checkoutMenu, "checkoutService.js");
        } else {
            log("error", "checkoutService", "handleCheckoutService | basketItems.meal", basketItems.meal, "checkoutService.js");
            return ERROR_STATUS.ERROR;
        }

        const result = await setOrderController(checkoutMenu);
        log("info", "checkoutService", "handleCheckoutService | result", result, "checkoutService.js")
        const data = await result.data;

        if (result === ERROR_STATUS.ERROR) {
            log("error", "checkoutService", "handleCheckoutService | result", result, "checkoutService.js");
            return ERROR_STATUS.ERROR;
        } else if (data.state === false) {
            log("error", "checkoutService", "handleCheckoutService", data.data, "checkoutService.js");
            return ERROR_STATUS.ERROR;
        } else {
            log("success", "checkoutService", "handleCheckoutService", data.data, "checkoutService.js");
            await removeDataFromLocalStorage("basket");
            return data;
        }
    } catch (error) {
        log("error", "checkoutService", "handleCheckoutService", error.message, "checkoutService.js");
        return ERROR_STATUS.ERROR;
    }
}
