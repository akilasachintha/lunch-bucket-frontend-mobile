import {SafeAreaView, ScrollView, StyleSheet, View} from "react-native";
import {Fontisto} from '@expo/vector-icons';
import BasketItem from "../../components/basketItem/BasketItem";
import {useNavigation} from "@react-navigation/native";
import TopHeader from "../../components/topHeader/TopHeader";
import BorderButton from "../../components/borderButton/BorderButton";
import TodayWinnerModal from "../../components/modals/TodayWinnerModal";
import React, {useState} from "react";
import StaticTopBar from "../../components/topBar/StaticTopBar";
import PromotionButton from "../../components/promotions/PromotionButton";
import BottomButton from "../../components/buttons/BottomButton";

export default function BasketScreen() {
    const [isVisible, setIsVisible] = useState(true);

    const navigation = useNavigation();
    const plusIcon = <Fontisto name="plus-a" size={18} color="#7E1F24"/>;

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            {isVisible && <TodayWinnerModal isVisible={isVisible} setIsVisible={setIsVisible}/>}
            <StaticTopBar/>
            <TopHeader headerText="Your Bucket" backButtonPath="Menu"/>
            <View style={styles.bodyContainer}>
                <ScrollView>
                    <BasketItem mealName="Meal 1"/>
                    <BasketItem mealName="Meal 2"/>
                    <BasketItem mealName="Meal 3"/>
                </ScrollView>
                <BorderButton text="Add Another Meal" onPress={() => navigation.navigate('Promotion')} icon={plusIcon}/>
                <BottomButton buttonText="Proceed to Order" onPress={() => navigation.navigate('Checkout')}/>
                <PromotionButton/>
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