import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';

export default function OrderItem({mealName, count, orderType, items, category, type, price, meal, onDeleteOrder, orderCode}) {
    const [onClicked, setOnClicked] = useState(true);

    return (
        <View>
            {onClicked && (
                <TouchableOpacity
                    style={[styles.bucketItemContainer, styles.elevation, styles.shadowProp]}
                    onPress={() => setOnClicked(false)}
                >
                    <View style={styles.itemTopContainer}>
                        <View style={styles.typeContainer}>
                            <View>
                                {
                                    orderType === 'special' && (
                                        <Text style={styles.orderTypeText}>Special</Text>)
                                }
                                {
                                    orderType === 'non_vegi' && (
                                        <Text style={styles.orderTypeText}>Non-Veg</Text>)
                                }
                                {
                                    orderType === 'vegi' && (
                                        <Text style={styles.orderTypeText}>Veg</Text>)
                                }
                            </View>
                            <View>
                                {
                                    meal === 'Lunch' && (
                                        <Text style={styles.mealText}>Lunch</Text>)
                                }
                                {
                                    meal === 'Dinner' && (
                                        <Text style={styles.mealText}>Dinner</Text>)
                                }
                            </View>
                        </View>
                        <Text style={styles.itemTopPriceText}>Rs. {price}</Text>
                    </View>
                    <View style={styles.listItemMainContainer}>
                        <View style={styles.bucketItemNameContainer}>
                            <Text style={styles.bucketItemNameText}>{mealName}</Text>
                            {orderType === 'special' ? (
                                <Text style={styles.bucketItemNameSubText}>{type}</Text>
                            ) : (
                                <Text style={styles.bucketItemNameSubText}>{items && items.rice}</Text>
                            )}
                        </View>
                        <View style={styles.countTextContainer}>
                            <Text style={styles.countText}>{count} {count === 1 ? "Pack" : "Packs"}</Text>
                        </View>
                    </View>
                    <View style={styles.orderCodeContainer}>
                        <Text style={styles.orderCodeText}>Order Code: {orderCode} </Text>
                    </View>
                </TouchableOpacity>
            )}
            {!onClicked && (
                <View>
                    <TouchableOpacity style={styles.bucketItemExpandContainer} onPress={() => setOnClicked(true)}>
                        <View style={styles.bucketItemNameContainer}>
                            <Text style={styles.bucketItemNameText}>{mealName}</Text>
                        </View>
                        <View style={styles.countTextContainer}>
                            <Text style={styles.countText}>{count} {count === 1 ? "Pack" : "Packs"}</Text>
                        </View>
                        <View style={styles.editButtonContainer}>
                            <TouchableOpacity onPress={onDeleteOrder} style={styles.deleteButtonTextContainer}>
                                <MaterialIcons name="delete-forever" size={24} color="black"/>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                    <View style={[styles.itemListContainer, styles.elevation, styles.shadowProp]}>
                        {orderType === 'special' && (
                            <View>
                                <View style={styles.listItemContainer}>
                                    <Text style={styles.listItemContainerText}>{category} | {type}</Text>
                                </View>
                            </View>
                        )}
                        {items && items.map((item, index) => (
                            <View style={styles.listItemContainer} key={index}>
                                <Text style={styles.listItemContainerText}>{item}</Text>
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
        backgroundColor: 'rgba(252, 240, 200, 1)',
        marginHorizontal: "5%",
        marginVertical: "2%",
        paddingVertical: "2%",
        paddingHorizontal: "5%",
        borderRadius: 10,
    },
    bucketItemNameContainer: {
        flex: 1,
        justifyContent: "center",
        marginTop: 10,
    },
    bucketItemNameText: {
        fontSize: 16,
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
    },
    countText: {
        fontSize: 16,
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
        flexDirection: 'row',
        marginLeft: 20,
    },
    editButtonTextContainer: {
        backgroundColor: 'rgba(99, 10, 16, 0.12)',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderWidth: 2,
        borderColor: '#fff',
    },
    deleteButtonTextContainer: {
        backgroundColor: 'rgba(99, 10, 16, 0.12)',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
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
        borderBottomColor: 'rgba(197, 194, 194, 0.5)',
        borderWidth: 2,
    },
    listItemContainerText: {
        fontSize: 18,
    },
    itemListContainer: {
        marginBottom: 20,
    },
    bucketItemNameSubText: {
        fontSize: 12,
    },
    listItemMainContainer: {
        flexDirection: 'row',
    },
    itemTopContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemTopPriceText: {
        fontSize: 12,
    },
    orderTypeText: {
        backgroundColor: 'rgb(250,229,121)',
        paddingHorizontal: "2%",
        paddingVertical: "1%",
        borderRadius: 10,
        fontSize: 10,
    },
    typeContainer: {
        flexDirection: 'row',
    },
    mealText: {
        marginHorizontal: 5,
        backgroundColor: 'rgba(169,220,57,0.63)',
        paddingHorizontal: "2%",
        paddingVertical: "1%",
        borderRadius: 10,
        fontSize: 10,
    },
    orderCodeContainer:{

    },
    orderCodeText: {
        fontSize: 12,
    }
});
