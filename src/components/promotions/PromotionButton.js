import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";

export default function PromotionButton() {
    const navigation = useNavigation();

    return (
        <View style={styles.promotionButtonContainer}>
            <TouchableOpacity
                style={styles.promotionButtonContainerTextContainer}
                onPress={() => navigation.navigate('Promotion')}
            >
                <Text style={styles.promotionButtonText}> {'<< View Promotions >>'} </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    promotionButtonContainer: {
        backgroundColor: '#2C2C2C',
        paddingVertical: 10,
        flexDirection: 'row',
    },
    promotionButtonContainerTextContainer: {
        alignItems: 'center',
        flex: 1,
    },
    promotionButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FCF0C8',
    },
});