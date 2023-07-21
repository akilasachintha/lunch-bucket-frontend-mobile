import AsyncStorage from "@react-native-async-storage/async-storage";

const addDataToLocalStorage = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.log("Error :: AsyncStorage :: addDataToLocalStorage :: " + e.message);
    }
};

const getDataFromLocalStorage = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        }
    } catch (e) {
        console.log("Error :: AsyncStorage :: getDataFromLocalStorage :: " + e.message);
        return null;
    }
};

const removeDataFromLocalStorage = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        console.log("Error :: AsyncStorage :: removeDataFromLocalStorage :: " + e.message);
    }
};

export {addDataToLocalStorage, getDataFromLocalStorage, removeDataFromLocalStorage};