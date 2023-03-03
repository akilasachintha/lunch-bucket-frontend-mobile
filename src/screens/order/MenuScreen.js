import {Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useMemo, useState} from "react";
import Menu from "../../components/menu/Menu";
import StaticTopBar from "../../components/topBar/StaticTopBar";

export default function MenuScreen() {
    const [lunch, setLunch] = useState(true);
    const [isVisible, setIsVisible] = useState(true);

    // Objects for the menu
    const [vegetableItems, setVegetableItems] = useState([
        {id: 1, type: 'Vegetable', itemName: 'Dhal', checked: false},
        {id: 2, type: 'Vegetable', itemName: 'Sambol', checked: false},
        {id: 3, type: 'Vegetable', itemName: 'Mashoom', checked: false},
        {id: 4, type: 'Vegetable', itemName: 'Potatoes', checked: false},
    ]);
    const [stewItems, setStewItems] = useState([
        {id: 1, type: 'Stew', itemName: 'Chicken Stew', checked: false},
        {id: 2, type: 'Stew', itemName: 'Pork Stew', checked: false},
        {id: 3, type: 'Stew', itemName: 'Vegetable Stew', checked: false},
        {id: 4, type: 'Stew', itemName: 'Irish Stew', checked: false},
    ]);
    const [meatItems, setMeatItems] = useState([
        {id: 1, type: 'Meat', itemName: 'Chicken', checked: false, percentage: 100},
        {id: 2, type: 'Meat', itemName: 'Pork', checked: false, percentage: 60},
        {id: 3, type: 'Meat', itemName: 'Beef', checked: false, percentage: 70},
        {id: 4, type: 'Meat', itemName: 'Potatoes', checked: false, percentage: 75},
    ]);
    const [dinnerVegetableItems, setDinnerVegetableItems] = useState([
        {id: 1, type: 'Vegetable', itemName: 'Dhal', checked: false},
        {id: 2, type: 'Vegetable', itemName: 'Sambol', checked: false},
        {id: 3, type: 'Vegetable', itemName: 'Mashoom', checked: false},
        {id: 4, type: 'Vegetable', itemName: 'Potatoes', checked: false},
    ]);
    const [dinnerStewItems, setDinnerStewItems] = useState([
        {id: 1, type: 'Stew', itemName: 'Chicken Stew', checked: false},
        {id: 2, type: 'Stew', itemName: 'Pork Stew', checked: false},
        {id: 3, type: 'Stew', itemName: 'Vegetable Stew', checked: false},
        {id: 4, type: 'Stew', itemName: 'Irish Stew', checked: false},
    ]);
    const [dinnerMeatItems, setDinnerMeatItems] = useState([
        {id: 1, type: 'Meat', itemName: 'Chicken', checked: false},
        {id: 2, type: 'Meat', itemName: 'Pork', checked: false},
        {id: 3, type: 'Meat', itemName: 'Beef', checked: false},
        {id: 4, type: 'Meat', itemName: 'Potatoes', checked: false},
    ]);

    const createItemListWithType = (type, items, setItems, maxCount) => {
        const handleItemPress = (index) => {
            const newItems = [...items];
            const itemChecked = newItems[index].checked;
            const itemCount = newItems.filter(item => item.checked && item.type === type).length;

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
        createItemListWithType("Vegetable", vegetableItems, setVegetableItems, 2),
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