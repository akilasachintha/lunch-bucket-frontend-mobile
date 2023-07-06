import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AntDesign, MaterialIcons} from '@expo/vector-icons';
import PercentageBar from "../precentageBar/PrecentageBar";

const ListItem = ({itemName, checked, handleItemPress, percentage}) => {
    return (
        <View>
            <TouchableOpacity
                style={[styles.listItemContainer, (percentage == null) && {
                    borderBottomWidth: 2,
                    borderBottomColor: 'rgba(197,194,194,0.5)',
                }]}
                onPress={handleItemPress}
            >
                <View style={styles.listItemLeftContainer}>
                    <Text style={styles.listItemText}>{itemName}</Text>
                </View>
                {!checked && (
                    <View style={styles.listItemRightContainer}>
                        <MaterialIcons name="radio-button-unchecked" size={30}
                                       color="rgba(57, 57, 57, 0.5)"/>
                    </View>
                )}
                {checked && (
                    <View style={styles.listItemRightContainer}>
                        <AntDesign name="checkcircle" size={24}
                                   color="rgba(44, 152, 74, 1)"/>
                    </View>
                )}
            </TouchableOpacity>
            {(percentage != null) && (
                <View style={styles.percentageContainer}>
                    <PercentageBar percentage={percentage}/>
                </View>
            )}
        </View>
    );
};

export default function ItemList({title, items, handleItemPress}) {
    return (
        <View>
            <View style={styles.itemTextContainer}>
                <Text style={styles.itemText}>{title}</Text>
            </View>
            <View>
                {items.map((item, index) => (
                    <View key={item.id}>
                        <ListItem
                            itemName={item.type}
                            checked={item.checked}
                            handleItemPress={() => handleItemPress(index)}
                            percentage={item.percentage}
                        />
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    itemTextContainer: {
        marginTop: 20,
        paddingHorizontal: 40,
        backgroundColor: 'rgba(252, 240, 200, 0.3)',
        paddingVertical: 20,
    },
    itemText: {
        fontSize: 18,
    },
    listItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 40,
    },
    listItemText: {
        paddingVertical: 20,
        fontSize: 18,
    },
    listItemLeftContainer: {
        flex: 2,
    },
    listItemRightContainer: {
        flex: 1,
        alignItems: 'flex-end',
        marginRight: 10,
    },
    percentageContainer: {
        marginHorizontal: 20,
        marginRight: 100,
    },
});