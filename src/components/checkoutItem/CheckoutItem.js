import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function CheckoutItem({mealName, count, price}) {
    return (
        <View>
            <TouchableOpacity style={[styles.checkoutItemContainer, styles.elevation, styles.shadowProp]}>
                <View style={styles.checkoutItemNameContainer}>
                    <Text style={styles.checkoutItemNameText}>{mealName}</Text>
                </View>
                <TouchableOpacity style={styles.circleCountTextContainer}>
                    <Text style={styles.countText}> {count} </Text>
                </TouchableOpacity>
                <View style={styles.priceTextContainer}>
                    <Text style={styles.priceText}> Rs {price} </Text>
                </View>
            </TouchableOpacity>
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
    checkoutItemContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(252, 240, 200, 1)',
        paddingVertical: 10,
        paddingHorizontal: 40,
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 30,
        alignItems: 'center',
    },
    checkoutItemNameContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },
    checkoutItemNameText: {
        fontSize: 18,
    },
    priceTextContainer: {
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    priceText: {
        fontSize: 18,
    },
    countText: {
        fontSize: 18,
        justifyContent: "center",
        alignItems: 'center',
        borderColor: '#fff',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    circleCountTextContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});