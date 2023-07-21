import {SafeAreaView, ScrollView, StyleSheet, View} from "react-native";
import {Fontisto} from '@expo/vector-icons';
import BasketItem from "../../components/basketItem/BasketItem";
import {useNavigation} from "@react-navigation/native";
import TopHeader from "../../components/topHeader/TopHeader";
import React, {useState} from "react";
import StaticTopBar from "../../components/topBar/StaticTopBar";

export default function ListOrdersScreen() {
    const [basket, setBasket] = useState({});

    const navigation = useNavigation();
    const plusIcon = <Fontisto name="plus-a" size={18} color="#7E1F24"/>;

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            {/*{isVisible && <TodayWinnerModal isVisible={isVisible} setIsVisible={setIsVisible}/>}*/}
            <StaticTopBar/>
            <TopHeader headerText="Your Orders" backButtonPath="Menu"/>
            <View style={styles.bodyContainer}>
                <ScrollView>
                    {
                        basket && basket.meal && basket.meal.length > 0 && basket.meal.map((meal) => (
                            <BasketItem key={meal.id} index={meal.id} mealName={meal.name} mealId={meal.id}
                                        items={meal.items} setBasket={setBasket}/>
                        ))
                    }
                </ScrollView>
                {/*<BorderButton text="Add Another Meal" onPress={() => navigation.navigate('Menu')}*/}
                {/*              icon={plusIcon}/>*/}
                {/*<BottomButton buttonText="Proceed to Order" onPress={() => navigation.navigate('Checkout')}/>*/}
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