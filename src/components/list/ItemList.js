import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AntDesign, MaterialIcons} from '@expo/vector-icons';
import PercentageBar from "../precentageBar/PrecentageBar";

const ListItem = ({itemName, url, checked, handleItemPress, percentage, disabled}) => {
    return (
        <View>
            <TouchableOpacity
                style={[
                    styles.listItemContainer,
                    percentage == null && {
                        borderBottomWidth: 2,
                        borderBottomColor: 'rgba(197,194,194,0.5)',
                    },
                ]}
                onPress={handleItemPress}
                disabled={disabled}
            >
                <View style={styles.listItemLeftContainer}>
                    <Image style={styles.listItemImage} source={{uri: url}}/>
                    <View style={styles.listItemTextContainer}>
                        <Text style={styles.listItemText}>{itemName}</Text>
                        {percentage != null && percentage > 0 && (
                            <PercentageBar percentage={percentage}/>
                        )}
                    </View>
                </View>
                {!checked && !disabled && (
                    <View style={styles.listItemRightContainer}>
                        <MaterialIcons
                            name="radio-button-unchecked"
                            size={30}
                            color="rgba(57, 57, 57, 0.5)"
                        />
                    </View>
                )}
                {checked && !disabled && (
                    <View style={styles.listItemRightContainer}>
                        <AntDesign name="checkcircle" size={24} color="rgba(44, 152, 74, 1)"/>
                    </View>
                )}
                {disabled && (
                    <View style={styles.listItemRightContainer}/>
                )}
            </TouchableOpacity>
        </View>
    );
};

export default function ItemList({title, items, handleItemPress, disableCheckbox, isVegi}) {
    const filteredItems = isVegi ? items.filter(item => item.vegetarian || item.foodType === "Rice") : items;

    return (
        <View>
            {filteredItems && filteredItems.length > 0 && (
                <View style={styles.itemTextContainer}>
                    <Text style={styles.itemText}>{title}</Text>
                </View>
            )}
            <View>
                {filteredItems && filteredItems.length > 0
                    && filteredItems.map((item, index) => (
                    <View key={index}>
                        <ListItem
                            itemName={item.type}
                            checked={item.checked}
                            url={item && item.url}
                            handleItemPress={() => handleItemPress(index)}
                            percentage={item.percentage}
                            disabled={disableCheckbox}
                        />
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    itemTextContainer: {
        paddingHorizontal: 40,
        backgroundColor: 'rgba(252, 240, 200, 0.3)',
        paddingVertical: 20,
    },
    itemText: {
        fontSize: 18,
    },
    listItemContainer: {
        flexDirection: 'row',
        marginHorizontal: 40,
    },
    listItemText: {
        paddingVertical: 18,
        fontSize: 18,
    },
    listItemLeftContainer: {
        flex: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: "3%",
    },
    listItemRightContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    listItemImage: {
        width: 90,
        height: 60,
        borderRadius: 10,
        marginRight: 20,
    },
    listItemTextContainer: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
    }
});
