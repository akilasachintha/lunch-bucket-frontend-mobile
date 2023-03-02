import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import TopBar from "../components/topBar/TopBar";
import {Fontisto} from '@expo/vector-icons';
import BasketItem from "../components/basketItem/BasketItem";
import {useNavigation} from "@react-navigation/native";
import TopHeader from "../components/topHeader/TopHeader";
import BorderButton from "../components/borderButton/BorderButton";
import TodayWinnerModal from "../components/modals/TodayWinnerModal";
import React, {useState} from "react";
import {SelectedTab as selectedTab} from "../common/enums/enums";

export default function BasketScreen() {
    const [isVisible, setIsVisible] = useState(true);

    const navigation = useNavigation();
    const plusIcon = <Fontisto name="plus-a" size={18} color="#7E1F24"/>;

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <TopBar selectedTab={selectedTab.PREVIOUS}/>
            <TopHeader headerText="Your Bucket" backButtonPath="Menu"/>
            <View style={styles.bodyContainer}>
                <ScrollView>
                    {isVisible && <TodayWinnerModal isVisible={isVisible} setIsVisible={setIsVisible}/>}
                    <BasketItem mealName="Meal 1"/>
                    <BasketItem mealName="Meal 2"/>
                    <BasketItem mealName="Meal 3"/>
                </ScrollView>
                <BorderButton text="Add Another Meal" onPress={() => navigation.navigate('Promotion')} icon={plusIcon}/>
                <View style={styles.viewItemContainer}>
                    <TouchableOpacity
                        style={styles.viewItemContainerTextContainer}
                        onPress={() => navigation.navigate('Checkout')}
                    >
                        <Text style={styles.viewItemContainerText}> Proceed to Order </Text>
                    </TouchableOpacity>
                </View>
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
    viewItemContainer: {
        backgroundColor: 'rgba(255, 230, 98, 1)',
        paddingVertical: 20,
        flexDirection: 'row',
    },
    viewItemContainerTextContainer: {
        alignItems: 'center',
        flex: 1,
    },
    priceContainerRight: {
        alignItems: 'center',
        flex: 1,
    },
    viewItemContainerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#630A10',
    },
});