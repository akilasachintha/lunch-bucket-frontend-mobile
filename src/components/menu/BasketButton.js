import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";

const BasketButton = ({totalCheckedItems, totalAmount}) => {
    const navigation = useNavigation();

    return (
        <View style={styles.priceContainer}>
            <TouchableOpacity
                style={styles.priceContainerLeft}
                onPress={() => navigation.navigate('Basket')}
            >
                <Text style={styles.priceContainerLeftText}>View Basket ({totalCheckedItems})</Text>
            </TouchableOpacity>
            <View style={styles.priceContainerRight}>
                <Text style={styles.priceContainerRightText}>Rs {totalAmount}</Text>
            </View>
        </View>
    );
};

export default BasketButton;

const styles = StyleSheet.create({
    priceContainer: {
        backgroundColor: 'rgba(255, 230, 98, 1)',
        paddingVertical: 20,
        flexDirection: 'row',
    },
    priceContainerLeft: {
        alignItems: 'center',
        flex: 1,
    },
    priceContainerRight: {
        alignItems: 'center',
        flex: 1,
    },
    priceContainerLeftText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#630A10',
    },
    priceContainerRightText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#630A10',
    },
});