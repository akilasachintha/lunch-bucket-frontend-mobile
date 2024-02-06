import React from 'react';
import {Image, StyleSheet, Switch, Text, View} from 'react-native';
import {AntDesign, MaterialIcons} from "@expo/vector-icons";
import toTitleCase from "../../helpers/strings/stringFormatter";
import {log} from "../../helpers/logs/log";

const SpecialMenu = ({
                         specialMenu,
                         setSpecialMenu,
                         totalCheckedItemsCount,
                         disableTime,
                         setTotalSpecialPrice,
                         isVeg,
                         setIsVeg,
                         clearAndFetchData
                     }) => {

    const handleItemPress = (mainIndex, subIndex) => {
        setSpecialMenu((prevMenuItems) => {
            const updatedMenuItems = [...prevMenuItems];
            updatedMenuItems[mainIndex].category[subIndex].checked = !updatedMenuItems[mainIndex].category[subIndex].checked;
            return updatedMenuItems;
        });

        const totalSpecialItems = calculateSpecialMenuPrice();
        setTotalSpecialPrice(totalSpecialItems);
    };

    const calculateSpecialMenuPrice = () => {
        let totalPrice = 0;

        specialMenu.forEach((menuCategory) => {
            menuCategory.category.forEach((menuItem) => {
                if (menuItem.checked) {
                    totalPrice += menuItem.price;
                }
            });
        });

        return totalPrice;
    };

    const toggleSwitch = () => {
        clearAndFetchData().catch(
            (error) => {
                log('error', 'Menu', 'toggleSwitch', error.message, 'Menu.js');
            }
        );

        setIsVeg((previousState) => !previousState);
    };

    return (
        <View>
            <View style={styles.specialMenu}>
                {
                    <View style={styles.descriptionContainer}>
                        <View style={styles.vegSwitchContainer}>
                            <Switch onValueChange={toggleSwitch} value={isVeg}
                                    style={styles.vegTextSwitch}
                                    trackColor={{false: '#767577', true: '#2C984A'}}
                                    thumbColor={isVeg ? '#f4f3f4' : '#f4f3f4'}
                            />
                            <Text style={styles.vegText}>I am {!isVeg && "not "}a Vegetarian</Text>
                        </View>
                    </View>
                }
                {totalCheckedItemsCount <= 0 && specialMenu && specialMenu.length > 0 && specialMenu.map((item, index) => (
                    <View key={index} style={styles.specialMenuItemContainer}>
                        <View style={styles.specialItemLeftContainer}>
                            <View style={styles.specialMenuItem}>
                                <View style={styles.mainSpecialItemTextContainer}>
                                    <Text style={styles.specialMenuText}>{toTitleCase(item.category_name)}</Text>
                                </View>
                                {item && item.category && item.category.length > 0 && item.category.map((subItem, subIndex) => (
                                    <View key={subIndex} style={styles.specialMenuCategoryContainer}>
                                        <View style={styles.specialMenuSubItemLeftContainer}>
                                            <View style={styles.specialMenuItemTitle}>
                                                <View style={styles.subItemMainText}>
                                                    <View
                                                        style={styles.specialMenuSubItemTextContainer}>
                                                        <Text
                                                            style={styles.subItemText}>{subItem ? toTitleCase(subItem.type) : ''}</Text>
                                                        <Text
                                                            style={styles.subItemPriceText}>Rs. {subItem ? subItem.price : ''}.00</Text>
                                                    </View>
                                                    {subItem && !subItem.checked && !disableTime && (
                                                        <View
                                                            style={styles.listItemRightContainer}>
                                                            <MaterialIcons
                                                                name="radio-button-unchecked"
                                                                size={30}
                                                                color="rgba(57, 57, 57, 0.5)"
                                                                onPress={() => handleItemPress(index, subIndex)}
                                                            />
                                                        </View>
                                                    )}
                                                    {subItem && subItem.checked && !disableTime && (
                                                        <View
                                                            style={styles.listItemRightContainer}>
                                                            <AntDesign
                                                                name="checkcircle"
                                                                size={24}
                                                                color="rgba(44, 152, 74, 1)"
                                                                onPress={() => handleItemPress(index, subIndex)}
                                                            />
                                                        </View>
                                                    )}
                                                </View>
                                            </View>
                                            <View style={styles.specialSubMenuContainer}>
                                                <View style={styles.specialSubMenuLeftContainer}>
                                                    {subItem && Array.isArray(subItem.items) && subItem.items && subItem.items.length && subItem.items.length > 0 ? subItem.items.map((subSubItem, subSubIndex) => (
                                                        <View key={subSubIndex}
                                                              style={styles.subSubItemsContainer}>
                                                            <Text
                                                                style={styles.subSubItemsTextContainer}
                                                                key={subSubIndex}>
                                                                {toTitleCase(subSubItem)}
                                                            </Text>
                                                        </View>
                                                    )) : null}
                                                </View>
                                                <View
                                                    style={styles.specialSubMenuRightContainer}>
                                                    {subItem && subItem.url ? (
                                                        <Image
                                                            source={{uri: subItem && subItem.url.toString() ? subItem.url.toString() : ''}}
                                                               style={styles.specialSubMenuImage}
                                                        />
                                                    ) : null}
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

export default SpecialMenu;

const styles = StyleSheet.create({
    specialMenu: {},
    specialMenuItemContainer: {},
    specialItemLeftContainer: {},
    specialMenuItem: {
        paddingVertical: 10,
    }, mainSpecialItemTextContainer: {
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: "4%",
    },
    specialMenuCategoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    specialMenuSubItemLeftContainer: {
        flex: 8,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    specialMenuItemTitle: {
        backgroundColor: 'rgba(255, 209, 90, 0.3)',
        paddingVertical: "3%",
    },
    subItemMainText: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: "10%",
        width: '100%',
    },
    subItemText: {
        fontSize: 18,
        flex: 5,
    },


    bodyContentContainer: {
        flex: 6,
    },
    itemContainer: {},
    scrollViewContainer: {},
    pickUpDishesText: {
        textAlign: 'center',
        fontSize: 14,
        marginTop: 10,
        color: '#4D4D4D',
    },
    descriptionContainer: {
        paddingHorizontal: '10%',
        paddingVertical: '1%',
        flexDirection: 'row',
    },
    subSubItemsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: "2%",
    },
    specialMenuMainTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: "2%",
        paddingHorizontal: '10%',
    },
    specialMenuMainText: {
        fontSize: 18,
        marginRight: 10,
        textAlign: 'center',
    },
    specialMenuContainer: {},
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
        marginHorizontal: 40,
    },
    listItemText: {
        paddingTop: 18,
        fontSize: 18,
    },
    listItemLeftContainer: {
        flex: 8,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    subMenuText: {
        fontSize: 12,
    },
    subItemIcon: {
        marginRight: 10,
    },
    specialMenuText: {
        fontSize: 18,
        paddingHorizontal: 40,
        textAlign: 'left',
    },
    specialMenuSubItemTextContainer: {
        flex: 1,
    },
    subItemPriceText: {
        fontSize: 14,
    },
    listItemRightContainer: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },


    specialMenuRightContainer: {},

    subSubItemsTextContainer: {
        fontSize: 12,
        color: 'rgba(14,12,12,0.95)',
    },
    normalMealContainer: {},
    specialMenuSubItemContainer: {},
    specialMenuSubItem: {},
    specialMenuSubItemText: {},
    chooseTypeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 10,
        paddingHorizontal: 40,
        marginTop: 10,
    },
    chooseTypeIcon: {
        width: 40,
        height: 30,
        marginBottom: 10,
    },
    chooseTypeItemLeft: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 10,
        borderColor: '#FFF1F1',
        borderWidth: 2,
        marginRight: 10,
        alignItems: 'center',
    },
    chooseTypeItemRight: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderColor: '#FFF1F1',
        borderWidth: 2,
        borderRadius: 10,
    },
    chooseTypeText: {
        fontSize: 14,
        textAlign: 'center',
    },
    selectedMenu: {
        borderWidth: 2,
        borderColor: 'rgb(134,36,43)',
    },
    selectedMenuText: {
        color: 'black',
    },
    specialSubMenuContainer: {
        flexDirection: 'row',
        paddingVertical: "4%",
        paddingHorizontal: "10%",
        alignItems: 'center',
    },
    specialSubMenuLeftContainer: {
        flex: 4,
    },
    specialSubMenuRightContainer: {
        flex: 1,
        paddingRight: "10%",
    },
    specialSubMenuImage: {
        width: 100,
        height: 80,
        borderRadius: 10,
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    vegSwitchContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    vegText: {
        fontSize: 14,
        paddingRight: 10,
        fontStyle: 'italic',
    },
    vegTextSwitch: {}
});
