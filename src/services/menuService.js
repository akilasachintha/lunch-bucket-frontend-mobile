import {getDinnerMenu, getLunchMenu} from "../controllers/menuController";

export async function getLunchMeetMenu() {
    try {
        const result = await getLunchMenu();
        // console.log(modifiedMenu);
        return await result.data.data.meat_menu_lunch.map((item) => ({
            ...item,
            checked: false,
            foodType: 'Meat',
        }));
    } catch (error) {
        console.log(error.message);
    }
}

export async function getLunchVegetableMenu() {
    try {
        const result = await getLunchMenu();
        // console.log(modifiedMenu);
        return await result.data.data.vege_menu_lunch.map((item) => ({
            ...item,
            checked: false,
            foodType: 'Vegetable',
        }));
    } catch (error) {
        console.log(error.message);
    }
}

export async function getLunchStewMenu() {
    try {
        const result = await getLunchMenu();
        // console.log(modifiedMenu);
        return await result.data.data.stew_menu_lunch.map((item) => ({
            ...item,
            checked: false,
            foodType: 'Stew',
        }));
    } catch (error) {
        console.log(error.message);
    }
}

export async function getDinnerMeetMenu() {
    try {
        const result = await getDinnerMenu();
        // console.log(modifiedMenu);
        return await result.data.data.meat_menu_dinner.map((item) => ({
            ...item,
            checked: false,
            foodType: 'Meat',
        }));
    } catch (error) {
        console.log(error.message);
    }
}

export async function getDinnerVegetableMenu() {
    try {
        const result = await getDinnerMenu();
        // console.log(modifiedMenu);
        return await result.data.data.vege_menu_dinner.map((item) => ({
            ...item,
            checked: false,
            foodType: 'Vegetable',
        }));
    } catch (error) {
        console.log(error.message);
    }
}

export async function getDinnerStewMenu() {
    try {
        const result = await getDinnerMenu();
        // console.log(modifiedMenu);
        return await result.data.data.stew_menu_dinner.map((item) => ({
            ...item,
            checked: false,
            foodType: 'Stew',
        }));
    } catch (error) {
        console.log(error.message);
    }
}