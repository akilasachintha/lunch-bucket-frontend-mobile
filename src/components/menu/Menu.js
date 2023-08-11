import React, {useState} from 'react';
import {
    ActivityIndicator,
    Image,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import ItemList from '../list/ItemList';
import BasketButton from './BasketButton';
import Timer from '../timer/Timer';
import {AntDesign, MaterialIcons} from '@expo/vector-icons';
import {dynamicFont} from "../../helpers/responsive/fontScale";

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
                  refreshing,
                  onRefresh,
                  loading
              }) => {
    const [totalSpecialPrice, setTotalSpecialPrice] = useState(0);
    const [showSpecialMenu, setShowSpecialMenu] = useState(false);

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

    if (loading) return (
        <View style={styles.bodyContentContainer}>
            <Timer remainingTime={remainingTime} remainingTimeColor={remainingTimeColor} title={title}
                   disableTime={disableTime}/>
            <View style={styles.chooseTypeContainer}>
                {
                    totalCheckedSpecialItemsCount <= 0 && (
                        <TouchableOpacity
                            style={[styles.chooseTypeItemLeft, !showSpecialMenu && styles.selectedMenu]}
                            onPress={() => setShowSpecialMenu(false)}
                        >
                            <Text style={[styles.chooseTypeText, !showSpecialMenu && styles.selectedMenuText]}>Today's
                                Menu</Text>
                        </TouchableOpacity>
                    )
                }
                {
                    totalCheckedItemsCount <= 0 && (
                        <TouchableOpacity
                            style={[styles.chooseTypeItemRight, showSpecialMenu && styles.selectedMenu]}
                            onPress={() => setShowSpecialMenu(true)}
                        >
                            <Text style={[styles.chooseTypeText, showSpecialMenu && styles.selectedMenuText]}>Today's
                                Special</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
            <ActivityIndicator size="large" color="#630A10" style={styles.activityIndicator}/>
            <BasketButton
                totalCheckedSpecialItems={totalCheckedSpecialItems}
                totalCheckedSpecialItemsCount={totalCheckedSpecialItemsCount}
                totalCheckedItemsCount={totalCheckedItemsCount}
                totalCheckedItems={totalCheckedItems}
                totalSpecialPrice={totalSpecialPrice}
                totalAmount={totalAmount}
                venue={title}
                editMenu={editMenu}
                mealId={mealId}
                isVegi={isVegi}
            />
        </View>
    );


    return (
        <View style={styles.bodyContentContainer}>
            <Timer remainingTime={remainingTime} remainingTimeColor={remainingTimeColor} title={title}
                   disableTime={disableTime}/>
            <View style={styles.chooseTypeContainer}>
                {
                    totalCheckedSpecialItemsCount <= 0 && (
                        <TouchableOpacity
                            style={[styles.chooseTypeItemLeft, !showSpecialMenu && styles.selectedMenu]}
                            onPress={() => setShowSpecialMenu(false)}
                        >
                            <Text style={[styles.chooseTypeText, !showSpecialMenu && styles.selectedMenuText]}>Today's
                                Menu</Text>
                        </TouchableOpacity>
                    )
                }
                {
                    totalCheckedItemsCount <= 0 && (
                        <TouchableOpacity
                            style={[styles.chooseTypeItemRight, showSpecialMenu && styles.selectedMenu]}
                            onPress={() => setShowSpecialMenu(true)}
                        >
                            <Text style={[styles.chooseTypeText, showSpecialMenu && styles.selectedMenuText]}>Today's
                                Special</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
            <ScrollView style={styles.scrollViewContainer} showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                        }
            >
                <View style={styles.itemContainer}>
                    {showSpecialMenu && (
                        <View>
                            {/*{totalCheckedItemsCount <= 0 && (*/}
                            {/*    <View style={styles.specialMenuMainTextContainer}>*/}
                            {/*        <Text style={styles.specialMenuMainText}>Today's Special Menu</Text>*/}
                            {/*        <Ionicons name="md-fast-food-outline" size={24} color="black"/>*/}
                            {/*    </View>*/}
                            {/*)}*/}
                            <View style={styles.specialMenu}>
                                {totalCheckedItemsCount <= 0 &&
                                    specialMenu &&
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
                                                            <View key={subIndex}
                                                                  style={styles.specialMenuCategoryContainer}>
                                                                <View style={styles.specialMenuSubItemLeftContainer}>
                                                                    <View style={styles.specialMenuItemTitle}>
                                                                        <View style={styles.subItemMainText}>
                                                                            <View
                                                                                style={styles.specialMenuSubItemTextContainer}>
                                                                                <Text
                                                                                    style={styles.subItemText}>{subItem.type}</Text>
                                                                                <Text
                                                                                    style={styles.subItemPriceText}>Rs. {subItem.price}.00</Text>
                                                                            </View>
                                                                            {!subItem.checked && !disableTime && (
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
                                                                            {subItem.checked && !disableTime && (
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
                                                                        <View
                                                                            style={styles.specialSubMenuLeftContainer}>
                                                                            {subItem &&
                                                                                subItem.items.length > 0 &&
                                                                                subItem.items.map((subSubItem, subSubIndex) => (
                                                                                    <View key={subSubIndex}
                                                                                          style={styles.subSubItemsContainer}>
                                                                                        <Text
                                                                                            style={styles.subSubItemsTextContainer}
                                                                                            key={subSubIndex}>
                                                                                            {subSubItem}
                                                                                        </Text>
                                                                                    </View>
                                                                                ))}
                                                                        </View>
                                                                        <View
                                                                            style={styles.specialSubMenuRightContainer}>
                                                                            {subItem && subItem.url && (
                                                                                <Image
                                                                                    source={{uri: subItem && subItem.url}}
                                                                                    style={styles.specialSubMenuImage}
                                                                                />
                                                                            )}
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
                    )}
                    {!showSpecialMenu && (
                        <View>
                            {/*{totalCheckedSpecialItemsCount <= 0 && (*/}
                            {/*    <View style={styles.specialMenuMainTextContainer}>*/}
                            {/*        <Text style={styles.specialMenuMainText}>Today's Rice & Curry Menu</Text>*/}
                            {/*        <Ionicons name="md-fast-food-outline" size={24} color="black"/>*/}
                            {/*    </View>*/}
                            {/*)}*/}
                            <View style={styles.normalMealContainer}>
                                <Text style={styles.pickUpDishesText}>You can pick up to 1 rice and 4 dishes.</Text>
                                <View style={styles.descriptionContainer}>
                                    <View style={styles.vegiSwitchContainer}>
                                        <Switch onValueChange={toggleSwitch} value={isVegi}
                                                style={styles.vegiTextSwitch}
                                                trackColor={{false: '#767577', true: '#2C984A'}}
                                                thumbColor={isVegi ? '#f4f3f4' : '#f4f3f4'}
                                        />
                                        <Text style={styles.vegiText}>I am {!isVegi && "not "}a Vegetarian</Text>
                                    </View>
                                </View>
                                {totalCheckedSpecialItemsCount <= 0 &&
                                    itemList &&
                                    itemList?.length > 0 &&
                                    itemList.map((list, index) => (
                                        <ItemList key={index} title={list.type} items={list.items}
                                                  disableCheckbox={disableTime} handleItemPress={list.handleItemPress}
                                                  isVegi={isVegi}/>
                                    ))}
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>
            <BasketButton
                totalCheckedSpecialItems={totalCheckedSpecialItems}
                totalCheckedSpecialItemsCount={totalCheckedSpecialItemsCount}
                totalCheckedItemsCount={totalCheckedItemsCount}
                totalCheckedItems={totalCheckedItems}
                totalSpecialPrice={totalSpecialPrice}
                totalAmount={totalAmount}
                venue={title}
                editMenu={editMenu}
                mealId={mealId}
                isVegi={isVegi}
            />
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
        fontSize: dynamicFont(10),
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
        fontSize: dynamicFont(12),
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
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: "4%",
    },
    specialMenu: {},
    subMenuText: {
        fontSize: 12,
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
    subItemIcon: {
        marginRight: 10,
    },
    specialMenuText: {
        fontSize: dynamicFont(12),
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
        justifyContent: 'space-between',
    },
    specialMenuSubItemLeftContainer: {
        flex: 8,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    listItemRightContainer: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
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
    },
    chooseTypeItemLeft: {
        flex: 1,
        backgroundColor: 'rgb(250,229,121)',
        paddingVertical: 10,
    },
    chooseTypeItemRight: {
        flex: 1,
        backgroundColor: 'rgb(250,229,121)',
        paddingVertical: 10,
    },
    chooseTypeText: {
        fontSize: dynamicFont(12),
        textAlign: 'center',
    },
    selectedMenu: {
        borderBottomWidth: 2,
        borderBottomColor: 'rgb(134,36,43)',
    },
    selectedMenuText: {
        color: 'black',
    },
    specialMenuItemTitle: {
        backgroundColor: 'rgba(255, 209, 90, 0.3)',
        paddingVertical: "3%",
    },
    specialMenuSubItemTextContainer: {
        flex: 1,
    },
    subItemPriceText: {
        fontSize: dynamicFont(9),
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
    vegiSwitchContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    vegiText: {
        fontSize: dynamicFont(9),
        paddingRight: 10,
        fontStyle: 'italic',
    },
    vegiTextSwitch: {
        color: "#2C984A",
    },
    noItemsContainer: {
        flex: 1,
        alignItems: 'center',
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }

});
