import axios from "axios";

export async function getLunchMenu() {
    try {
        const response = await axios.get('https://jeyh1ybmc2.execute-api.ap-south-1.amazonaws.com/dev/lunch/getMenus');
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export async function getDinnerMenu() {
    try {
        const response = await axios.get('https://jeyh1ybmc2.execute-api.ap-south-1.amazonaws.com/dev/dinner/getMenus');
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}