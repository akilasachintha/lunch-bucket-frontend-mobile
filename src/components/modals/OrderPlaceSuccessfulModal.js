import {Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {AntDesign} from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";

export default function OrderPlaceSuccessfulModal({isVisible, setIsVisible, basket, successResult}) {

    const navigation = useNavigation();

    const handlePress = () => {
        setIsVisible(false);
        navigation.navigate('OrdersList');
    }

    return (
        <View style={styles.container}>
            <Modal visible={isVisible} transparent>
                <TouchableOpacity
                    onPress={handlePress}
                    style={styles.background}
                >
                    <View style={styles.modal}>
                        <View style={styles.modalIconContainer}>
                            <AntDesign name="checkcircle" size={80} color="rgba(56, 207, 98, 1)"/>
                        </View>
                        <View style={styles.modalTopTextContainer}>
                            <Text style={styles.modalTopText}>Your order was placed successfully</Text>
                        </View>
                        <View style={styles.earnedContainer}>
                            <Text style={styles.earnedText}>You Earned
                                Points: {successResult && successResult.earned_points}</Text>
                            <Text style={styles.earnedText}>Your Total
                                Points: {successResult && successResult.balance_points}</Text>
                        </View>
                        <View style={styles.modalBottomTextContainer}>
                            <Text style={styles.modalBottomText}>You can change your {basket && basket.venue} order
                                until {basket && basket.venue === "Lunch" ? "10 AM" : "4 PM"}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flex: 1,
        zIndex: 1,
    },
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        paddingVertical: 35,
        alignItems: 'center',
    },
    modalIconContainer: {},
    modalTopTextContainer: {
        marginTop: 20,
    },
    modalTopText: {
        fontSize: 18,
        textAlign: 'center',
        color: 'rgba(68, 68, 68, 1)',
    },
    modalBottomTextContainer: {
    },
    modalBottomText: {
        color: 'rgba(68, 68, 68, 1)',
        fontSize: 12,
        textAlign: 'center',
    },
    earnedContainer: {
        marginVertical: "5%",
    },
    earnedText: {
        color: 'rgb(134,36,43)',
    }
});