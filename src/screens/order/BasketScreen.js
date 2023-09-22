import React, {useEffect, useState} from "react";
import {ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, View} from "react-native";
import {Fontisto} from '@expo/vector-icons';
import BasketItem from "../../components/basketItem/BasketItem";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import TopHeader from "../../components/topHeader/TopHeader";
import BorderButton from "../../components/borderButton/BorderButton";
import BottomButton from "../../components/buttons/BottomButton";
import {getDataFromLocalStorage, removeDataFromLocalStorage} from "../../helpers/storage/asyncStorage";
import {log} from "../../helpers/logs/log";
import {useToast} from "../../helpers/toast/Toast";
import DynamicTopBar from "../../components/topBar/DynamicTopBar";
import {SelectedTab} from "../../helpers/enums/enums";
import moment from "moment/moment";
import {getUTCDateTime} from "../../services/timeService";
import {useDispatch} from "react-redux";
import {setIsEditMenuFalseReducer} from "../../redux/menuSlice";

export default function BasketScreen() {
    const {showToast} = useToast();
    const dispatch = useDispatch();

    const [basket, setBasket] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedMealId, setSelectedMealId] = useState(null);

    const navigation = useNavigation();
    const plusIcon = <Fontisto name="plus-a" size={18} color="#7E1F24"/>;

    const fetchBasket = async () => {
        try {
            setIsLoading(true);
            let basketItems = await getDataFromLocalStorage('basket');
            log("info", "BasketScreen", "fetchBasketItems | basketItems", JSON.stringify(basketItems), "BasketScreen.js");

            if (!basketItems) {
                setIsLoading(false);
                return;
            }
            basketItems = JSON.parse(basketItems);

            log("info", "BasketScreen", "fetchBasketItems | basketItems", basketItems, "BasketScreen.js");
            setBasket(basketItems);
            setIsLoading(false);
        } catch (error) {
            log("error", "BasketScreen", "fetchBasketItems", error.message, "BasketScreen.js");
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBasket().catch((error) =>
            log("error", "BasketScreen", "useEffect | fetchBasket", error.message, "BasketScreen.js")
        );
    }, [isModalVisible]);

    useFocusEffect(
        React.useCallback(() => {
            fetchBasket().catch((error) =>
                log("error", "BasketScreen", "useFocusEffect | fetchBasket", error.message, "BasketScreen.js")
            );
        }, [])
    );

    const handleProceedToOrder = async () => {
        const response = await getUTCDateTime();
        const {utc_time, utc_date} = response;

        const trimmedUtcDate = utc_date.trim();
        const currentTime = moment.utc(`${trimmedUtcDate} ${utc_time}`);

        let currentUTCHours = currentTime.hours() + 5;
        let currentUTCMinutes = currentTime.minutes() + 30;

        if (currentUTCMinutes >= 60) {
            currentUTCHours += 1;
            currentUTCMinutes -= 60;
        }

        const hasLunchItems = basket.meal.some(meal => meal.venue === "Lunch");
        const hasDinnerItems = basket.meal.some(meal => meal.venue === "Dinner");
        const isLunch = basket.venue === "Lunch";

        // 10 AM to 4 PM
        if (isLunch && hasLunchItems && (currentUTCHours > 11 || (currentUTCHours === 11 && currentUTCMinutes >= 0)) &&
            (currentUTCHours < 17 || (currentUTCHours === 17 && currentUTCMinutes < 0))) {
            showToast("error", "Lunch orders are closed now. Please order for dinner.");
            await removeDataFromLocalStorage("basket");
            await fetchBasket();
            return;
        }

        // 4 PM to 12 AM
        if (isLunch && hasDinnerItems && (currentUTCHours > 17 || (currentUTCHours === 17 && currentUTCMinutes >= 0)) &&
            (currentUTCHours < 24 || (currentUTCHours === 0 && currentUTCMinutes < 0))) {
            showToast("error", "Dinner orders are closed now. Please order for lunch.");
            await removeDataFromLocalStorage("basket");
            await fetchBasket();
            return;
        }

        // 12 AM to 10 AM
        if (isLunch && hasDinnerItems && (currentUTCHours > 0 || (currentUTCHours === 0 && currentUTCMinutes >= 0)) &&
            (currentUTCHours < 11 || (currentUTCHours === 11 && currentUTCMinutes < 0))) {
            showToast("error", "Dinner orders are closed now. Please order for lunch.");
            await removeDataFromLocalStorage("basket");
            await fetchBasket();
            return;
        }

        if (basket && basket.meal && basket.meal.length > 0) {
            navigation.navigate('Checkout');
        } else {
            showToast("error", "Please add at least one meal to proceed.");
        }
    }

    const handleAddMeal = () => {
        dispatch(setIsEditMenuFalseReducer());
        navigation.navigate('Menu');
    }

    if (isLoading) {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <DynamicTopBar selectedTab={SelectedTab.MAIN}/>
                <TopHeader headerText="Your Bucket" backButtonPath="Menu"/>
                <View style={styles.bodyContainer}>
                    <ActivityIndicator size="large" color="#7E1F24" style={styles.loadingIndicator}/>
                    <BorderButton text="Add Meal" onPress={() => navigation.navigate('Menu')} icon={plusIcon}/>
                    <BottomButton buttonText="Proceed to Order" onPress={handleProceedToOrder}/>
                </View>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <DynamicTopBar selectedTab={SelectedTab.MAIN}/>
            <TopHeader headerText="Your Bucket" backButtonPath="Menu"/>
            <View style={styles.bodyContainer}>
                <ScrollView>
                    {
                        basket && basket.meal && basket.meal.length > 0 && basket.meal.map((meal) => (
                            <BasketItem
                                totalAmount={meal.totalPrice}
                                venue={basket.venue}
                                setIsModalVisible={setIsModalVisible}
                                isModalVisible={isModalVisible}
                                setSelectedMealId={setSelectedMealId}
                                selectedMealId={selectedMealId}
                                key={meal.id}
                                mealName={meal.name}
                                mealId={meal.id}
                                items={meal.items}
                                setBasket={setBasket}
                                itemCount={meal.count}
                                isSpecial={meal.isSpecial}
                                potion={meal.potion}
                                isVeg={meal.isVeg}
                            />
                        ))
                    }
                </ScrollView>
                <BorderButton text="Add Meal" onPress={handleAddMeal} icon={plusIcon}/>
                <BottomButton buttonText="Proceed to Order" onPress={handleProceedToOrder} isLoading={isLoading}/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    bodyContainer: {
        paddingTop: 20,
        flex: 10,
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
