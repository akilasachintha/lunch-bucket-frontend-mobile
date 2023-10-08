import {getDinnerMenuController, getLunchMenuController,} from "../controllers/menuController";
import {addDataToLocalStorage, getDataFromLocalStorage} from "../helpers/storage/asyncStorage";
import {ERROR_STATUS, SUCCESS_STATUS} from "../errorLogs/errorStatus";
import {getUTCDateTime} from "./timeService";
import {log} from "../helpers/logs/log";
import moment from "moment/moment";
import {useState} from "react";
import {useAuth} from "../context/AuthContext";
import {BASE_URL, createAxiosInstance} from "../config/axiosConfig";

export const useMenuService = () => {
    const authContext = useAuth();
    const axiosInstanceForLunchBucket = createAxiosInstance(authContext, BASE_URL.LUNCHBUCKET);
    const [menu, setMenu] = useState();

    async function lunchMenuService() {
        const response = await axiosInstanceForLunchBucket.get('lunch/getMenus');
        console.log(response.data.data);
        setMenu(response.data.data);
    }

    async function getLunchMenuService() {
        try {
            const result = await getLunchMenuController();

            if (result === "error") {
                return [];
            } else {
                return result.data.data;
            }
        } catch (error) {
            log("error", "service", "getLunchMenuService", error.message, "useMenuService.js");
            return [];
        }
    }

    async function getDinnerMenuService() {
        try {
            const result = await getDinnerMenuController();

            if (result === "error") {
                return [];
            } else {
                return result.data.data;
            }
        } catch (error) {
            log("error", "service", "getDinnerMenuService", error.message, "useMenuService.js");
            return [];
        }
    }

    async function getLunchMeetMenuService(lunchMenu) {
        try {
            const result = lunchMenu;
            if (!result) {
                return [];
            } else {
                return await result.meat_menu_lunch.map((item) => ({
                    ...item,
                    checked: false,
                    disableCheckbox: true,
                    foodType: 'Meat',
                    percentage: 0,
                }));
            }
        } catch (error) {
            log("error", "service", "getLunchMeetMenuService", error.message, "useMenuService.js");
            return [];
        }
    }

    async function getLunchSpecialMenuService(lunchMenu) {
        try {
            const result = lunchMenu;
            if (!result) {
                return [];
            } else {
                return result.special_menu_lunch.map((item) => {
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
            log("error", "service", "getLunchSpecialMenuService", error.message, "useMenuService.js");
            return [];
        }
    }

    async function getLunchRiceMenuService(lunchMenu) {
        try {
            const result = lunchMenu;
            console.log("result", result);
            if (!result) {
                return [];
            } else {
                return await result.rice_menu_lunch.map((item) => ({
                    ...item,
                    type: item.type.charAt(0).toUpperCase() + item.type.slice(1),
                    checked: false,
                    disableCheckbox: true,
                    foodType: 'Rice',
                    percentage: 0,
                }));
            }
        } catch (error) {
            log("error", "service", "getLunchRiceMenuService", error.message, "useMenuService.js");
            return [];
        }
    }

    async function getLunchVegetableMenuService(lunchMenu) {
        try {
            const result = lunchMenu;
            if (!result) {
                return [];
            } else {
                return await result.vege_menu_lunch.map((item) => ({
                    ...item,
                    checked: false,
                    disableCheckbox: true,
                    foodType: 'Vegetable',
                    percentage: 0,
                }));
            }
        } catch (error) {
            log("error", "service", "getLunchVegetableMenuService", error.message, "useMenuService.js");
            return [];
        }
    }

    async function getLunchStewMenuService(lunchMenu) {
        try {
            const result = lunchMenu;
            if (!result) {
                return [];
            } else {
                return await result.stew_menu_lunch.map((item) => ({
                    ...item,
                    checked: false,
                    disableCheckbox: true,
                    foodType: 'Stew',
                    percentage: 0,
                }));
            }

        } catch (error) {
            log("error", "service", "getLunchStewMenuService", error.message, "useMenuService.js");
            return [];
        }
    }

    async function getDinnerMeetMenuService(dinnerMenu) {
        try {
            const result = dinnerMenu;
            if (!result) {
                return [];
            } else {
                return await result.meat_menu_dinner.map((item) => ({
                    ...item,
                    checked: false,
                    foodType: 'Meat',
                    percentage: 0,
                }));
            }
        } catch (error) {
            log("error", "service", "getDinnerMeetMenuService", error.message, "useMenuService.js");
            return [];
        }
    }

    async function getDinnerSpecialMenuService(dinnerMenu) {
        try {
            const result = dinnerMenu;

            if (!result) {
                return [];
            } else {
                return await result.special_menu_dinner.map((item) => ({
                    ...item,
                    checked: false,
                    foodType: 'Special',
                    percentage: 0,
                }));
            }
        } catch (error) {
            log("error", "service", "getDinnerMeetMenuService", error.message, "useMenuService.js");
            return [];
        }
    }

    async function getDinnerRiceMenuService(dinnerMenu) {
        try {
            const result = dinnerMenu;

            if (!result) {
                return [];
            } else {
                return await result.rice_menu_dinner.map((item) => ({
                    ...item,
                    checked: false,
                    foodType: 'Rice',
                    percentage: 0,
                }));
            }
        } catch (error) {
            log("error", "service", "getDinnerMeetMenuService", error.message, "useMenuService.js");
            return [];
        }
    }

    async function getDinnerVegetableMenuService(dinnerMenu) {
        try {
            const result = dinnerMenu;

            if (!result) {
                return [];
            } else {
                return await result.vege_menu_dinner.map((item) => ({
                    ...item,
                    checked: false,
                    foodType: 'Vegetable',
                    percentage: 0,
                }));
            }
        } catch (error) {
            log("error", "service", "getDinnerVegetableMenuService", error.message, "useMenuService.js");
            return [];
        }
    }

    async function getDinnerStewMenuService(dinnerMenu) {
        try {
            const result = dinnerMenu;

            if (!result) {
                return [];
            } else {
                return await result.stew_menu_dinner.map((item) => ({
                    ...item,
                    checked: false,
                    foodType: 'Stew',
                    percentage: 0,
                }));
            }

        } catch (error) {
            log("error", "service", "getDinnerStewMenuService", error.message, "useMenuService.js");
            return [];
        }
    }

    async function setMenuBasketService(totalCheckedItems, totalAmount, venue, isVeg, isSpecial) {
        try {
            const response = await getUTCDateTime();
            const {utc_time, utc_date} = response;

            const trimmedUtcDate = utc_date.trim();
            const currentTime = moment.utc(`${trimmedUtcDate} ${utc_time}`);

            let existingBasket = JSON.parse(await getDataFromLocalStorage('basket') || '{}');

            if (totalCheckedItems.length > 0) {
                let mealNumber = existingBasket.meal?.length > 0 ? existingBasket.meal.length + 1 : 1;

                if (isSpecial) {
                    totalCheckedItems.forEach((item) => {
                        const id = new Date().getTime().toString();

                        const meal = {
                            id: id + item.id,
                            name: 'Special Meal',
                            items: [item],
                            date: currentTime.toISOString(),
                            count: 1,
                            unitPrice: item.price,
                            totalPrice: item.price,
                            venue: venue,
                            isVeg: isVeg,
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
                        name: isVeg ? 'Veg Meal' : 'Non-Veg Meal',
                        items: totalCheckedItems,
                        date: currentTime.toISOString(),
                        count: 1,
                        unitPrice: totalAmount,
                        totalPrice: totalAmount,
                        venue: venue,
                        isVeg: isVeg,
                        isSpecial: isSpecial,
                    };

                    existingBasket.meal = existingBasket.meal || [];
                    existingBasket.meal.push(meal);
                }

                existingBasket.venue = venue;
            }

            const jsonValue = JSON.stringify(existingBasket);
            await addDataToLocalStorage('basket', jsonValue);

            log('info', 'service', 'setMenuBasketService', SUCCESS_STATUS.SUCCESS, 'useMenuService.js');
            return SUCCESS_STATUS.SUCCESS;

        } catch (error) {
            log('error', 'service', 'setMenuBasketService' + error.message, 'useMenuService.js');
            return ERROR_STATUS.ERROR;
        }
    }

    async function removeMealFromBasketService(mealId) {
        try {
            let existingBasket = await getDataFromLocalStorage('basket');
            existingBasket = JSON.parse(existingBasket || '{}');

            const mealIndex = existingBasket.meal.findIndex((meal) => meal.id === mealId);

            if (mealIndex !== -1) {
                existingBasket.meal.splice(mealIndex, 1);

                const jsonValue = JSON.stringify(existingBasket);
                await addDataToLocalStorage('basket', jsonValue);

                log('info', 'service', 'removeMealFromBasketService', SUCCESS_STATUS.SUCCESS, 'useMenuService.js');
            }
        } catch (error) {
            log("error", "service", "removeMealFromBasketService", error.message, "useMenuService.js");
            return [];
        }
    }

    async function getByMealIdFromBasketService(mealId) {
        try {
            let existingBasket = await getDataFromLocalStorage('basket');
            existingBasket = JSON.parse(existingBasket || '{}');

            const meal = existingBasket.meal.find((meal) => meal.id.toString() === mealId);

            if (meal) {
                return meal;
            } else {
                log('info', 'service', 'getByMealIdFromBasketService', 'Meal not found', 'useMenuService.js');
                return null;
            }
        } catch (error) {
            log('error', 'service', 'getByMealIdFromBasketService', error.message, 'useMenuService.js');
            return null;
        }
    }

    async function updateBasketFromId(mealId, updatedMeal) {
        try {
            let existingBasket = JSON.parse(await getDataFromLocalStorage('basket') || '{}');

            if (existingBasket.meal && existingBasket.meal.length > 0) {
                const mealIndex = existingBasket.meal.findIndex((meal) => meal.id === mealId);

                if (mealIndex !== -1) {
                    existingBasket.meal[mealIndex].items = [...updatedMeal];

                    const jsonValue = JSON.stringify(existingBasket);
                    await addDataToLocalStorage('basket', jsonValue);

                    log('info', 'service', 'updateBasketFromId', SUCCESS_STATUS.SUCCESS, 'useMenuService.js');
                    return SUCCESS_STATUS.SUCCESS;
                }
            }

            // If the meal is not found in the basket, return an error status
            return ERROR_STATUS.ERROR;

        } catch (error) {
            log('error', 'service', 'updateBasketFromId' + error.message, 'useMenuService.js');
            return ERROR_STATUS.ERROR;
        }
    }

    async function fetchMenuData(lunchMenu, dinnerMenu) {
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
                getLunchSpecialMenuService(lunchMenu),
                getLunchRiceMenuService(lunchMenu),
                getLunchMeetMenuService(lunchMenu),
                getLunchStewMenuService(lunchMenu),
                getLunchVegetableMenuService(lunchMenu),

                getDinnerSpecialMenuService(dinnerMenu),
                getDinnerRiceMenuService(dinnerMenu),
                getDinnerMeetMenuService(dinnerMenu),
                getDinnerStewMenuService(dinnerMenu),
                getDinnerVegetableMenuService(dinnerMenu),
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

    async function fetchBasket(mealId, setCount, setBasket) {
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
            setBasket(basketItems);
            console.log("basketItems", basketItems);
        } catch (error) {
            log("Error :: BasketScreen :: fetchBasket :: ", error.message, "BasketItem.js");
        }
    }

    return {
        lunchMenuService,
        getLunchMenuService,
        getDinnerMenuService,
        getLunchMeetMenuService,
        getLunchSpecialMenuService,
        getLunchRiceMenuService,
        getLunchVegetableMenuService,
        getLunchStewMenuService,
        getDinnerMeetMenuService,
        getDinnerSpecialMenuService,
        getDinnerRiceMenuService,
        getDinnerVegetableMenuService,
        getDinnerStewMenuService,
        setMenuBasketService,
        removeMealFromBasketService,
        getByMealIdFromBasketService,
        updateBasketFromId,
        fetchMenuData,
        fetchBasket,
    }
}