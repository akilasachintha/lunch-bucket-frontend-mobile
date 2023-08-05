import {
    getDinnerMeetPercentageController,
    getDinnerMenuController,
    getDinnerStewPercentageController,
    getLunchMeetPercentageController,
    getLunchMenuController,
    getLunchStewPercentageController,
} from "../controllers/menuController";
import {addDataToLocalStorage, getDataFromLocalStorage} from "../helpers/storage/asyncStorage";
import {ERROR_STATUS, SUCCESS_STATUS} from "../errorLogs/errorStatus";
import {getUTCDateTime} from "./timeService";
import {log} from "../helpers/logs/log";

export async function getLunchMeetMenuService() {
    try {
        const result = await getLunchMenuController();

        if (result === "error") {
            return [];
        } else {
            return await result.data.data.meat_menu_lunch.map((item) => ({
                ...item,
                checked: false,
                disableCheckbox: true,
                foodType: 'Meat',
                percentage: 0,
            }));
        }
    } catch (error) {
        log("error", "service", "getLunchMeetMenuService", error.message, "menuService.js");
        return [];
    }
}

export async function getLunchSpecialMenuService() {
    try {
        const result = await getLunchMenuController();

        if (result === "error") {
            return [];
        } else {
            return result.data.data.special_menu_lunch.map((item) => {
                const categoryWithChecked = item.category.map((categoryItem) => ({
                    ...categoryItem,
                    checked: false,
                }));

                return {
                    ...item,
                    category: categoryWithChecked,
                    disableCheckbox: true,
                    foodType: 'Special',
                    percentage: 0,
                };
            });
        }
    } catch (error) {
        log("error", "service", "getLunchMeetMenuService", error.message, "menuService.js");
        return [];
    }
}

export async function getLunchRiceMenuService() {
    try {
        const result = await getLunchMenuController();

        if (result === "error") {
            return [];
        } else {
            return await result.data.data?.rice_menu_lunch.map((item) => ({
                ...item,
                checked: false,
                disableCheckbox: true,
                foodType: 'Rice',
                percentage: 0,
            }));
        }
    } catch (error) {
        log("error", "service", "getLunchMeetMenuService", error.message, "menuService.js");
        return [];
    }
}

export async function getLunchVegetableMenuService() {
    try {
        const result = await getLunchMenuController();

        if (result === "error") {
            return [];
        } else {
            return await result.data.data.vege_menu_lunch.map((item) => ({
                ...item,
                checked: false,
                disableCheckbox: true,
                foodType: 'Vegetable',
                percentage: 0,
            }));
        }


    } catch (error) {
        log("error", "service", "getLunchVegetableMenuService", error.message, "menuService.js");
        return [];
    }
}

export async function getLunchStewMenuService() {
    try {
        const result = await getLunchMenuController();

        if (result === "error") {
            return [];
        } else {
            return await result.data.data.stew_menu_lunch.map((item) => ({
                ...item,
                checked: false,
                disableCheckbox: true,
                foodType: 'Stew',
                percentage: 0,
            }));
        }

    } catch (error) {
        log("error", "service", "getLunchStewMenuService", error.message, "menuService.js");
        return [];
    }
}

export async function getDinnerMeetMenuService() {
    try {
        const result = await getDinnerMenuController();

        if (result === "error") {
            return [];
        } else {
            return await result.data.data.meat_menu_dinner.map((item) => ({
                ...item,
                checked: false,
                foodType: 'Meat',
            }));
        }
    } catch (error) {
        log("error", "service", "getDinnerMeetMenuService", error.message, "menuService.js");
        return [];
    }
}

export async function getDinnerSpecialMenuService() {
    try {
        const result = await getDinnerMenuController();

        if (result === "error") {
            return [];
        } else {
            return await result.data.data.special_menu_dinner.map((item) => ({
                ...item,
                checked: false,
                foodType: 'Special',
            }));
        }
    } catch (error) {
        log("error", "service", "getDinnerMeetMenuService", error.message, "menuService.js");
        return [];
    }
}

export async function getDinnerRiceMenuService() {
    try {
        const result = await getDinnerMenuController();

        if (result === "error") {
            return [];
        } else {
            return await result.data.data.rice_menu_dinner.map((item) => ({
                ...item,
                checked: false,
                foodType: 'Rice',
            }));
        }
    } catch (error) {
        log("error", "service", "getDinnerMeetMenuService", error.message, "menuService.js");
        return [];
    }
}

export async function getDinnerVegetableMenuService() {
    try {
        const result = await getDinnerMenuController();

        if (result === "error") {
            return [];
        } else {
            return await result.data.data.vege_menu_dinner.map((item) => ({
                ...item,
                checked: false,
                foodType: 'Vegetable',
            }));
        }
    } catch (error) {
        log("error", "service", "getDinnerVegetableMenuService", error.message, "menuService.js");
        return [];
    }
}

export async function getDinnerStewMenuService() {
    try {
        const result = await getDinnerMenuController();

        if (result === "error") {
            return [];
        } else {
            return await result.data.data.stew_menu_dinner.map((item) => ({
                ...item,
                checked: false,
                foodType: 'Stew',
            }));
        }

    } catch (error) {
        log("error", "service", "getDinnerStewMenuService", error.message, "menuService.js");
        return [];
    }
}

export async function setMenuBasketService(totalCheckedItems, totalAmount, venue, isVegi, isSpecial) {
    try {
        const {data: {datetime}} = await getUTCDateTime();
        const currentDateTime = new Date(datetime);
        currentDateTime.getUTCHours();
        currentDateTime.getUTCMinutes();
        let existingBasket = JSON.parse(await getDataFromLocalStorage('basket') || '{}');

        if (totalCheckedItems.length > 0) {
            let mealNumber = existingBasket.meal?.length > 0 ? existingBasket.meal.length + 1 : 1;

            if (isSpecial) {
                totalCheckedItems.forEach((item) => {
                    const id = new Date().getTime().toString();

                    const meal = {
                        id: id + item.id,
                        name: 'Meal ' + mealNumber,
                        items: [item],
                        date: currentDateTime.toISOString(),
                        count: 1,
                        unitPrice: item.price,
                        totalPrice: item.price,
                        venue: venue,
                        isVegi: isVegi,
                        isSpecial: isSpecial,
                    };

                    existingBasket.meal = existingBasket.meal || [];
                    existingBasket.meal.push(meal);
                    mealNumber++;
                });
            } else {
                const id = new Date().getTime().toString();

                const meal = {
                    id: id,
                    name: 'Meal ' + mealNumber,
                    items: totalCheckedItems,
                    date: currentDateTime.toISOString(),
                    count: 1,
                    unitPrice: totalAmount,
                    totalPrice: totalAmount,
                    venue: venue,
                    isVegi: isVegi,
                    isSpecial: isSpecial,
                };

                existingBasket.meal = existingBasket.meal || [];
                existingBasket.meal.push(meal);
            }

            existingBasket.venue = venue;
        }

        const jsonValue = JSON.stringify(existingBasket);
        await addDataToLocalStorage('basket', jsonValue);

        log('info', 'service', 'setMenuBasketService', SUCCESS_STATUS.SUCCESS, 'menuService.js');
        return SUCCESS_STATUS.SUCCESS;

    } catch (error) {
        log('error', 'service', 'setMenuBasketService' + error.message, 'menuService.js');
        return ERROR_STATUS.ERROR;
    }
}

export async function removeMealFromBasketService(mealId) {
    try {
        let existingBasket = await getDataFromLocalStorage('basket');
        existingBasket = JSON.parse(existingBasket || '{}');

        const mealIndex = existingBasket.meal.findIndex((meal) => meal.id === mealId);

        if (mealIndex !== -1) {
            existingBasket.meal.splice(mealIndex, 1);

            const jsonValue = JSON.stringify(existingBasket);
            await addDataToLocalStorage('basket', jsonValue);

            log('info', 'service', 'removeMealFromBasketService', SUCCESS_STATUS.SUCCESS, 'menuService.js');
        }
    } catch (error) {
        log("error", "service", "removeMealFromBasketService", error.message, "menuService.js");
        return [];
    }
}

export async function getByMealIdFromBasketService(mealId) {
    try {
        let existingBasket = await getDataFromLocalStorage('basket');
        existingBasket = JSON.parse(existingBasket || '{}');

        const meal = existingBasket.meal.find((meal) => meal.id.toString() === mealId);

        if (meal) {
            return meal;
        } else {
            log('info', 'service', 'getByMealIdFromBasketService', 'Meal not found', 'menuService.js');
            return null;
        }
    } catch (error) {
        log('error', 'service', 'getByMealIdFromBasketService', error.message, 'menuService.js');
        return null;
    }
}

export async function updateBasketFromId(mealId, updatedMeal) {
    try {
        let existingBasket = JSON.parse(await getDataFromLocalStorage('basket') || '{}');

        if (existingBasket.meal && existingBasket.meal.length > 0) {
            const mealIndex = existingBasket.meal.findIndex((meal) => meal.id === mealId);

            if (mealIndex !== -1) {
                existingBasket.meal[mealIndex].items = [...updatedMeal];

                const jsonValue = JSON.stringify(existingBasket);
                await addDataToLocalStorage('basket', jsonValue);

                log('info', 'service', 'updateBasketFromId', SUCCESS_STATUS.SUCCESS, 'menuService.js');
                return SUCCESS_STATUS.SUCCESS;
            }
        }

        // If the meal is not found in the basket, return an error status
        return ERROR_STATUS.ERROR;

    } catch (error) {
        log('error', 'service', 'updateBasketFromId' + error.message, 'menuService.js');
        return ERROR_STATUS.ERROR;
    }
}

export async function fetchMenuData() {
    try {
        const [
            specialMenuLunch,
            riceMenuLunch,
            meetMenuLunch,
            stewMenuLunch,
            vegetableMenuLunch,

            specialMenuDinner,
            riceMenuDinner,
            meetMenuDinner,
            stewMenuDinner,
            vegetableMenuDinner,
        ] = await Promise.all([
            getLunchSpecialMenuService(),
            getLunchRiceMenuService(),
            getLunchMeetMenuService(),
            getLunchStewMenuService(),
            getLunchVegetableMenuService(),

            getDinnerSpecialMenuService(),
            getDinnerRiceMenuService(),
            getDinnerMeetMenuService(),
            getDinnerStewMenuService(),
            getDinnerVegetableMenuService(),
        ]);

        return {
            specialMenuLunch,
            riceMenuLunch,
            meetMenuLunch,
            stewMenuLunch,
            vegetableMenuLunch,
            specialMenuDinner,
            riceMenuDinner,
            meetMenuDinner,
            stewMenuDinner,
            vegetableMenuDinner,
        };
    } catch (error) {
        throw new Error("Error fetching menus");
    }
}

export async function getLunchStewPercentageService(vegiId1, vegiId2, stewId) {
    try {
        const data = await getLunchStewPercentageController(vegiId1, vegiId2);
        if (data.code !== 0) return 0;

        const stew = data && data.data && data.data.data && data.data.data.find(item => item.id.number === stewId);
        if (stew && stew.suitability) {
            return parseInt(stew.suitability);
        } else {
            return 0;
        }

    } catch (error) {
        log("error", "service", "getStewPercentage", error.message, "menuService.js");
        return 0;
    }
}

export async function getLunchMeetPercentageService(vegiId1, vegiId2, stewId, meetId) {
    try {
        if (!vegiId1 || !vegiId2 || !stewId || !meetId) return 0;

        const data = await getLunchMeetPercentageController(vegiId1, vegiId2, stewId);
        if (data.code !== 0) return 0;

        const meet = data && data.data && data.data.data && data.data.data.find(item => item.id.number === meetId);
        if (meet && meet.suitability) {
            return parseInt(meet.suitability);
        } else {
            return 0;
        }

    } catch (error) {
        log("error", "service", "getMeetPercentage", error.message, "menuService.js");
        return 0;
    }
}

export async function getDinnerStewPercentageService(vegiId1, vegiId2, stewId) {
    try {
        const data = await getDinnerStewPercentageController(vegiId1, vegiId2);
        if (data.code !== 0) return 0;

        const stew = data && data.data && data.data.data && data.data.data.find(item => item.id.number === stewId);
        if (stew && stew.suitability) {
            return parseInt(stew.suitability);
        } else {
            return 0;
        }

    } catch (error) {
        log("error", "service", "getStewPercentage", error.message, "menuService.js");
        return 0;
    }
}

export async function getDinnerMeetPercentageService(vegiId1, vegiId2, stewId, meetId) {
    try {
        if (!vegiId1 || !vegiId2 || !stewId || !meetId) return 0;

        const data = await getDinnerMeetPercentageController(vegiId1, vegiId2, stewId);
        if (data.code !== 0) return 0;

        const meet = data && data.data && data.data.data && data.data.data.find(item => item.id.number === meetId);
        if (meet && meet.suitability) {
            return parseInt(meet.suitability);
        } else {
            return 0;
        }
    } catch (error) {
        log("error", "service", "getMeetPercentage", error.message, "menuService.js");
        return 0;
    }
}

export async function fetchBasket(mealId, setCount, setBasket) {
    try {
        let basketItems = await getDataFromLocalStorage('basket');
        basketItems = JSON.parse(basketItems);

        if (basketItems?.meal?.length > 0) {
            basketItems.meal = basketItems.meal.map((item) => {
                if (item.id === mealId) {
                    setCount(item.count);
                }
                return item;
            });
        }

        setBasket(basketItems);
        console.log("basketItems", basketItems);
    } catch (error) {
        log("Error :: BasketScreen :: fetchBasket :: ", error.message, "BasketItem.js");
    }
};


