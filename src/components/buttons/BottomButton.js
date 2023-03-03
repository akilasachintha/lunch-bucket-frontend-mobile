import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";

export default function BottomButton({buttonText, onPress}) {
    const navigation = useNavigation();

    return (
        <View style={styles.viewItemContainer}>
            <TouchableOpacity
                style={styles.viewItemContainerTextContainer}
                onPress={onPress}
            >
                <Text style={styles.viewItemContainerText}> {buttonText} </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    viewItemContainer: {
        backgroundColor: 'rgba(255, 230, 98, 1)',
        paddingVertical: 20,
        flexDirection: 'row',
    },
    viewItemContainerTextContainer: {
        alignItems: 'center',
        flex: 1,
    },
    viewItemContainerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#630A10',
    },
});