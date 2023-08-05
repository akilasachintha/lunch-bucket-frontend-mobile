import React, {useEffect, useState} from "react";
import {ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, View} from "react-native";
import {Fontisto} from '@expo/vector-icons';
import BasketItem from "../../components/basketItem/BasketItem";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import TopHeader from "../../components/topHeader/TopHeader";
import BorderButton from "../../components/borderButton/BorderButton";
import StaticTopBar from "../../components/topBar/StaticTopBar";
import BottomButton from "../../components/buttons/BottomButton";
import {getDataFromLocalStorage} from "../../helpers/storage/asyncStorage";
import {log} from "../../helpers/logs/log";
import {useToast} from "../../helpers/toast/Toast";

export default function BasketScreen() {
    const [basket, setBasket] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    // const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation();
    const plusIcon = <Fontisto name="plus-a" size={18} color="#7E1F24"/>;

    const {showToast} = useToast();

    const fetchBasket = async () => {
        try {
            // setIsLoading(true);
            let basketItems = await getDataFromLocalStorage('basket');
            log("info", "BasketScreen", "fetchBasketItems | basketItems", JSON.stringify(basketItems), "BasketScreen.js");

            if (!basketItems) {
                // setIsLoading(false);
                return;
            }

            basketItems = JSON.parse(basketItems);
            console.log("basketItems", basketItems);
            log("info", "BasketScreen", "fetchBasketItems | basketItems", basketItems, "BasketScreen.js");
            setBasket(basketItems);
            // setIsLoading(false);
        } catch (error) {
            log("error", "BasketScreen", "fetchBasketItems", error.message, "BasketScreen.js");
            // setIsLoading(false);
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

    const handleProceedToOrder = () => {
        if (basket && basket.meal && basket.meal.length > 0) {
            navigation.navigate('Checkout');
        } else {
            showToast("error", "Please add at least one meal to proceed.");
        }
    }

    // if (isLoading) {
    //     return (
    //         <SafeAreaView style={styles.safeAreaContainer}>
    //             <StaticTopBar/>
    //             <TopHeader headerText="Your Bucket" backButtonPath="Menu"/>
    //             <View style={styles.bodyContainer}>
    //                 <ActivityIndicator size="large" color="#7E1F24" style={styles.loadingIndicator}/>
    //                 <BorderButton text="Add Meal" onPress={() => navigation.navigate('Menu')} icon={plusIcon}/>
    //                 <BottomButton buttonText="Proceed to Order" onPress={handleProceedToOrder}/>
    //             </View>
    //         </SafeAreaView>
    //     )
    // }

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <StaticTopBar/>
            <TopHeader headerText="Your Bucket" backButtonPath="Menu"/>
            <View style={styles.bodyContainer}>
                <ScrollView>
                    {
                        basket && basket.meal && basket.meal.length > 0 && basket.meal.map((meal, index) => (
                            <BasketItem
                                setIsModalVisible={setIsModalVisible}
                                isModalVisible={isModalVisible}
                                key={index}
                                mealName={meal.name}
                                mealId={meal.id}
                                items={meal.items}
                                setBasket={setBasket}
                                itemCount={meal.count}
                                isSpecial={meal.isSpecial}
                            />
                        ))
                    }
                </ScrollView>
                <BorderButton text="Add Meal" onPress={() => navigation.navigate('Menu')} icon={plusIcon}/>
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
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
