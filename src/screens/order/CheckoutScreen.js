import {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import CheckoutItem from "../../components/checkoutItem/CheckoutItem";
import TopHeader from "../../components/topHeader/TopHeader";
import OrderPlaceSuccessfulModal from "../../components/modals/OrderPlaceSuccessfulModal";
import StaticTopBar from "../../components/topBar/StaticTopBar";
import BottomButton from "../../components/buttons/BottomButton";

export default function Checkout() {
    const [isVisible, setIsVisible] = useState(false);
    const navigation = useNavigation();

    const handleCheckout = () => {
        setIsVisible(true);
        if (!isVisible) navigation.navigate('Checkout');
    };

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            {isVisible && <OrderPlaceSuccessfulModal isVisible={isVisible} setIsVisible={setIsVisible}/>}
            <StaticTopBar/>
            <TopHeader headerText="Order Details" backButtonPath="Basket"/>
            <View style={styles.bodyContainer}>
                <ScrollView>
                    <CheckoutItem mealName="Meal 1" count={4} price={500}/>
                    <CheckoutItem mealName="Meal 2" count={1} price={400}/>
                    <CheckoutItem mealName="Meal 3" count={2} price={300}/>
                </ScrollView>
                <View style={styles.amountListContainer}>
                    <TouchableOpacity style={styles.amountContainer}>
                        <Text style={styles.amountLeftContainer}>Total Bill Amount</Text>
                        <Text style={styles.amountRightContainer}>Rs 800.00</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.amountContainer}>
                        <Text style={styles.deliveryAmountLeftContainer}>Delivery</Text>
                        <Text style={styles.amountRightContainer}>Rs 50.00</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.amountContainer}>
                        <Text style={styles.totalAmountLeftContainer}>Total Amount</Text>
                        <Text style={styles.totalAmountRightContainer}>Rs 850.00</Text>
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
        paddingTop: 20,
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
        marginVertical: 10,
        marginBottom: 40,
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