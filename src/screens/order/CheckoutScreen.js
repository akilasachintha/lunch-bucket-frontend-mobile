import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import CheckoutItem from "../../components/checkoutItem/CheckoutItem";
import TopHeader from "../../components/topHeader/TopHeader";
import OrderPlaceSuccessfulModal from "../../components/modals/OrderPlaceSuccessfulModal";
import BottomButton from "../../components/buttons/BottomButton";
import {addDataToLocalStorage, getDataFromLocalStorage} from "../../helpers/storage/asyncStorage";
import {log} from "../../helpers/logs/log";
import {handleCheckoutService} from "../../services/checkoutService";
import {ERROR_STATUS} from "../../errorLogs/errorStatus";
import {useToast} from "../../helpers/toast/Toast";
import DynamicTopBar from "../../components/topBar/DynamicTopBar";
import {SelectedTab} from "../../helpers/enums/enums";
import {getUserPointsService} from "../../services/userProfileService";
import ClaimPointsModal from "../../components/modals/ClaimPointsModal";

export default function Checkout() {
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const [basket, setBasket] = useState({});
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const [points, setPoints] = useState(0);
    const [isPointsApplied, setIsPointsApplied] = useState(false);

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
        if (isPlacingOrder) return;
        setIsPlacingOrder(true);

        try {
            let basketItems = await getDataFromLocalStorage('basket');
            if (!basketItems) return;

            basketItems = JSON.parse(basketItems);
            basketItems.isCash = !!(basketItems && basketItems.isCash);
            console.log(basketItems);

            await addDataToLocalStorage('basket', JSON.stringify(basketItems));

            const orderPlacedSuccessfully = await fetchCheckout();

            if (orderPlacedSuccessfully) {
                setIsVisible(true);
            }

            if (!isVisible) {
                navigation.navigate('OrdersList');
            }

        } catch (error) {
            log("error", "CheckoutScreen", "handleCheckout", error.message, "CheckoutScreen.js");
        } finally {
            setIsPlacingOrder(false);
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

    const fetchUserPoints = async () => {
        try {
            setIsLoading(true);
            const userPoints = await getUserPointsService();
            if (!userPoints) return 0;

            setPoints(userPoints);
            setIsLoading(false);
        } catch (error) {
            setPoints(0);
            log("error", "CheckoutScreen", "fetchUserPoints", error.message, "CheckoutScreen.js");
        }
    }

    useEffect(() => {
        fetchBasket().catch(
            (error) => log("error", "CheckoutScreen", "useEffect", error.message, "CheckoutScreen.js"),
        );
        fetchUserPoints().catch(
            (error) => log("error", "CheckoutScreen", "useEffect", error.message, "CheckoutScreen.js"),
        );
    }, []);

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            {isVisible &&
                <OrderPlaceSuccessfulModal isVisible={isVisible} setIsVisible={setIsVisible} basket={basket}/>}
            {isPointsApplied &&
                <ClaimPointsModal points={points.toFixed(2)} isPointsApplied={isPointsApplied}
                                  setIsPointsApplied={setIsPointsApplied}/>}
            <DynamicTopBar selectedTab={SelectedTab.MAIN}/>
            <TopHeader headerText="Order Details" backButtonPath="Basket"/>
            <View style={styles.bodyContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {basket && basket.meal && basket.meal.length > 0 && basket.meal.map((meal, index) => (
                        <CheckoutItem key={index} index={meal.id} mealName={meal.name} mealId={meal.id}
                                      count={meal.count} price={meal.totalPrice}/>
                    ))}
                </ScrollView>
                <View style={styles.amountListContainer}>
                    <View style={styles.claimPointsMainContainer}>
                        <TouchableOpacity style={styles.claimPointsContainer} onPress={() => setIsPointsApplied(true)}>
                            {isLoading ?
                                <ActivityIndicator size="small" color="#018525"/> :
                                <Text style={styles.claimPointsText}>Claim Your Points Rs {points.toFixed(2)}</Text>
                            }
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.amountContainer}>
                        <Text style={styles.amountLeftContainer}>Bill Amount</Text>
                        <Text style={styles.amountRightContainer}>Rs {totalAmount}.00</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.amountContainer}>
                        <Text style={styles.amountLeftContainer}>Delivery Fee</Text>
                        <Text style={styles.amountRightContainer}>Rs 0.00</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.amountContainer}>
                        <Text style={styles.totalAmountLeftContainer}>Total Amount</Text>
                        <Text style={styles.totalAmountRightContainer}>Rs {totalAmount}.00</Text>
                    </TouchableOpacity>
                </View>
                <BottomButton buttonText="Place Order" onPress={handleCheckout} isLoading={isPlacingOrder}/>
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
    amountListContainer: {
        paddingVertical: "5%",
    },
    amountContainer: {
        flexDirection: "row",
        paddingVertical: 10,
        marginHorizontal: 40,
        alignItems: 'center',
    },
    claimPointsMainContainer: {
        alignItems: 'center',
    },
    claimPointsContainer: {
        backgroundColor: 'rgba(137, 205, 156, 0.46)',
        alignItems: 'center',
        width: '70%',
        paddingVertical: 10,
        marginHorizontal: 40,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#018525',
        marginBottom: 20,
    },
    claimPointsText: {
        color: '#01260b',
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
