import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

const ListItem = ({ itemName, checked, handleItemPress }) => {
    return (
        <TouchableOpacity
            style={styles.listItemContainer}
            onPress={handleItemPress}
        >
            <View style={styles.listItemLeftContainer}>
                <Text style={styles.listItemText}>{itemName}</Text>
            </View>
            {!checked && (
                <View style={styles.listItemRightContainer}>
                    <MaterialIcons name="radio-button-unchecked" size={30}
                                   color="rgba(57, 57, 57, 0.5)" />
                </View>
            )}
            {checked && (
                <View style={styles.listItemRightContainer}>
                    <AntDesign name="checkcircle" size={24}
                               color="rgba(44, 152, 74, 1)" />
                </View>
            )}
        </TouchableOpacity>
    );
};

const ItemList = ({ title, items, handleItemPress }) => {
    return (
        <View>
            <View style={styles.itemTextContainer}>
                <Text style={styles.itemText}>{title}</Text>
            </View>
            <View>
                {items.map((item, index) => (
                    <View key={item.id}>
                        <ListItem
                            itemName={item.itemName}
                            checked={item.checked}
                            handleItemPress={() => handleItemPress(index)}
                        />
                    </View>
                ))}
            </View>
        </View>
    );
};

export default ItemList;

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
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(197,194,194,0.5)',
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
    }
});