import React from 'react';
import {View, ScrollView, Text, TouchableOpacity, StyleSheet} from 'react-native';
import ItemList from "../list/ItemList";

const Menu = ({ itemList, totalCheckedItems, timeLimit }) => {
    return (
        <View style={styles.bodyContentContainer}>
            <ScrollView>
                <View>
                    <Text style={styles.cantPlaceAfterText}>You can’t place orders after {timeLimit}</Text>
                </View>
                <View>
                    <Text style={styles.pickUpDishesText}>You can pick up to 5 dishes.</Text>
                </View>
                {itemList.map((list, index) => (
                    <ItemList
                        key={index}
                        title={list.title}
                        items={list.items}
                        handleItemPress={list.handleItemPress}
                    />
                ))}
            </ScrollView>
            <View style={styles.priceContainer}>
                <TouchableOpacity style={styles.priceContainerLeft}>
                    <Text style={styles.priceContainerLeftText}>View Bucket ({totalCheckedItems})</Text>
                </TouchableOpacity>
                <View style={styles.priceContainerRight}>
                    <Text style={styles.priceContainerRightText}>Rs 400.00</Text>
                </View>
            </View>
        </View>
    );
};

export default Menu;


const styles = StyleSheet.create({
    bodyContentContainer: {
        marginTop: 20,
        flex: 6,
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
    priceContainer: {
        backgroundColor: 'rgba(255, 230, 98, 1)',
        paddingVertical: 20,
        flexDirection: 'row',
    },
    priceContainerLeft: {
        alignItems: 'center',
        flex: 1,
    },
    priceContainerRight: {
        alignItems: 'center',
        flex: 1,
    },
    priceContainerLeftText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#630A10',
    },
    priceContainerRightText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#630A10',
    },
});