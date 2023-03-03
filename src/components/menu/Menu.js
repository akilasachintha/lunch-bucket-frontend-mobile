import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import ItemList from "../list/ItemList";
import BasketButton from "./BasketButton";
import OrderRatingModal from "../modals/OrderRatingModal";
import PromotionButton from "../promotions/PromotionButton";

const Menu = ({itemList, totalCheckedItems, timeLimit, totalAmount, isVisible, setIsVisible}) => {
    return (
        <View style={styles.bodyContentContainer}>
            <ScrollView style={styles.scrollViewContainer}>
                {isVisible && (<OrderRatingModal isVisible={isVisible} setIsVisible={setIsVisible}/>)}
                <View>
                    <Text style={styles.cantPlaceAfterText}>You can’t place orders after {timeLimit}</Text>
                </View>
                <View>
                    <Text style={styles.pickUpDishesText}>You can pick up to 5 dishes.</Text>
                </View>
                {itemList.map((list, index) => (
                    <ItemList
                        key={index}
                        title={list.type}
                        items={list.items}
                        handleItemPress={list.handleItemPress}
                    />
                ))}
            </ScrollView>
            <BasketButton
                totalCheckedItems={totalCheckedItems}
                totalAmount={totalAmount}
            />
            <PromotionButton/>
        </View>
    );
};

export default Menu;

const styles = StyleSheet.create({
    bodyContentContainer: {
        marginTop: 20,
        flex: 6,
    },
    scrollViewContainer: {
        marginBottom: 20,
    },
    cantPlaceAfterText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#630A10',
    },
    pickUpDishesText: {
        marginTop: 30,
        textAlign: 'center',
        fontSize: 15,
        color: '#4D4D4D',
    },
});