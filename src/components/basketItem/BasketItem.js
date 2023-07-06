import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AntDesign, Fontisto} from '@expo/vector-icons';
import {useState} from 'react';

export default function BasketItem({mealName}) {
    const [count, setCount] = useState(0);
    const [onClicked, setOnClicked] = useState(true);

    const handleMinusPress = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    const handlePlusPress = () => {
        setCount(count + 1);
    };

    return (
        <View>
            {onClicked && (
                <TouchableOpacity style={[styles.bucketItemContainer, styles.elevation, styles.shadowProp]}
                                  onPress={() => setOnClicked(false)}>
                    <View style={styles.bucketItemNameContainer}>
                        <Text style={styles.bucketItemNameText}>{mealName}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.minusButtonTextContainer}
                        onPress={handleMinusPress}
                    >
                        <Fontisto name="minus-a" size={14} color="black"/>
                    </TouchableOpacity>
                    <View style={styles.countTextContainer}>
                        <Text style={styles.countText}>{count}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.plusButtonTextContainer}
                        onPress={handlePlusPress}
                    >
                        <Fontisto name="plus-a" size={14} color="black"/>
                    </TouchableOpacity>
                </TouchableOpacity>
            )}
            {!onClicked && (
                <View>
                    <TouchableOpacity style={styles.bucketItemExpandContainer} onPress={() => setOnClicked(true)}>
                        <View style={styles.bucketItemNameContainer}>
                            <Text style={styles.bucketItemNameText}>{mealName}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.plusButtonTextContainer}
                            onPress={handleMinusPress}
                        >
                            <Fontisto name="minus-a" size={14} color="black"/>
                        </TouchableOpacity>
                        <View style={styles.countTextContainer}>
                            <Text style={styles.countText}>{count}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.minusButtonTextContainer}
                            onPress={handlePlusPress}
                        >
                            <Fontisto name="plus-a" size={14} color="black"/>
                        </TouchableOpacity>
                        <View style={styles.editButtonContainer}>
                            <TouchableOpacity
                                style={styles.editButtonTextContainer}
                            >
                                <AntDesign name="edit" size={14} color="black"/>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                    <View style={[styles.itemListContainer, styles.elevation, styles.shadowProp]}>
                        <View style={styles.listItemContainer}>
                            <Text style={styles.listItemContainerText}>Dhal</Text>
                        </View>
                        <View style={styles.listItemContainer}>
                            <Text style={styles.listItemContainerText}>Sambol</Text>
                        </View>
                        <View style={styles.listItemContainer}>
                            <Text style={styles.listItemContainerText}>Mushoom</Text>
                        </View>
                        <View style={styles.listItemContainer}>
                            <Text style={styles.listItemContainerText}>Potatoes</Text>
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    elevation: {
        elevation: 10,
        shadowColor: '#5b595b',
    },
    bucketItemContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(252, 240, 200, 1)',
        paddingVertical: 20,
        paddingHorizontal: 40,
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 30,
        alignItems: 'center',
    },
    bucketItemNameContainer: {
        flex: 5,
    },
    bucketItemNameText: {
        fontSize: 18,
    },
    plusButtonTextContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        flex: 1,
        borderWidth: 2,
        borderColor: '#fff',
    },
    countTextContainer: {
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        flex: 1,
        marginHorizontal: 10,
    },
    countText: {
        fontSize: 18,
    },
    minusButtonTextContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        flex: 1,
        borderWidth: 2,
        borderColor: '#fff',
    },
    editButtonContainer: {
        marginLeft: 20,
    },
    editButtonTextContainer: {
        backgroundColor: 'rgba(99, 10, 16, 0.12)',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        flex: 1,
        borderWidth: 2,
        borderColor: '#fff',
    },
    bucketItemExpandContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(252, 240, 200, 0.3)',
        paddingVertical: 20,
        paddingHorizontal: 40,
        marginVertical: 10,
        alignItems: 'center',
    },
    listItemContainer: {
        marginHorizontal: 40,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderColor: '#fff',
        borderBottomColor: 'rgba(197,194,194,0.5)',
        borderWidth: 2,
    },
    listItemContainerText: {
        fontSize: 18,
    },
    itemListContainer: {
        marginBottom: 20,
    }
});