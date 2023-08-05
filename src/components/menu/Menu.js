import React, {useState} from 'react';
import {ScrollView, StyleSheet, Switch, Text, View} from 'react-native';
import ItemList from '../list/ItemList';
import BasketButton from './BasketButton';
import Timer from '../timer/Timer';
import {AntDesign, FontAwesome, FontAwesome5, Ionicons, MaterialIcons} from '@expo/vector-icons';

const Menu = ({
                  specialMenu,
                  setSpecialMenu,
                  itemList,
                  title,
                  totalCheckedItemsCount = 0,
                  totalAmount,
                  totalCheckedItems,
                  remainingTime,
                  remainingTimeColor,
                  disableTime,
                  editMenu = false,
                  mealId = 0,
                  isVegi,
                  setIsVegi,
                  totalCheckedSpecialItemsCount = 0,
                  totalCheckedSpecialItems,
              }) => {
    const [totalSpecialPrice, setTotalSpecialPrice] = useState(0);

    const toggleSwitch = () => {
        setIsVegi((previousState) => !previousState);
    };

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

    return (
        <View style={styles.bodyContentContainer}>
            <Timer remainingTime={remainingTime} remainingTimeColor={remainingTimeColor} title={title}
                   disableTime={disableTime}/>
            <ScrollView style={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.pickUpDishesText}>You can pick up to 5 dishes.</Text>
                    <Switch onValueChange={toggleSwitch} value={isVegi}/>
                </View>
                <View style={styles.itemContainer}>
                    {totalCheckedItemsCount <= 0 && (
                        <View style={styles.specialMenuMainTextContainer}>
                            <Text style={styles.specialMenuMainText}>Today's Special Menu</Text>
                            <Ionicons name="md-fast-food-outline" size={24} color="black"/>
                        </View>
                    )}
                    <View style={styles.specialMenu}>
                        {totalCheckedItemsCount <= 0 && specialMenu &&
                            specialMenu.length > 0 &&
                            specialMenu.map((item, index) => (
                                <View key={index} style={styles.specialMenuItemContainer}>
                                    <View style={styles.specialItemLeftContainer}>
                                        <View style={styles.specialMenuItem}>
                                            <View style={styles.mainSpecialItemTextContainer}>
                                                <Text style={styles.specialMenuText}>{item.category_name}</Text>
                                            </View>
                                            {item &&
                                                item.category.length > 0 &&
                                                item.category.map((subItem, subIndex) => (
                                                    <View key={subIndex} style={styles.specialMenuCategoryContainer}>
                                                        <View style={styles.specialMenuSubItemLeftContainer}>
                                                            <View style={styles.subItemMainText}>
                                                                <FontAwesome
                                                                    style={styles.subItemIcon}
                                                                    name="circle-o-notch" size={15}
                                                                    color="black"/>
                                                                <Text style={styles.subItemText}>{subItem.type}</Text>
                                                            </View>
                                                            <View style={styles.specialSubMenuContainer}>
                                                                {subItem &&
                                                                    subItem.items.length > 0 &&
                                                                    subItem.items.map((subSubItem, subSubIndex) => (
                                                                        <View key={subSubIndex}
                                                                              style={styles.subSubItemsContainer}>
                                                                            <FontAwesome5 name="dot-circle" size={10}
                                                                                          color="black"/>
                                                                            <Text
                                                                                style={styles.subSubItemsTextContainer}
                                                                                key={subSubIndex}>{subSubItem}</Text>
                                                                        </View>
                                                                    ))}
                                                            </View>
                                                        </View>

                                                        {!subItem.checked && !disableTime && (
                                                            <View style={styles.listItemRightContainer}>
                                                                <MaterialIcons
                                                                    name="radio-button-unchecked"
                                                                    size={30}
                                                                    color="rgba(57, 57, 57, 0.5)"
                                                                    onPress={() => handleItemPress(index, subIndex)}
                                                                />
                                                            </View>
                                                        )}
                                                        {subItem.checked && !disableTime && (
                                                            <View style={styles.listItemRightContainer}>
                                                                <AntDesign
                                                                    name="checkcircle"
                                                                    size={24}
                                                                    color="rgba(44, 152, 74, 1)"
                                                                    onPress={() => handleItemPress(index, subIndex)}
                                                                />
                                                            </View>
                                                        )}
                                                    </View>
                                                ))}
                                        </View>
                                    </View>
                                </View>
                            ))}
                    </View>
                    <View style={styles.specialMenuMainTextContainer}>
                        {
                            totalCheckedSpecialItemsCount <= 0 && (
                                <View style={styles.specialMenuMainTextContainer}>
                                    <Text style={styles.specialMenuMainText}>Today's Rice & Curry Menu</Text>
                                    <Ionicons name="md-fast-food-outline" size={24} color="black"/>
                                </View>
                            )
                        }
                    </View>
                    <View style={styles.normalMealContainer}>
                        {totalCheckedSpecialItemsCount <= 0 && itemList && itemList?.length > 0 &&
                            itemList.map((list, index) => (
                                <ItemList key={index} title={list.type} items={list.items} disableCheckbox={disableTime}
                                          handleItemPress={list.handleItemPress}/>
                            ))}
                    </View>
                </View>
            </ScrollView>
            <BasketButton
                totalCheckedSpecialItems={totalCheckedSpecialItems}
                totalCheckedSpecialItemsCount={totalCheckedSpecialItemsCount}
                totalCheckedItemsCount={totalCheckedItemsCount} totalCheckedItems={totalCheckedItems}
                totalSpecialPrice={totalSpecialPrice}
                totalAmount={totalAmount} venue={title} editMenu={editMenu} mealId={mealId} isVegi={isVegi}/>
        </View>
    );
};

export default Menu;

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
    },
    subSubItemsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    specialMenuMainTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: '10%',
    },
    specialMenuMainText: {
        fontSize: 20,
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
    mainSpecialItemTextContainer: {
        backgroundColor: 'rgba(252, 240, 200, 0.3)',
        borderRadius: 10,
        paddingVertical: "4%",
    },
    specialMenu: {},
    subMenuText: {
        fontSize: 12,
    },
    subItemMainText: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    subItemText: {
        fontSize: 18,
        marginVertical: "4%",
    },
    subItemIcon: {
        marginRight: 10,
    },
    specialMenuText: {
        fontSize: 18,
        paddingHorizontal: 40,
        textAlign: 'left',
    },
    specialMenuItemContainer: {},
    specialMenuItem: {
        paddingVertical: 10,
    },
    specialItemLeftContainer: {},
    specialMenuRightContainer: {},
    specialMenuCategoryContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        paddingHorizontal: 40,
        justifyContent: 'space-between',
    },
    specialMenuSubItemLeftContainer: {
        flex: 8,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    listItemRightContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    subSubItemsTextContainer: {
        marginLeft: 10,
        fontSize: 12,
        color: 'rgba(14,12,12,0.95)',
    },
    specialSubMenuContainer: {
        marginRight: 20,
    },
    normalMealContainer: {
        marginBottom: "4%",
    }
});
