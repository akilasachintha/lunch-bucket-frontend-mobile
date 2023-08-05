import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AntDesign, Fontisto} from '@expo/vector-icons';
import {useEffect, useState} from 'react';
import {removeMealFromBasketService} from "../../services/menuService";
import {addDataToLocalStorage, getDataFromLocalStorage} from "../../helpers/storage/asyncStorage";
import {log} from "../../helpers/logs/log";
import {useNavigation} from "@react-navigation/native";

export default function BasketItem({mealName, mealId, items, setBasket, isSpecial = false}) {
    const [count, setCount] = useState(1);
    const [onClicked, setOnClicked] = useState(true);
    const navigation = useNavigation();

    const handleMinusPress = async () => {
        const updatedCount = count !== 0 ? count - 1 : 0;
        setCount(updatedCount);

        if (updatedCount <= 0) {
            await removeMealFromBasketService(mealId);
            await fetchBasket();
        } else {
            await updateBasketCount(mealId, updatedCount);
            await fetchBasket();
        }
    };

    const handlePlusPress = async () => {
        const updatedCount = count + 1;
        setCount(updatedCount);
        await updateBasketCount(mealId, updatedCount);
        await fetchBasket();
    };

    const updateBasketCount = async (mealId, count) => {
        try {
            let basketItems = await getDataFromLocalStorage('basket');
            basketItems = JSON.parse(basketItems);

            if (basketItems?.meal?.length > 0) {
                console.log("basketItems.meal", basketItems.meal);
                basketItems.meal = basketItems.meal.map((item) => {
                    if (item.id === mealId) {
                        return {
                            ...item,
                            count: count,
                            totalPrice: item.unitPrice * count,
                        };
                    }
                    return item;
                });
                const jsonValue = JSON.stringify(basketItems);
                await addDataToLocalStorage('basket', jsonValue);
            }
        } catch (error) {
            log("Error :: BasketScreen :: updateBasketCount :: ", error.message, "BasketItem.js");
        }
    };

    const fetchBasket = async () => {
        try {
            let basketItems = await getDataFromLocalStorage('basket');
            basketItems = JSON.parse(basketItems);

            if (basketItems?.meal?.length > 0) {
                basketItems.meal = basketItems.meal.map((item) => {
                    if (item.id === mealId) {
                        setCount(item.count);
                    }
                    return item;
                });
            }

            setBasket(basketItems);
        } catch (error) {
            log("Error :: BasketScreen :: fetchBasket :: ", error.message, "BasketItem.js");
        }
    };

    useEffect(() => {
        fetchBasket().catch((error) =>
            log("Error :: BasketScreen :: useEffect :: ", error.message, "BasketItem.js")
        );
    }, []);

    const handleEditMealPress = () => {
        navigation.navigate('EditMenu', {mealId});
    }

    return (
        <View>
            {onClicked && (
                <TouchableOpacity style={[styles.bucketItemContainer, styles.elevation, styles.shadowProp]}
                                  onPress={() => setOnClicked(false)}>
                    <View style={styles.bucketItemNameContainer}>
                        <Text style={styles.bucketItemNameText}>{mealName}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.minusButtonTextContainer}
                        onPress={handleMinusPress}
                    >
                        <Fontisto name="minus-a" size={14} color="black"/>
                    </TouchableOpacity>
                    <View style={styles.countTextContainer}>
                        <Text style={styles.countText}>{count}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.plusButtonTextContainer}
                        onPress={handlePlusPress}
                    >
                        <Fontisto name="plus-a" size={14} color="black"/>
                    </TouchableOpacity>
                </TouchableOpacity>
            )}
            {!onClicked && (
                <View>
                    <TouchableOpacity style={styles.bucketItemExpandContainer} onPress={() => setOnClicked(true)}>
                        <View style={styles.bucketItemNameContainer}>
                            <Text style={styles.bucketItemNameText}>{mealName}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.plusButtonTextContainer}
                            onPress={handleMinusPress}
                        >
                            <Fontisto name="minus-a" size={14} color="black"/>
                        </TouchableOpacity>
                        <View style={styles.countTextContainer}>
                            <Text style={styles.countText}>{count}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.minusButtonTextContainer}
                            onPress={handlePlusPress}
                        >
                            <Fontisto name="plus-a" size={14} color="black"/>
                        </TouchableOpacity>
                        {
                            !isSpecial && (
                                <View style={styles.editButtonContainer}>
                                    <TouchableOpacity
                                        onPress={handleEditMealPress}
                                        style={styles.editButtonTextContainer}
                                    >
                                        <AntDesign name="edit" size={14} color="black"/>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                    </TouchableOpacity>
                    <View style={[styles.itemListContainer, styles.elevation, styles.shadowProp]}>
                        {items && items.length > 0 && items.map((item) => (
                            <View key={item.id} style={styles.listItemContainer}>
                                <Text style={styles.listItemContainerText}>{item.type}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    elevation: {
        elevation: 10,
        shadowColor: '#5b595b',
    },
    bucketItemContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(252, 240, 200, 1)',
        paddingVertical: 20,
        paddingHorizontal: 40,
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 30,
        alignItems: 'center',
    },
    bucketItemNameContainer: {
        flex: 5,
    },
    bucketItemNameText: {
        fontSize: 18,
    },
    plusButtonTextContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        flex: 1,
        borderWidth: 2,
        borderColor: '#fff',
    },
    countTextContainer: {
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        flex: 1,
        marginHorizontal: 10,
    },
    countText: {
        fontSize: 18,
    },
    minusButtonTextContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        flex: 1,
        borderWidth: 2,
        borderColor: '#fff',
    },
    editButtonContainer: {
        marginLeft: 20,
    },
    editButtonTextContainer: {
        backgroundColor: 'rgba(99, 10, 16, 0.12)',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        flex: 1,
        borderWidth: 2,
        borderColor: '#fff',
    },
    bucketItemExpandContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(252, 240, 200, 0.3)',
        paddingVertical: 20,
        paddingHorizontal: 40,
        marginVertical: 10,
        alignItems: 'center',
    },
    listItemContainer: {
        marginHorizontal: 40,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderColor: '#fff',
        borderBottomColor: 'rgba(197,194,194,0.5)',
        borderWidth: 2,
    },
    listItemContainerText: {
        fontSize: 18,
    },
    itemListContainer: {
        marginBottom: 20,
    }
});