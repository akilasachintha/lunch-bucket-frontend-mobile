import {StyleSheet, Text, TouchableOpacity} from "react-native";

export default function BorderButton({text, onPress, icon}) {
    return (
        <TouchableOpacity style={styles.borderButtonContainer} onPress={onPress}>
            {icon}
            <Text style={styles.borderButtonContainerText}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    bodyContainer: {
        paddingTop: 20,
        flex: 10,
        justifyContent: 'center',
    },
    borderButtonContainer: {
        flexDirection: "row",
        paddingVertical: 10,
        marginVertical: 10,
        marginHorizontal: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#630A10',
        borderWidth: 2,
        borderRadius: 40,
    },
    borderButtonContainerText: {
        fontSize: 18,
        marginLeft: 10,
        color: '#630A10',
    },
});