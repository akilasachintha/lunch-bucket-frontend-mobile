import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useMemo, useState} from "react";
import Menu from "../../components/menu/Menu";
import StaticTopBar from "../../components/topBar/StaticTopBar";
import {useToast} from "../../helpers/toast/Toast";
import {getUTCDateTime} from "../../services/timeService";
import {
    fetchMenuData,
    getDinnerMeetPercentageService,
    getDinnerStewPercentageService,
    getLunchMeetPercentageService,
    getLunchStewPercentageService
} from "../../services/menuService";
import {log} from "../../helpers/logs/log";
import AnimatedLoadingSpinner from "../../components/loading/LoadingSkelteon";

export default function MenuScreen({navigation}) {
    const {showToast} = useToast();

    // Common
    const [isVisible, setIsVisible] = useState(true);
    const [loading, setLoading] = useState(true);

    // Lunch
    const [lunch, setLunch] = useState(true);
    const [disableLunchCheckbox, setDisableLunchCheckbox] = useState(false);
    const [lunchVegetableItems, setLunchVegetableItems] = useState([]);
    const [lunchStewItems, setLunchStewItems] = useState([]);
    const [lunchMeatItems, setLunchMeatItems] = useState([]);

    // Dinner
    const [disableDinnerCheckbox, setDisableDinnerCheckbox] = useState(false);
    const [dinnerVegetableItems, setDinnerVegetableItems] = useState([]);
    const [dinnerStewItems, setDinnerStewItems] = useState([]);
    const [dinnerMeatItems, setDinnerMeatItems] = useState([]);

    useEffect(() => {
        const clearValuesAndFetchData = async () => {
            setLoading(true);

            // Clear values
            setLunchVegetableItems([]);
            setLunchStewItems([]);
            setLunchMeatItems([]);
            setDinnerVegetableItems([]);
            setDinnerStewItems([]);
            setDinnerMeatItems([]);

            // Fetch Menu data
            try {
                const menuData = await fetchMenuData();
                setLunchMeatItems(menuData.meetMenuLunch);
                setLunchStewItems(menuData.stewMenuLunch);
                setLunchVegetableItems(menuData.vegetableMenuLunch);
                setDinnerMeatItems(menuData.meetMenuDinner);
                setDinnerStewItems(menuData.stewMenuDinner);
                setDinnerVegetableItems(menuData.vegetableMenuDinner);
            } catch (error) {
                showToast("error", "Error fetching menus");
                log("error", "MenuScreen", "useEffect", error.message, "MenuScreen.js");
            }

            setLoading(false);
        };

        // Initial load
        clearValuesAndFetchData().catch(
            (error) => {
                showToast('error', 'Error fetching menus');
                log('error', 'MenuScreen', 'useEffect', error.message, 'MenuScreen.js');
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
                newItems[index].checked = false;

                if (type === "Vegetable") {
                    if (lunch) {
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
        createItemListWithType("Vegetable", lunchVegetableItems, setLunchVegetableItems, 2, disableLunchCheckbox),
        createItemListWithType("Stew", lunchStewItems, setLunchStewItems, 1, disableLunchCheckbox),
        createItemListWithType("Meat", lunchMeatItems, setLunchMeatItems, 1, disableLunchCheckbox),
    ];

    const dinnerItemList = [
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

    const totalCheckedLunchItemsCount = useMemo(() => {
        return getTotalCheckedItemsCount(lunchItemList);
    }, [lunchVegetableItems, lunchStewItems, lunchMeatItems]);

    const totalCheckedDinnerItemsCount = useMemo(() => {
        return getTotalCheckedItemsCount(dinnerItemList);
    }, [dinnerVegetableItems, dinnerMeatItems, dinnerStewItems]);

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
    }, [lunchVegetableItems, lunchStewItems, lunchMeatItems]);

    const dinnerTotalPrice = useMemo(() => {
        return calculateTotalPrice(getTotalCheckedItems(dinnerItemList));
    }, [dinnerVegetableItems, dinnerMeatItems, dinnerStewItems]);

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
                log('error', 'MenuScreen', 'useEffect', error.message, 'MenuScreen.js');
            }
        );
    }, []);


    const lunchStyles = [styles.lunchContainer, !lunch && styles.lunchContainerNotSelected];
    const dinnerStyles = [styles.dinnerContainer, lunch && styles.dinnerContainerNotSelected];

    if (loading) {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <View style={styles.mainContainer}>
                    <StaticTopBar/>
                    <View style={styles.bodyTopBar}>
                        <TouchableOpacity style={lunchStyles} onPress={() => setLunch(true)}>
                            <Text style={styles.lunchContainerText}>Lunch</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={dinnerStyles} onPress={() => setLunch(false)}>
                            <Text style={styles.dinnerContainerText}>Dinner</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bodyContainer}>
                        <AnimatedLoadingSpinner/>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.mainContainer}>
                <StaticTopBar/>
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
                            title="Lunch"
                            itemList={lunchItemList}
                            totalCheckedItemsCount={totalCheckedLunchItemsCount}
                            totalCheckedItems={getTotalCheckedItems(lunchItemList)}
                            totalAmount={lunchTotalPrice}
                            isVisible={isVisible}
                            setIsVisible={setIsVisible}
                            disableTime={disableLunchCheckbox}
                        />
                    )}
                    {!lunch && (
                        <Menu
                            title="Dinner"
                            itemList={dinnerItemList}
                            totalCheckedItemsCount={totalCheckedDinnerItemsCount}
                            totalCheckedItems={getTotalCheckedItems(dinnerItemList)}
                            totalAmount={dinnerTotalPrice}
                            isVisible={isVisible}
                            setIsVisible={setIsVisible}
                            disableTime={disableDinnerCheckbox}
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
});
