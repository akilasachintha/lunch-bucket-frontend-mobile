import {SafeAreaView, ScrollView, StyleSheet, View} from "react-native";
import {Fontisto} from '@expo/vector-icons';
import BasketItem from "../../components/basketItem/BasketItem";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import TopHeader from "../../components/topHeader/TopHeader";
import BorderButton from "../../components/borderButton/BorderButton";
import React, {useState} from "react";
import StaticTopBar from "../../components/topBar/StaticTopBar";
import BottomButton from "../../components/buttons/BottomButton";
import {getDataFromLocalStorage} from "../../helpers/storage/asyncStorage";
import {log} from "../../helpers/logs/log";
import {useToast} from "../../helpers/toast/Toast";

export default function BasketScreen() {
    const [basket, setBasket] = useState({});

    const navigation = useNavigation();
    const plusIcon = <Fontisto name="plus-a" size={18} color="#7E1F24"/>;

    const {showToast} = useToast();

    const fetchBasket = async () => {
        try {
            let basketItems = await getDataFromLocalStorage('basket');
            log("info", "BasketScreen", "fetchBasketItems | basketItems", JSON.stringify(basketItems), "BasketScreen.js")

            if (!basketItems) {
                log("error", "BasketScreen", "fetchBasketItems | basketItems", basketItems, "BasketScreen.js");
                return;
            }

            basketItems = JSON.parse(basketItems);
            log("info", "BasketScreen", "fetchBasketItems | basketItems", basketItems, "BasketScreen.js");
            setBasket(basketItems);

        } catch (error) {
            log("error", "BasketScreen", "fetchBasketItems", error.message, "BasketScreen.js");
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchBasket().catch((error) =>
                log("error", "BasketScreen", "useFocusEffect", error.message, "BasketScreen.js")
            );
        }, [])
    );

    const handleProceedToOrder = () => {
        if (basket && basket.meal && basket.meal.length > 0) {
            navigation.navigate('Checkout');
        } else {
            showToast("error", "Please add at least one meal to proceed.");
        }
    }

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <StaticTopBar/>
            <TopHeader headerText="Your Bucket" backButtonPath="Menu"/>
            <View style={styles.bodyContainer}>
                <ScrollView>
                    {
                        basket && basket.meal && basket.meal.length > 0 && basket.meal.map((meal, index) => (
                            <BasketItem key={index} index={meal.id} mealName={meal.name} mealId={meal.id}
                                        items={meal.items} setBasket={setBasket} isSpecial={meal.isSpecial}/>
                        ))
                    }
                </ScrollView>
                <BorderButton text="Add Meal" onPress={() => navigation.navigate('Menu')}
                              icon={plusIcon}/>
                <BottomButton buttonText="Proceed to Order" onPress={handleProceedToOrder}/>
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
    addAnotherMealContainer: {
        flexDirection: "row",
        paddingVertical: 10,
        marginVertical: 40,
        marginHorizontal: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#630A10',
        borderWidth: 2,
        borderRadius: 40,
    },
    addAnotherMealText: {
        fontSize: 18,
        marginLeft: 10,
        color: '#630A10',
        fontWeight: 'bold',
    },
});