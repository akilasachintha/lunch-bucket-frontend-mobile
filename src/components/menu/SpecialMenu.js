import React from 'react';
import {ScrollView, StyleSheet, Switch, Text, View} from 'react-native';
import ItemList from '../list/ItemList';
import BasketButton from './BasketButton';
import Timer from "../timer/Timer";

const SpecialMenu = ({
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
                         isVegi,
                         setIsVegi,
                     }) => {

    const toggleSwitch = () => {
        setIsVegi((previousState) => !previousState);
    };

    return (
        <View style={styles.bodyContentContainer}>
            <Timer remainingTime={remainingTime}
                   remainingTimeColor={remainingTimeColor}
                   title={title}
                   disableTime={disableTime}/>
            <ScrollView style={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.pickUpDishesText}>You can pick up to 5 dishes.</Text>
                    <Switch
                        onValueChange={toggleSwitch}
                        value={isVegi}
                    />
                </View>
                <View style={styles.itemContainer}>
                    {itemList?.length > 0 &&
                        itemList.map((list, index) => (
                            <ItemList
                                key={index}
                                title={list.type}
                                items={list.items}
                                disableCheckbox={disableTime}
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
                isVegi={isVegi}
            />
        </View>
    );
};

export default SpecialMenu;

const styles = StyleSheet.create({
    bodyContentContainer: {
        flex: 6,
    },
    itemContainer: {},
    scrollViewContainer: {},
    pickUpDishesText: {
        textAlign: 'center',
        fontSize: 15,
        color: '#4D4D4D',
    },
    descriptionContainer: {
        paddingVertical: '2%',
        paddingHorizontal: '10%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});
