import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {setMenuBasketService, updateBasketFromId} from '../../services/menuService';
import {useToast} from '../../helpers/toast/Toast';
import {useSelector} from "react-redux";
import useFetchRemainingTimes from "../../services/timeService";

const BasketButton = ({
                          totalCheckedItemsCount,
                          totalSpecialPrice,
                          totalAmount,
                          totalCheckedItems,
                          venue,
                          mealId,
                          isVeg,
                          totalCheckedSpecialItemsCount,
                          totalCheckedSpecialItems,
                      }) => {
    const navigation = useNavigation();
    const {showToast} = useToast();

    const isEditMenu = useSelector(state => state.menu.isEditMenu);

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const {getUTCDateTime} = useFetchRemainingTimes();

    const handleBasketPress = async () => {
        if (isButtonDisabled) {
            return;
        }

        if (totalCheckedItemsCount > 5) {
            showToast('error', 'You can select only 5 dishes.');
            return;
        }

        setIsButtonDisabled(true);

        if (totalCheckedSpecialItemsCount === 0 && totalCheckedItemsCount === 0) {
            navigation.navigate('Basket');
        }

        if (totalCheckedSpecialItemsCount > 0 && totalCheckedItemsCount <= 0) {
            // Handle special meals
            const basketItems = totalCheckedSpecialItems.filter(item => item.checked === true);

            try {
                if (isEditMenu && mealId > 0) {
                    await updateBasketFromId(mealId, basketItems);
                    showToast('success', 'Basket updated successfully');
                    navigation.navigate('Basket');
                } else {
                    await setMenuBasketService(basketItems, totalAmount, venue, isVeg, true, getUTCDateTime);
                    navigation.navigate('Basket');
                }
            } catch (error) {
                console.error('Error updating basket:', error);
            }
        }

        if (totalCheckedSpecialItemsCount <= 0 && (totalCheckedItemsCount > 0 && totalCheckedItemsCount === 5)) {
            const basketItems = totalCheckedItems.filter(item => item.checked === true);

            try {
                if (isEditMenu && mealId > 0) {
                    await updateBasketFromId(mealId, basketItems);
                    showToast('success', 'Basket updated successfully');
                    navigation.navigate('Basket');
                } else if (totalCheckedItemsCount > 0 && totalCheckedItemsCount === 5) {
                    await setMenuBasketService(basketItems, totalAmount, venue, isVeg, false, getUTCDateTime);
                    navigation.navigate('Basket');
                } else {
                    showToast('error', 'Please select 5 items to proceed.');
                }
            } catch (error) {
                // Handle error here
                console.error('Error updating basket:', error);
            }
        }

        if (totalCheckedSpecialItemsCount <= 0 && (totalCheckedItemsCount > 0 && totalCheckedItemsCount < 5)) {
            showToast('error', 'Please select 5 items to proceed.');
        }

        setTimeout(() => {
            setIsButtonDisabled(false);
        }, 2000);
    };

    return (
        <View style={styles.priceContainer}>
            <TouchableOpacity style={styles.priceContainerLeft} onPress={() => handleBasketPress()}>
                {!isEditMenu ? (
                    <Text style={styles.priceContainerLeftText}>
                        {(totalCheckedItemsCount <= 0 && totalCheckedSpecialItemsCount <= 0) ? 'View ' : 'Add to '}
                        Basket {totalCheckedItemsCount > 0 || totalCheckedSpecialItemsCount > 0 ? `(${totalCheckedItemsCount + totalCheckedSpecialItemsCount})` : ''}
                    </Text>
                ) : (
                    <Text style={styles.priceContainerLeftText}>
                        Update
                        Basket {totalCheckedItemsCount > 0 || totalCheckedSpecialItemsCount > 0 ? `(${totalCheckedItemsCount + totalCheckedSpecialItemsCount})` : ''}
                    </Text>
                )}
            </TouchableOpacity>
            {(totalCheckedItemsCount > 0 || totalCheckedSpecialItemsCount > 0) && (
                <View style={styles.priceContainerRight}>
                    <Text style={styles.priceContainerRightText}>Rs {
                        (totalCheckedItemsCount > 0 ? totalAmount : 0) +
                        (totalCheckedSpecialItemsCount > 0 ? totalSpecialPrice : 0)}</Text>
                </View>
            )}
        </View>
    );
};

export default BasketButton;

const styles = StyleSheet.create({
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
