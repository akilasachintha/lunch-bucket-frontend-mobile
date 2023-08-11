import {ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useMemo, useState} from "react";
import Menu from "../../components/menu/Menu";
import {useToast} from "../../helpers/toast/Toast";
import {getUTCDateTime} from "../../services/timeService";
import {
    fetchMenuData,
    getDinnerMeetPercentageService,
    getDinnerMenuService,
    getDinnerStewPercentageService,
    getLunchMeetPercentageService,
    getLunchMenuService,
    getLunchStewPercentageService,
    getLunchVegetablePercentageService
} from "../../services/menuService";
import {log} from "../../helpers/logs/log";
import DynamicTopBar from "../../components/topBar/DynamicTopBar";
import {SelectedTab} from "../../helpers/enums/enums";

export default function MenuScreen({navigation}) {
    const {showToast} = useToast();

    const [lunchMenu, setLunchMenu] = useState([]);
    const [dinnerMenu, setDinnerMenu] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    // Common
    const [isVisible, setIsVisible] = useState(true);
    const [loading, setLoading] = useState(true);

    const [isVegiLunch, setIsVegiLunch] = useState(false);
    const [isVegiDinner, setIsVegiDinner] = useState(false);

    // Lunch
    const [lunch, setLunch] = useState(true);
    const [disableLunchCheckbox, setDisableLunchCheckbox] = useState(false);
    const [lunchSpecialItems, setLunchSpecialItems] = useState([]);
    const [lunchRiceItems, setLunchRiceItems] = useState([]);
    const [lunchVegetableItems, setLunchVegetableItems] = useState([]);
    const [lunchStewItems, setLunchStewItems] = useState([]);
    const [lunchMeatItems, setLunchMeatItems] = useState([]);

    // Dinner
    const [dinnerSpecialItems, setDinnerSpecialItems] = useState([]);
    const [dinnerRiceItems, setDinnerRiceItems] = useState([]);
    const [disableDinnerCheckbox, setDisableDinnerCheckbox] = useState(false);
    const [dinnerVegetableItems, setDinnerVegetableItems] = useState([]);
    const [dinnerStewItems, setDinnerStewItems] = useState([]);
    const [dinnerMeatItems, setDinnerMeatItems] = useState([]);

    const clearValuesAndFetchData = async () => {
        setLoading(true);

        // Clear values
        setLunchSpecialItems([]);
        setLunchSpecialItems([]);
        setLunchRiceItems([]);
        setLunchVegetableItems([]);
        setLunchStewItems([]);
        setLunchMeatItems([]);

        setDinnerSpecialItems([]);
        setDinnerRiceItems([]);
        setDinnerVegetableItems([]);
        setDinnerStewItems([]);
        setDinnerMeatItems([]);

        // Fetch Menu data
        try {
            const lunchMenu = await getLunchMenuService(setLunchMenu);
            const dinnerMenu = await getDinnerMenuService(setDinnerMenu);

            if (lunchMenu) {
                const menuData = await fetchMenuData(lunchMenu, setLunchMenu, dinnerMenu, setDinnerMenu);
                setLunchSpecialItems(menuData.specialMenuLunch);
                setLunchRiceItems(menuData.riceMenuLunch);
                setLunchMeatItems(menuData.meetMenuLunch);
                setLunchStewItems(menuData.stewMenuLunch);
                setLunchVegetableItems(menuData.vegetableMenuLunch);

                setDinnerSpecialItems(menuData.specialMenuDinner);
                setDinnerRiceItems(menuData.riceMenuDinner);
                setDinnerMeatItems(menuData.meetMenuDinner);
                setDinnerStewItems(menuData.stewMenuDinner);
                setDinnerVegetableItems(menuData.vegetableMenuDinner);
            }
        } catch (error) {
            showToast("error", "Error fetching menus");
            log("error", "MenuScreen", "useEffect 1", error.message, "MenuScreen.js");
        }

        setLoading(false);
    };

    useEffect(() => {

        // Initial load
        clearValuesAndFetchData().catch(
            (error) => {
                showToast('error', 'Error fetching menus');
                log('error', 'MenuScreen', 'useEffect 2', error.message, 'MenuScreen.js');
            }
        );

        return navigation.addListener('focus', clearValuesAndFetchData);
    }, [navigation]);

    const createItemListWithType = (type, items, setItems, maxCount, disableCheckbox) => {
        const handleItemPress = (index) => {
            const newItems = [...items];
            const itemChecked = newItems[index].checked;
            const itemCount = newItems.filter(item => item.checked && item.foodType === type).length;

            if (itemChecked) {
                newItems[index].checked = false
                console.log("unchecked");
                console.log(type);
                console.log(items);
                const vegetable = lunchVegiItemList.filter(item => item.foodType === "Vegetable");
                const updatedItems = vegetable.map(item => ({
                    ...item,
                    percentage: 0,
                }));
                console.log(updatedItems);
                setLunchVegetableItems(updatedItems);

                if (type === "Vegetable") {
                    if (lunch) {
                        const vegetableItems = newItems.filter(item => item.foodType === "Vegetable");
                        const updatedItems = vegetableItems.map(item => ({
                            ...item,
                            percentage: 0,
                        }));
                        setLunchVegetableItems(updatedItems);

                        setLunchMeatItems(lunchMeatItems.map((item) => ({...item, percentage: 0,})));
                        setLunchStewItems(lunchStewItems.map((item) => ({...item, percentage: 0,})));
                    } else {
                        setDinnerMeatItems(dinnerMeatItems.map((item) => ({...item, percentage: 0,})));
                        setDinnerStewItems(dinnerStewItems.map((item) => ({...item, percentage: 0,})));
                    }
                }

                if (type === "Stew") {
                    if (lunch) {
                        setLunchMeatItems(lunchMeatItems.map((item) => ({...item, percentage: 0,})));
                    } else {
                        setDinnerMeatItems(dinnerMeatItems.map((item) => ({...item, percentage: 0,})));
                    }
                }

            } else if (itemCount >= maxCount) {
                showToast('warning', `You can select up to ${maxCount} ${type.toLowerCase()} only.`);
                return;
            } else {
                newItems[index].checked = true;

                if (type === "Vegetable") {
                    if (lunch) {
                        const updatedVegetableItems = lunchVegetableItems.map(item => ({
                            ...item,
                            percentage: 0,
                        }));
                        setLunchVegetableItems(updatedVegetableItems);
                    } else {
                        const updatedVegetableItems = dinnerVegetableItems.map(item => ({
                            ...item,
                            percentage: 0,
                        }));
                        setDinnerVegetableItems(updatedVegetableItems);
                    }
                }

                if (type === "Vegetable" && itemCount === 1) {
                    if (lunch) {
                        const selectedVegetables = [];

                        for (const item of lunchVegetableItems) {
                            if (item.checked && item.foodType === "Vegetable") {
                                selectedVegetables.push(item);
                            }
                        }

                        if (selectedVegetables.length === 2) {
                            const [vegi1, vegi2] = selectedVegetables.map((item) => item.food_id);

                            getLunchVegetablePercentageService(vegi1, vegi2)
                                .then((newPercentage) => {
                                    const updatedLunchVegetableItems = lunchVegetableItems.map((item) => {
                                        if (item === selectedVegetables[0]) {
                                            return {
                                                ...item,
                                                percentage: newPercentage,
                                            };
                                        } else if (item === selectedVegetables[1]) {
                                            return {
                                                ...item,
                                                percentage: newPercentage,
                                            };
                                        } else {
                                            return {
                                                ...item,
                                                percentage: 0,
                                            };
                                        }
                                    });

                                    setLunchVegetableItems(updatedLunchVegetableItems);
                                })
                                .catch((error) => {
                                    console.error("Error calculating percentage: ", error);
                                });
                        } else {
                            console.log("Please select exactly two vegetable items.");
                        }
                    } else {
                        const updatedDinnerStewItems = dinnerStewItems.map(async (item) => {
                            const checkedVegetables = dinnerVegetableItems.filter(item => item.checked && item.foodType === "Vegetable");

                            const vegi1 = checkedVegetables.length >= 1 ? checkedVegetables[0].food_id : null;
                            const vegi2 = checkedVegetables.length >= 2 ? checkedVegetables[1].food_id : null;

                            const newPercentage = await getDinnerStewPercentageService(vegi1, vegi2, item.food_id);

                            return {
                                ...item,
                                percentage: newPercentage,
                            };
                        });

                        Promise.all(updatedDinnerStewItems).then(updatedItems => {
                            setDinnerStewItems(updatedItems);
                        });
                    }
                }

                if (type === "Vegetable" && itemCount === 1) {
                    if (lunch) {
                        const updatedLunchStewItems = lunchStewItems.map(async (item) => {
                            const checkedVegetables = lunchVegetableItems.filter(item => item.checked && item.foodType === "Vegetable");

                            const vegi1 = checkedVegetables.length >= 1 ? checkedVegetables[0].food_id : null;
                            const vegi2 = checkedVegetables.length >= 2 ? checkedVegetables[1].food_id : null;

                            const newPercentage = await getLunchStewPercentageService(vegi1, vegi2, item.food_id);

                            return {
                                ...item,
                                percentage: newPercentage,
                            };
                        });

                        Promise.all(updatedLunchStewItems).then(updatedItems => {
                            setLunchStewItems(updatedItems);
                        });
                    } else {
                        const updatedDinnerStewItems = dinnerStewItems.map(async (item) => {
                            const checkedVegetables = dinnerVegetableItems.filter(item => item.checked && item.foodType === "Vegetable");

                            const vegi1 = checkedVegetables.length >= 1 ? checkedVegetables[0].food_id : null;
                            const vegi2 = checkedVegetables.length >= 2 ? checkedVegetables[1].food_id : null;

                            const newPercentage = await getDinnerStewPercentageService(vegi1, vegi2, item.food_id);

                            return {
                                ...item,
                                percentage: newPercentage,
                            };
                        });

                        Promise.all(updatedDinnerStewItems).then(updatedItems => {
                            setDinnerStewItems(updatedItems);
                        });
                    }
                }

                if (type === "Vegetable" && itemCount === 1 && (lunchStewItems.filter(item => item.checked && item.foodType === "Stew").length === 1 || dinnerStewItems.filter(item => item.checked && item.foodType === "Stew").length === 1)) {
                    if (lunch) {
                        const updatedLunchMeetItems = lunchMeatItems.map(async (item) => {
                            const checkedVegetables = lunchVegetableItems.filter(item => item.checked && item.foodType === "Vegetable");
                            const checkedStews = lunchStewItems.filter(item => item.checked && item.foodType === "Stew");

                            const vegi1 = checkedVegetables.length >= 1 ? checkedVegetables[0].food_id : null;
                            const vegi2 = checkedVegetables.length >= 2 ? checkedVegetables[1].food_id : null;
                            const stew = checkedStews.length >= 1 ? checkedStews[0].food_id : null;

                            const newPercentage = await getLunchMeetPercentageService(vegi1, vegi2, stew, item.food_id);

                            return {
                                ...item,
                                percentage: newPercentage,
                            };
                        });

                        Promise.all(updatedLunchMeetItems).then(updatedItems => {
                            setLunchMeatItems(updatedItems);
                        });
                    } else {
                        const updatedDinnerMeetItems = dinnerMeatItems.map(async (item) => {
                            const checkedVegetables = dinnerVegetableItems.filter(item => item.checked && item.foodType === "Vegetable");
                            const checkedStews = dinnerStewItems.filter(item => item.checked && item.foodType === "Stew");

                            const vegi1 = checkedVegetables.length >= 1 ? checkedVegetables[0].food_id : null;
                            const vegi2 = checkedVegetables.length >= 2 ? checkedVegetables[1].food_id : null;
                            const stew = checkedStews.length >= 1 ? checkedStews[0].food_id : null;

                            const newPercentage = await getDinnerStewPercentageService(vegi1, vegi2, stew, item.food_id);

                            return {
                                ...item,
                                percentage: newPercentage,
                            };
                        });

                        Promise.all(updatedDinnerMeetItems).then(updatedItems => {
                            setDinnerMeatItems(updatedItems);
                        });
                    }
                }

                if (type === "Stew" && itemCount === 0 && (lunchVegetableItems.filter(item => item.checked && item.foodType === "Vegetable").length === 2 || dinnerVegetableItems.filter(item => item.checked && item.foodType === "Vegetable").length === 2)) {
                    if (lunch) {
                        const updatedLunchMeetItems = lunchMeatItems.map(async (item) => {
                            const checkedVegetables = lunchVegetableItems.filter(item => item.checked && item.foodType === "Vegetable");
                            const checkedStews = lunchStewItems.filter(item => item.checked && item.foodType === "Stew");

                            const vegi1 = checkedVegetables.length >= 1 ? checkedVegetables[0].food_id : null;
                            const vegi2 = checkedVegetables.length >= 2 ? checkedVegetables[1].food_id : null;
                            const stew = checkedStews.length >= 1 ? checkedStews[0].food_id : null;

                            const newPercentage = await getLunchMeetPercentageService(vegi1, vegi2, stew, item.food_id);

                            return {
                                ...item,
                                percentage: newPercentage,
                            };
                        });

                        Promise.all(updatedLunchMeetItems).then(updatedItems => {
                            setLunchMeatItems(updatedItems);
                        });
                    } else {
                        const updatedDinnerMeetItems = dinnerMeatItems.map(async (item) => {
                            const checkedVegetables = dinnerVegetableItems.filter(item => item.checked && item.foodType === "Vegetable");
                            const checkedStews = dinnerStewItems.filter(item => item.checked && item.foodType === "Stew");

                            const vegi1 = checkedVegetables.length >= 1 ? checkedVegetables[0].food_id : null;
                            const vegi2 = checkedVegetables.length >= 2 ? checkedVegetables[1].food_id : null;
                            const stew = checkedStews.length >= 1 ? checkedStews[0].food_id : null;

                            const newPercentage = await getDinnerMeetPercentageService(vegi1, vegi2, stew, item.food_id);

                            return {
                                ...item,
                                percentage: newPercentage,
                            };
                        });

                        Promise.all(updatedDinnerMeetItems).then(updatedItems => {
                            setDinnerMeatItems(updatedItems);
                        });
                    }
                }
            }
            setItems(newItems);
        };

        return {type, items, handleItemPress, disableCheckbox};
    };

    const lunchItemList = [
        createItemListWithType("Rice", lunchRiceItems, setLunchRiceItems, 1, disableLunchCheckbox),
        createItemListWithType("Vegetable", lunchVegetableItems, setLunchVegetableItems, 2, disableLunchCheckbox),
        createItemListWithType("Stew", lunchStewItems, setLunchStewItems, 1, disableLunchCheckbox),
        createItemListWithType("Meat", lunchMeatItems, setLunchMeatItems, 1, disableLunchCheckbox),
    ];

    const dinnerItemList = [
        createItemListWithType("Rice", dinnerRiceItems, setDinnerRiceItems, 1, disableDinnerCheckbox),
        createItemListWithType("Vegetable", dinnerVegetableItems, setDinnerVegetableItems, 2, disableDinnerCheckbox),
        createItemListWithType("Stew", dinnerStewItems, setDinnerStewItems, 1, disableDinnerCheckbox),
        createItemListWithType("Meat", dinnerMeatItems, setDinnerMeatItems, 1, disableDinnerCheckbox),
    ];

    const getTotalCheckedItemsCount = (itemLists) => {
        if (itemLists.length === 0) return 0;

        return itemLists.reduce((total, itemList) => {
            if (itemList && itemList.items && Array.isArray(itemList.items)) {
                const checkedItemsCount = itemList.items.filter(item => item.checked).length;
                return total + checkedItemsCount;
            } else {
                return total;
            }
        }, 0);
    };

    const getTotalCheckedSpecialItemsCount = (specialMenu) => {
        if (!specialMenu || specialMenu.length === 0) return 0;

        return specialMenu.reduce((total, item) => {
            if (item.category && item.category.length > 0) {
                const checkedItemsCount = item.category.filter(subItem => subItem.checked).length;
                return total + checkedItemsCount;
            } else {
                return total;
            }
        }, 0);
    };

    const totalCheckedSpecialLunchItemsCount = useMemo(() => {
        return getTotalCheckedSpecialItemsCount(lunchSpecialItems);
    }, [lunchSpecialItems]);

    const totalCheckedSpecialDinnerItemsCount = useMemo(() => {
        return getTotalCheckedSpecialItemsCount(dinnerSpecialItems);
    }, [dinnerSpecialItems]);

    const getTotalCheckedItems = (itemLists) => {
        if (itemLists.length === 0) return [];

        return itemLists.reduce((total, itemList) => {
            if (itemList && itemList.items && Array.isArray(itemList.items)) {
                const checkedItems = itemList.items.filter(item => item.checked);
                return [...total, ...checkedItems];
            } else {
                return total;
            }
        }, []);
    };

    const getTotalCheckedSpecialItems = (specialMenu) => {
        if (!specialMenu || specialMenu.length === 0) return [];

        return specialMenu.reduce((total, item) => {
            if (item.category && item.category.length > 0) {
                const checkedItems = item.category.filter(subItem => subItem.checked);
                return [...total, ...checkedItems];
            } else {
                return total;
            }
        }, []);
    };

    const totalCheckedLunchItemsCount = useMemo(() => {
        return getTotalCheckedItemsCount(lunchItemList);
    }, [lunchRiceItems, lunchVegetableItems, lunchStewItems, lunchMeatItems]);

    const totalCheckedDinnerItemsCount = useMemo(() => {
        return getTotalCheckedItemsCount(dinnerItemList);
    }, [dinnerRiceItems, dinnerVegetableItems, dinnerMeatItems, dinnerStewItems]);

    const calculateTotalPrice = (itemList) => {
        let totalPrice = 0;
        itemList.forEach((item) => {
            if (item.checked) {
                totalPrice += item.price;
            }
        });
        return totalPrice;
    };

    const lunchTotalPrice = useMemo(() => {
        return calculateTotalPrice(getTotalCheckedItems(lunchItemList));
    }, [lunchRiceItems, lunchVegetableItems, lunchStewItems, lunchMeatItems]);

    const dinnerTotalPrice = useMemo(() => {
        return calculateTotalPrice(getTotalCheckedItems(dinnerItemList));
    }, [dinnerRiceItems, dinnerVegetableItems, dinnerMeatItems, dinnerStewItems]);

    const handleDisabledMenu = async () => {
        try {
            const response = await getUTCDateTime();
            const currentTime = new Date(response.data.datetime);

            const currentUTCHours = currentTime.getUTCHours();
            const currentUTCMinutes = currentTime.getUTCMinutes();

            if ((currentUTCHours > 4 || (currentUTCHours === 4 && currentUTCMinutes >= 30)) &&
                (currentUTCHours < 10 || (currentUTCHours === 10 && currentUTCMinutes < 30))) {
                setDisableLunchCheckbox(true);
                setDisableDinnerCheckbox(false);
            } else {
                setDisableDinnerCheckbox(true);
                setDisableLunchCheckbox(false);
            }

        } catch (error) {
            log('error', 'MenuScreen', 'handleDisabledMenu', error.message, 'MenuScreen.js');
        }
    }

    useEffect(() => {
        handleDisabledMenu().catch(
            (error) => {
                showToast('error', 'Error fetching menus');
                log('error', 'MenuScreen', 'useEffect 3', error.message, 'MenuScreen.js');
            }
        );
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        try {
            await clearValuesAndFetchData();
        } catch (error) {
            showToast('error', 'Error fetching menus');
            log('error', 'MenuScreen', 'onRefresh', error.message, 'MenuScreen.js');
        }
        setRefreshing(false);
    };

    const lunchStyles = [styles.lunchContainer, !lunch && styles.lunchContainerNotSelected];
    const dinnerStyles = [styles.dinnerContainer, lunch && styles.dinnerContainerNotSelected];

    if (loading) {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <View style={styles.mainContainer}>
                    <DynamicTopBar selectedTab={SelectedTab.MAIN}/>
                    <View style={styles.bodyTopBar}>
                        <TouchableOpacity style={lunchStyles} onPress={() => setLunch(true)}>
                            <Text style={styles.lunchContainerText}>Lunch</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={dinnerStyles} onPress={() => setLunch(false)}>
                            <Text style={styles.dinnerContainerText}>Dinner</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bodyContainer}>
                        <ActivityIndicator size="large" color="#630A10"
                                           style={styles.activityIndicator}/>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.mainContainer}>
                <DynamicTopBar selectedTab={SelectedTab.MAIN}/>
                <View style={styles.bodyTopBar}>
                    <TouchableOpacity style={lunchStyles} onPress={() => setLunch(true)}>
                        <Text style={styles.lunchContainerText}>Lunch</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={dinnerStyles} onPress={() => setLunch(false)}>
                        <Text style={styles.dinnerContainerText}>Dinner</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bodyContainer}>
                    {lunch && (
                        <Menu
                            specialMenu={lunchSpecialItems}
                            title="Lunch"
                            totalCheckedSpecialItemsCount={totalCheckedSpecialLunchItemsCount}
                            setSpecialMenu={setLunchSpecialItems}
                            isVegi={isVegiLunch}
                            setIsVegi={setIsVegiLunch}
                            itemList={lunchItemList}
                            totalCheckedItemsCount={totalCheckedLunchItemsCount}
                            totalCheckedItems={getTotalCheckedItems(lunchItemList)}
                            totalCheckedSpecialItems={getTotalCheckedSpecialItems(lunchSpecialItems)}
                            totalAmount={lunchTotalPrice}
                            isVisible={isVisible}
                            setIsVisible={setIsVisible}
                            disableTime={disableLunchCheckbox}
                            onRefresh={onRefresh}
                            refreshing={refreshing}
                        />
                    )}
                    {!lunch && (
                        <Menu
                            title="Dinner"
                            specialMenu={dinnerSpecialItems}
                            totalCheckedSpecialItemsCount={totalCheckedSpecialDinnerItemsCount}
                            setSpecialMenu={setDinnerSpecialItems}
                            isVegi={isVegiDinner}
                            setIsVegi={setIsVegiDinner}
                            itemList={dinnerItemList}
                            totalCheckedItemsCount={totalCheckedDinnerItemsCount}
                            totalCheckedItems={getTotalCheckedItems(dinnerItemList)}
                            totalCheckedSpecialItems={getTotalCheckedSpecialItems(dinnerSpecialItems)}
                            totalAmount={dinnerTotalPrice}
                            isVisible={isVisible}
                            setIsVisible={setIsVisible}
                            disableTime={disableDinnerCheckbox}
                            onRefresh={onRefresh}
                            refreshing={refreshing}
                        />
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    bodyTopBar: {
        backgroundColor: '#7E1F24',
        flexDirection: 'row',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    bodyContainer: {
        flex: 10,
    },
    lunchContainer: {
        flex: 1,
        borderColor: '#7E1F24',
        borderBottomColor: '#fff',
        borderWidth: 2,
        paddingVertical: 20,
        borderBottomWidth: 5,
        borderTopLeftRadius: 20,
    },
    lunchContainerNotSelected: {
        paddingVertical: 20,
        borderColor: '#7E1F24',
        borderBottomColor: '#fff',
        borderWidth: 2,
        flex: 1,
        borderBottomWidth: 0,
        borderTopLeftRadius: 20,
    },
    dinnerContainer: {
        flex: 1,
        borderColor: '#7E1F24',
        borderBottomColor: '#fff',
        borderWidth: 2,
        paddingVertical: 20,
        borderBottomWidth: 5,
        borderTopRightRadius: 20,
    },
    dinnerContainerNotSelected: {
        paddingVertical: 20,
        borderColor: '#7E1F24',
        borderBottomColor: '#fff',
        borderWidth: 2,
        flex: 1,
        borderBottomWidth: 0,
        borderTopRightRadius: 20,
    },
    lunchContainerText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        color: '#fff',
    },
    dinnerContainerText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        color: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
