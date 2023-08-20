import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {deleteOrderService} from '../../services/ordersService';
import {log} from '../../helpers/logs/log';

export default function OrderItem({id, mealName, count, orderType, items, category, type, onDeleteOrder}) {
    const [onClicked, setOnClicked] = useState(true);

    const handleDeleteOrder = async () => {
        try {
            await deleteOrderService(id);
            onDeleteOrder();
        } catch (error) {
            log('error', 'OrderItem', 'handleDeleteOrder', error.message, 'OrderItem.jsx');
        }
    };

    return (
        <View>
            {onClicked && (
                <TouchableOpacity
                    style={[styles.bucketItemContainer, styles.elevation, styles.shadowProp]}
                    onPress={() => setOnClicked(false)}
                >
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
                            <TouchableOpacity onPress={handleDeleteOrder} style={styles.deleteButtonTextContainer}>
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
                        {items && (
                            <View>
                                <View style={styles.listItemContainer}>
                                    <Text style={styles.listItemContainerText}>{items.rice}</Text>
                                </View>
                                <View style={styles.listItemContainer}>
                                    <Text style={styles.listItemContainerText}>{items.vege1}</Text>
                                </View>
                                <View style={styles.listItemContainer}>
                                    <Text style={styles.listItemContainerText}>{items.vege2}</Text>
                                </View>
                                {items.vege3 && (
                                    <View style={styles.listItemContainer}>
                                        <Text style={styles.listItemContainerText}>{items.vege3}</Text>
                                    </View>
                                )}
                                {
                                    items.vege4 && (
                                        <View style={styles.listItemContainer}>
                                            <Text style={styles.listItemContainerText}>{items.vege4}</Text>
                                        </View>
                                    )
                                }
                                {items.meat && (
                                    <View style={styles.listItemContainer}>
                                        <Text style={styles.listItemContainerText}>{items.meat}</Text>
                                    </View>
                                )}
                                {items.stew && (
                                    <View style={styles.listItemContainer}>
                                        <Text style={styles.listItemContainerText}>{items.stew}</Text>
                                    </View>
                                )}
                            </View>
                        )}
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
        marginHorizontal: "5%",
        paddingVertical: "4%",
        paddingHorizontal: "10%",
        marginVertical: 10,
        borderRadius: 30,
        alignItems: 'center',
    },
    bucketItemNameContainer: {
        flex: 2,
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
        fontSize: 14,
    }
});
