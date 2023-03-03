import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";

export default function TopHeader({headerText, backButtonPath}) {
    const navigation = useNavigation();
    return (
        <View style={styles.bodyTopBar}>
            <TouchableOpacity style={styles.backButtonContainer} onPress={() => navigation.navigate(backButtonPath)}>
                <Ionicons style={styles.backButtonIcon} name="ios-chevron-back-outline" size={30} color="#fff"/>
            </TouchableOpacity>
            <View style={styles.topTextContainer}>
                <Text style={styles.topText}>{headerText}</Text>
            </View>
            <View style={styles.backButtonContainer}>
                <Text style={styles.backButtonIcon}></Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    bodyTopBar: {
        backgroundColor: '#7E1F24',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flexDirection: 'row',
    },
    backButtonContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    backButtonIcon: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
    },
    topTextContainer: {
        flex: 5,
        paddingVertical: 20,
    },
    topText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        color: '#fff',
    },
});