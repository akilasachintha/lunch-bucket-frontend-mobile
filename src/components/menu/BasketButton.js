import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {setMenuBasketService, updateBasketFromId} from "../../services/menuService";
import {useToast} from "../../helpers/toast/Toast";

const BasketButton = ({totalCheckedItemsCount, totalAmount, totalCheckedItems, venue, editMenu, mealId}) => {
    const navigation = useNavigation();
    const {showToast} = useToast();

    const handleBasketPress = async () => {
        if (totalCheckedItemsCount > 0 && totalCheckedItemsCount < 4) {
            showToast("warning", "Need to select 4 items to proceed");
        } else {
            const basketItems = totalCheckedItems.filter(item => item.checked === true);
            if (editMenu && mealId > 0) {
                await updateBasketFromId(mealId, basketItems);
                showToast("success", "Basket updated successfully");
                navigation.navigate('Basket');
            } else {
                await setMenuBasketService(basketItems, totalAmount, venue);
                navigation.navigate('Basket');
            }
        }
    }

    return (
        <View style={styles.priceContainer}>
            <TouchableOpacity
                style={styles.priceContainerLeft}
                onPress={() => handleBasketPress()}
            >
                {
                    !editMenu ? (
                        <Text style={styles.priceContainerLeftText}>View Basket {
                            totalCheckedItemsCount > 0 && `(${totalCheckedItemsCount})`
                        }
                        </Text>
                    ) : (
                        <Text style={styles.priceContainerLeftText}>Update Basket {
                            totalCheckedItemsCount > 0 && `(${totalCheckedItemsCount})`
                        }
                        </Text>
                    )
                }
            </TouchableOpacity>
            {
                totalCheckedItemsCount > 0 && (
                    <View style={styles.priceContainerRight}>
                        <Text style={styles.priceContainerRightText}>Rs {totalAmount}</Text>
                    </View>
                )
            }
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