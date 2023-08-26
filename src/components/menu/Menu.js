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
import PATHS from "../../helpers/paths/paths";
import {log} from "../../helpers/logs/log";

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
                  loading,
                  clearAndFetchData
              }) => {
    const [totalSpecialPrice, setTotalSpecialPrice] = useState(0);
    const [showSpecialMenu, setShowSpecialMenu] = useState(false);

    const toggleSwitch = () => {
        clearAndFetchData().catch(
            (error) => {
                log('error', 'MenuScreen', 'useEffect 2', error.message, 'MenuScreen.js');
            }
        );
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
            {
                !editMenu && (
                    <View style={styles.chooseTypeContainer}>
                        {
                            totalCheckedSpecialItemsCount <= 0 && (
                                <TouchableOpacity
                                    style={[styles.chooseTypeItemLeft, !showSpecialMenu && styles.selectedMenu]}
                                    onPress={() => setShowSpecialMenu(false)}
                                >
                                    <Image source={PATHS.foodcup} style={styles.chooseTypeIcon}/>
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
                                    <Image source={PATHS.food} style={styles.chooseTypeIcon}/>
                                    <Text style={[styles.chooseTypeText, showSpecialMenu && styles.selectedMenuText]}>Today's
                                        Special</Text>
                                </TouchableOpacity>
                            )
                        }
                    </View>
                )
            }
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
            <ScrollView style={styles.scrollViewContainer} showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                        }
            >
                {
                    !editMenu && (
                        <View style={styles.chooseTypeContainer}>
                            {
                                totalCheckedSpecialItemsCount <= 0 && (
                                    <TouchableOpacity
                                        style={[styles.chooseTypeItemLeft, !showSpecialMenu && styles.selectedMenu]}
                                        onPress={() => setShowSpecialMenu(false)}
                                    >
                                        <Image source={PATHS.foodcup} style={styles.chooseTypeIcon}/>
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
                                        <Image source={PATHS.food} style={styles.chooseTypeIcon}/>
                                        <Text style={[styles.chooseTypeText, showSpecialMenu && styles.selectedMenuText]}>Today's
                                            Special</Text>
                                    </TouchableOpacity>
                                )
                            }
                        </View>
                    )
                }
                <View style={styles.itemContainer}>
                    {!editMenu && showSpecialMenu && (
                        <View>
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
                    {(!showSpecialMenu || editMenu) && (
                        <View>
                            <View style={styles.normalMealContainer}>
                                <Text style={styles.pickUpDishesText}>You can pick up to 1 rice and 4 dishes.</Text>
                                {
                                    !editMenu && (
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
                                    )
                                }
                                {(totalCheckedSpecialItemsCount <= 0 || editMenu) &&
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
    specialMenuItemTitle: {
        backgroundColor: 'rgba(255, 209, 90, 0.3)',
        paddingVertical: "3%",
    },
    specialMenuSubItemTextContainer: {
        flex: 1,
    },
    subItemPriceText: {
        fontSize: 14,
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
        fontSize: 14,
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
    },
    noDataTextContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }

});
