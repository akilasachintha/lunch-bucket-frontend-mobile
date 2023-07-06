import {Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useMemo, useState} from "react";
import Menu from "../../components/menu/Menu";
import StaticTopBar from "../../components/topBar/StaticTopBar";
import {
    getDinnerMeetMenu,
    getDinnerStewMenu,
    getDinnerVegetableMenu,
    getLunchMeetMenu,
    getLunchStewMenu,
    getLunchVegetableMenu
} from "../../services/menuService";

export default function MenuScreen() {
    const [lunch, setLunch] = useState(true);
    const [isVisible, setIsVisible] = useState(true);

    // Objects for the menu
    const [vegetableItems, setVegetableItems] = useState([]);
    const [stewItems, setStewItems] = useState([]);
    const [meatItems, setMeatItems] = useState([]);

    const [dinnerVegetableItems, setDinnerVegetableItems] = useState([]);
    const [dinnerStewItems, setDinnerStewItems] = useState([]);
    const [dinnerMeatItems, setDinnerMeatItems] = useState([]);

    async function fetchLunchMenuData() {
        try {
            const meetMenuLunch = await getLunchMeetMenu();
            const stewMenuLunch = await getLunchStewMenu();
            const vegetableMenuLunch = await getLunchVegetableMenu();

            setMeatItems(meetMenuLunch);
            setStewItems(stewMenuLunch);
            setVegetableItems(vegetableMenuLunch);

        } catch (error) {
            console.log("Error fetching lunch menu:", error.message);
        }
    }

    async function fetchDinnerMenuData() {
        try {
            const meetMenuDinner = await getDinnerMeetMenu();
            const stewMenuDinner = await getDinnerStewMenu();
            const vegetableMenuDinner = await getDinnerVegetableMenu();

            setDinnerMeatItems(meetMenuDinner);
            setDinnerStewItems(stewMenuDinner);
            setDinnerVegetableItems(vegetableMenuDinner);

        } catch (error) {
            console.log("Error fetching lunch menu:", error.message);
        }
    }

    // Functions for the menu
    useEffect(() => {
        fetchLunchMenuData();
        fetchDinnerMenuData();

    }, []);


    const createItemListWithType = (type, items, setItems, maxCount) => {
        const handleItemPress = (index) => {
            const newItems = [...items];
            const itemChecked = newItems[index].checked;
            const itemCount = newItems.filter(item => item.checked && item.foodType === type).length;

            if (itemChecked) {
                newItems[index].checked = false;
            } else if (itemCount >= maxCount) {
                Alert.alert('Limit Exceeded', `You can select up to ${maxCount} ${type.toLowerCase()} only.`);
                return;
            } else {
                newItems[index].checked = true;
            }
            setItems(newItems);
        };
        return {type, items, handleItemPress};
    };

    const lunchItemList = [
        createItemListWithType("Vegetable", vegetableItems, setVegetableItems, 1),
        createItemListWithType("Stew", stewItems, setStewItems, 1),
        createItemListWithType("Meat", meatItems, setMeatItems, 1),
    ];

    const dinnerItemList = [
        createItemListWithType("Vegetable", dinnerVegetableItems, setDinnerVegetableItems, 2),
        createItemListWithType("Meat", dinnerMeatItems, setDinnerMeatItems, 1),
        createItemListWithType("Stew", dinnerStewItems, setDinnerStewItems, 1),
    ];

    const getTotalCheckedItemsCount = (itemLists) => {
        return itemLists.reduce((count, list) => {
            return count + list.items.filter(item => item.checked).length;
        }, 0);
    };

    const totalCheckedLunchItems = useMemo(() => {
        return getTotalCheckedItemsCount(lunchItemList);
    }, [vegetableItems, stewItems, meatItems]);

    const totalCheckedDinnerItems = useMemo(() => {
        return getTotalCheckedItemsCount(dinnerItemList);
    }, [dinnerVegetableItems, dinnerMeatItems, dinnerStewItems]);

    const lunchStyles = [styles.lunchContainer, !lunch && styles.lunchContainerNotSelected];
    const dinnerStyles = [styles.dinnerContainer, lunch && styles.dinnerContainerNotSelected];

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
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
                        totalCheckedItems={totalCheckedLunchItems}
                        timeLimit="10 AM"
                        totalAmount={400}
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                    />
                )}
                {!lunch && (
                    <Menu
                        title="Dinner"
                        itemList={dinnerItemList}
                        totalCheckedItems={totalCheckedDinnerItems}
                        timeLimit="5 PM"
                        totalAmount={500}
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                    />
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: '#fff',
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
    bodyContentContainer: {
        marginTop: 20,
        flex: 6,
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
});