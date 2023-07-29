import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import CheckoutItem from "../../components/checkoutItem/CheckoutItem";
import TopHeader from "../../components/topHeader/TopHeader";
import OrderPlaceSuccessfulModal from "../../components/modals/OrderPlaceSuccessfulModal";
import StaticTopBar from "../../components/topBar/StaticTopBar";
import BottomButton from "../../components/buttons/BottomButton";
import {getDataFromLocalStorage} from "../../helpers/storage/asyncStorage";
import {log} from "../../helpers/logs/log";
import {handleCheckoutService} from "../../services/checkoutService";
import {ERROR_STATUS} from "../../errorLogs/errorStatus";
import {useToast} from "../../helpers/toast/Toast";

export default function Checkout() {
    const [isVisible, setIsVisible] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const [basket, setBasket] = useState({});

    const navigation = useNavigation();
    const {showToast} = useToast();

    const fetchCheckout = async () => {
        try {
            const result = await handleCheckoutService();
            if (result === ERROR_STATUS.ERROR) {
                log("error", "CheckoutScreen", "fetchCheckout | result", result, "CheckoutScreen.js");
                showToast("error", "Order Limit is over. Please try again later.");
            } else {
                log("success", "CheckoutScreen", "fetchCheckout | result", result, "CheckoutScreen.js");
                return true;
            }
        } catch (error) {
            log("error", "CheckoutScreen", "fetchCheckout", error.message, "CheckoutScreen.js");
            return false;
        }
    }

    const handleCheckout = async () => {
        try {
            const orderPlacedSuccessfully = await fetchCheckout();

            if (orderPlacedSuccessfully) {
                setIsVisible(true);

                setTimeout(() => {
                    setIsVisible(false);
                    navigation.navigate('OrdersList');
                }, 4000);
            }
        } catch (error) {
            log("error", "CheckoutScreen", "handleCheckout", error.message, "CheckoutScreen.js");
        }
    };

    const fetchBasket = async () => {
        try {
            let basketItems = await getDataFromLocalStorage('basket');
            if (!basketItems) return;

            basketItems = JSON.parse(basketItems);
            if (basketItems && basketItems.meal && basketItems.meal.length > 0) {
                let totalAmount = 0;

                basketItems.meal.forEach((meal) => {
                    totalAmount += meal.totalPrice;
                });

                basketItems.totalPrice = totalAmount;
                setTotalAmount(totalAmount);
            }
            setBasket(basketItems);
        } catch (error) {
            log("error", "CheckoutScreen", "fetchBasket", error.message, "CheckoutScreen.js");
        }
    };

    useEffect(() => {
        fetchBasket().catch(
            (error) => log("error", "CheckoutScreen", "useEffect", error.message, "CheckoutScreen.js"),
        );
    }, []);

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            {isVisible && <OrderPlaceSuccessfulModal isVisible={isVisible} setIsVisible={setIsVisible}/>}
            <StaticTopBar/>
            <TopHeader headerText="Order Details" backButtonPath="Basket"/>
            <View style={styles.bodyContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {basket && basket.meal && basket.meal.length > 0 && basket.meal.map((meal) => (
                        <CheckoutItem key={meal.id} index={meal.id} mealName={meal.name} mealId={meal.id}
                                      count={meal.count} price={meal.totalPrice}/>
                    ))}
                </ScrollView>
                <View style={styles.amountListContainer}>
                    <TouchableOpacity style={styles.amountContainer}>
                        <Text style={styles.amountLeftContainer}>Total Bill Amount</Text>
                        <Text style={styles.amountRightContainer}>Rs {totalAmount}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.amountContainer}>
                        <Text style={styles.totalAmountLeftContainer}>Total Amount</Text>
                        <Text style={styles.totalAmountRightContainer}>Rs {totalAmount}</Text>
                    </TouchableOpacity>
                </View>
                <BottomButton buttonText="Place Order" onPress={handleCheckout}/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    bodyContainer: {
        flex: 10,
    },
    bodyTopBar: {
        backgroundColor: '#7E1F24',
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flexDirection: 'row',
    },
    backButtonContainer: {
        flex: 1,
        paddingVertical: 20,
    },
    backButtonIcon: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
    },
    topTextContainer: {
        flex: 5,
        paddingVertical: 20,
    },
    topText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        color: '#fff',
    },
    amountListContainer: {
        paddingVertical: "5%",
    },
    amountContainer: {
        flexDirection: "row",
        paddingVertical: 10,
        marginHorizontal: 40,
        alignItems: 'center',
    },
    amountLeftContainer: {
        fontSize: 18,
        flex: 1,
        fontWeight: 'bold',
    },
    amountRightContainer: {
        flex: 1,
        fontSize: 18,
        color: 'rgba(71, 71, 71, 1)',
        textAlign: 'right'
    },
    deliveryAmountLeftContainer: {
        fontSize: 18,
        flex: 1,
    },
    totalAmountLeftContainer: {
        fontSize: 18,
        flex: 1,
        color: '#7E1F24',
    },
    totalAmountRightContainer: {
        fontSize: 18,
        flex: 1,
        color: '#7E1F24',
        fontWeight: 'bold',
        textAlign: 'right'
    },
});