import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import ItemList from '../list/ItemList';
import BasketButton from './BasketButton';
import Timer from "../timer/Timer";

const Menu = ({
                  itemList,
                  title,
                  totalCheckedItemsCount,
                  totalAmount,
                  totalCheckedItems,
                  remainingTime,
                  remainingTimeColor,
                  disableTime,
                  editMenu = false,
                  mealId = 0,
              }) => {

    return (
        <View style={styles.bodyContentContainer}>
            <Timer remainingTime={remainingTime}
                   remainingTimeColor={remainingTimeColor}
                   title={title}
                   disableTime={disableTime}/>
            <ScrollView style={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
                <View>
                    <Text style={styles.pickUpDishesText}>You can pick up to 5 dishes.</Text>
                </View>
                <View style={styles.itemContainer}>
                    {itemList?.length > 0 &&
                        itemList.map((list, index) => (
                            <ItemList
                                key={index}
                                title={list.type}
                                items={list.items}
                                disableCheckbox={list.disableCheckbox}
                                handleItemPress={list.handleItemPress}
                            />
                        ))}
                </View>
            </ScrollView>
            <BasketButton
                totalCheckedItemsCount={totalCheckedItemsCount}
                totalCheckedItems={totalCheckedItems}
                totalAmount={totalAmount}
                venue={title}
                editMenu={editMenu}
                mealId={mealId}
            />
        </View>
    );
};

export default Menu;

const styles = StyleSheet.create({
    bodyContentContainer: {
        flex: 6,
    },
    itemContainer: {
        paddingBottom: '3%',
    },
    scrollViewContainer: {},
    pickUpDishesText: {
        textAlign: 'center',
        fontSize: 15,
        paddingTop: '5%',
        color: '#4D4D4D',
    },
});
