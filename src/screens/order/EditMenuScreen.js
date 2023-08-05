import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useMemo, useState} from "react";
import Menu from "../../components/menu/Menu";
import StaticTopBar from "../../components/topBar/StaticTopBar";
import {useToast} from "../../helpers/toast/Toast";
import {getUTCDateTime} from "../../services/timeService";
import {
    getByMealIdFromBasketService,
    getDinnerMeetMenuService,
    getDinnerRiceMenuService,
    getDinnerStewMenuService,
    getDinnerVegetableMenuService,
    getLunchMeetMenuService,
    getLunchMeetPercentageService,
    getLunchRiceMenuService,
    getLunchStewMenuService,
    getLunchStewPercentageService,
    getLunchVegetableMenuService,
} from "../../services/menuService";
import {log} from "../../helpers/logs/log";
import AnimatedLoadingSpinner from "../../components/loading/LoadingSkelteon";

export default function EditMenuScreen({route}) {
    const {showToast} = useToast();
    const {mealId} = route.params;

    const [isVisible, setIsVisible] = useState(true);
    const [loading, setLoading] = useState(true);

    const [isVegiLunch, setIsVegiLunch] = useState(false);
    const [isVegiDinner, setIsVegiDinner] = useState(false);

    const [meal, setMeal] = useState({});
    const [lunch, setLunch] = useState(true);
    const [disableLunchCheckbox, setDisableLunchCheckbox] = useState(false);
    const [disableDinnerCheckbox, setDisableDinnerCheckbox] = useState(false);

    const [lunchRiceItems, setLunchRiceItems] = useState([]);
    const [lunchVegetableItems, setLunchVegetableItems] = useState([]);
    const [lunchStewItems, setLunchStewItems] = useState([]);
    const [lunchMeatItems, setLunchMeatItems] = useState([]);

    const [dinnerRiceItems, setDinnerRiceItems] = useState([]);
    const [dinnerVegetableItems, setDinnerVegetableItems] = useState([]);
    const [dinnerStewItems, setDinnerStewItems] = useState([]);
    const [dinnerMeatItems, setDinnerMeatItems] = useState([]);

    const fetchMealById = async (mealId) => {
        const result = await getByMealIdFromBasketService(mealId);
        if (result != null) {
            setMeal(result);

            if (result.venue === "Dinner") {
                const totalDinnerVegetableItems = await getDinnerVegetableMenuService();
                const dinnerVegetableItems = result.items.filter((item) => item.foodType === "Vegetable");
                const updatedDinnerVegetableItems = totalDinnerVegetableItems.map((item) => {
                    const foundItem = dinnerVegetableItems.find((dinnerItem) => dinnerItem.id === item.id);
                    return {
                        ...item,
                        checked: foundItem ? foundItem.checked : false,
                    };
                });

                const totalDinnerStewItems = await getDinnerStewMenuService();
                const dinnerStewItems = result.items.filter((item) => item.foodType === "Stew");
                const updatedDinnerStewItems = totalDinnerStewItems.map((item) => {
                    const foundItem = dinnerStewItems.find((dinnerItem) => dinnerItem.id === item.id);
                    return {
                        ...item,
                        checked: foundItem ? foundItem.checked : false,
                    };
                });

                const totalDinnerMeatItems = await getDinnerMeetMenuService();
                const dinnerMeatItems = result.items.filter((item) => item.foodType === "Meat");
                const updatedDinnerMeatItems = totalDinnerMeatItems.map((item) => {
                    const foundItem = dinnerMeatItems.find((dinnerItem) => dinnerItem.id === item.id);
                    return {
                        ...item,
                        checked: foundItem ? foundItem.checked : false,
                    };
                });

                const totalDinnerRiceItems = await getDinnerRiceMenuService();
                const dinnerRiceItems = result.items.filter((item) => item.foodType === "Rice");
                const updatedDinnerRiceItems = totalDinnerRiceItems.map((item) => {
                    const foundItem = dinnerRiceItems.find((dinnerItem) => dinnerItem.id === item.id);
                    return {
                        ...item,
                        checked: foundItem ? foundItem.checked : false,
                    };
                });

                setDinnerRiceItems(updatedDinnerRiceItems);
                setDinnerVegetableItems(updatedDinnerVegetableItems);
                setDinnerStewItems(updatedDinnerStewItems);
                setDinnerMeatItems(updatedDinnerMeatItems);
            }

            if (result.venue === "Lunch") {
                const totalLunchVegetableItems = await getLunchVegetableMenuService();
                const lunchVegetableItems = result.items.filter((item) => item.foodType === "Vegetable");
                const updatedLunchVegetableItems = totalLunchVegetableItems.map((item) => {
                    const foundItem = lunchVegetableItems.find((lunchItem) => lunchItem.id === item.id);
                    return {
                        ...item,
                        checked: foundItem ? foundItem.checked : false,
                    };
                });

                const totalLunchStewItems = await getLunchStewMenuService();
                const lunchStewItems = result.items.filter((item) => item.foodType === "Stew");
                const updatedLunchStewItems = totalLunchStewItems.map((item) => {
                    const foundItem = lunchStewItems.find((lunchItem) => lunchItem.id === item.id);
                    return {
                        ...item,
                        checked: foundItem ? foundItem.checked : false,
                    };
                });

                const totalLunchMeatItems = await getLunchMeetMenuService();
                const lunchMeatItems = result.items.filter((item) => item.foodType === "Meat");
                const updatedLunchMeatItems = totalLunchMeatItems.map((item) => {
                    const foundItem = lunchMeatItems.find((lunchItem) => lunchItem.id === item.id);
                    return {
                        ...item,
                        checked: foundItem ? foundItem.checked : false,
                    };
                });

                const totalLunchRiceItems = await getLunchRiceMenuService();
                const lunchRiceItems = result.items.filter((item) => item.foodType === "Rice");
                const updatedLunchRiceItems = totalLunchRiceItems.map((item) => {
                    const foundItem = lunchRiceItems.find((lunchItem) => lunchItem.id === item.id);
                    return {
                        ...item,
                        checked: foundItem ? foundItem.checked : false,
                    };
                });

                setLunchRiceItems(updatedLunchRiceItems);
                setLunchVegetableItems(updatedLunchVegetableItems);
                setLunchStewItems(updatedLunchStewItems);
                setLunchMeatItems(updatedLunchMeatItems);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchMealById(mealId).catch(
            (error) => {
                showToast('error', 'Error fetching menus');
                log('error', 'EditMenuScreen', 'useEffect', error.message, 'EditMenuScreen.js');
            }
        );
    }, [mealId]);

    const createItemListWithType = (type, items, setItems, maxCount, disableCheckbox) => {
        const handleItemPress = (index) => {
            const newItems = [...items];
            const itemChecked = newItems[index].checked;
            const itemCount = newItems.filter(item => item.checked && item.foodType === type).length;

            if (itemChecked) {
                newItems[index].checked = false;

                if (type === "Vegetable") {
                    setLunchMeatItems(lunchMeatItems.map((item) => ({...item, percentage: 0,})));
                    setLunchStewItems(lunchStewItems.map((item) => ({...item, percentage: 0,})));
                }

                if (type === "Stew") {
                    setLunchMeatItems(lunchMeatItems.map((item) => ({...item, percentage: 0,})));
                }

            } else if (itemCount >= maxCount) {
                showToast('warning', `You can select up to ${maxCount} ${type.toLowerCase()} only.`);
                return;
            } else {
                newItems[index].checked = true;

                if (type === "Vegetable" && itemCount === 1) {
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
                }

                if (type === "Vegetable" && itemCount === 1 && lunchStewItems.filter(item => item.checked && item.foodType === "Stew").length === 1) {
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
                }

                if (type === "Stew" && itemCount === 0 && lunchVegetableItems.filter(item => item.checked && item.foodType === "Vegetable").length === 2) {
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

    const lunchVegiItemList = [
        createItemListWithType("Rice", lunchRiceItems, setLunchRiceItems, 1, disableLunchCheckbox),
        createItemListWithType("Vegetable", lunchVegetableItems, setLunchVegetableItems, 4, disableLunchCheckbox),
    ];

    const dinnerVegiItemList = [
        createItemListWithType("Rice", dinnerRiceItems, setDinnerRiceItems, 1, disableDinnerCheckbox),
        createItemListWithType("Vegetable", dinnerVegetableItems, setDinnerVegetableItems, 4, disableDinnerCheckbox),
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
            log('error', 'EditMenuScreen', 'handleDisabledMenu', error.message, 'EditMenuScreen.js');
        }
    }

    useEffect(() => {
        handleDisabledMenu().catch(
            (error) => {
                showToast('error', 'Error fetching menus');
                log('error', 'EditMenuScreen', 'useEffect', error.message, 'EditMenuScreen.js');
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
                        {
                            meal && meal.venue === "Lunch" ? (
                                <TouchableOpacity style={lunchStyles} onPress={() => setLunch(false)}>
                                    <Text style={styles.dinnerContainerText}>Update Lunch {meal && meal.name}</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity style={dinnerStyles} onPress={() => setLunch(false)}>
                                    <Text style={styles.dinnerContainerText}>Update Dinner {meal && meal.name}</Text>
                                </TouchableOpacity>
                            )
                        }
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
                    {
                        meal && meal.venue === "Lunch" ? (
                            <TouchableOpacity style={lunchStyles} onPress={() => setLunch(false)}>
                                <Text style={styles.dinnerContainerText}>Lunch</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity style={dinnerStyles} onPress={() => setLunch(false)}>
                                <Text style={styles.dinnerContainerText}>Change Dinner {meal && meal.name}</Text>
                            </TouchableOpacity>
                        )
                    }
                </View>
                <View style={styles.bodyContainer}>
                    <Menu
                        title={meal.venue === "Lunch" ? "Lunch" : "Dinner"}
                        itemList={meal.venue === "Lunch" ? lunchItemList : dinnerItemList}
                        totalCheckedItemsCount={meal.venue === "Lunch" ? totalCheckedLunchItemsCount : totalCheckedDinnerItemsCount}
                        totalCheckedItems={meal.venue === "Lunch" ? getTotalCheckedItems(lunchItemList) : getTotalCheckedItems(dinnerItemList)}
                        totalAmount={meal.venue === "Lunch" ? lunchTotalPrice : dinnerTotalPrice}
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        disableTime={meal.venue === "Lunch" ? disableLunchCheckbox : disableDinnerCheckbox}
                        editMenu={true}
                        mealId={mealId}
                    />
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
        borderTopRightRadius: 20,
    },
    dinnerContainer: {
        flex: 1,
        borderColor: '#7E1F24',
        borderBottomColor: '#fff',
        borderWidth: 2,
        paddingVertical: 20,
        borderBottomWidth: 5,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
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
