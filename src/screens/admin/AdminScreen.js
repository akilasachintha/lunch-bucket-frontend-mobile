import {ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import BottomButton from "../../components/buttons/BottomButton";
import React, {useState} from "react";
import {logoutService} from "../../services/authService";
import {useNavigation} from "@react-navigation/native";
import {
    getDinnerAdminNotificationsController,
    getDinnerReportController,
    getLunchAdminNotificationsController,
    getLunchReportController
} from "../../controllers/adminController";
import {useToast} from "../../helpers/toast/Toast";

export default function AdminScreen() {
    const navigation = useNavigation();
    const {showToast} = useToast();
    const [loading, setLoading] = useState({
        lunchNotification: false,
        dinnerNotification: false,
        lunchReport: false,
        dinnerReport: false,
    });
    const [responseData, setResponseData] = useState(null);

    const handleLogout = async () => {
        await logoutService();
        navigation.navigate('Initial');
    };

    const handleNotification = async (notificationFunction, buttonKey) => {
        setLoading({...loading, [buttonKey]: true});
        const response = await notificationFunction();
        setResponseData(response);
        showToast('success', JSON.stringify(response));
        setLoading({...loading, [buttonKey]: false});
    };

    const renderButton = (text, onPress, buttonKey) => {
        return (
            <TouchableOpacity onPress={() => handleNotification(onPress, buttonKey)} style={styles.button}>
                <View style={styles.buttonContent}>
                    <Text style={styles.buttonText}>{text}</Text>
                    {loading[buttonKey] && <ActivityIndicator size="small" color="#fff"/>}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{flex: 1, marginVertical: "12%", marginHorizontal: "8%"}}>
            <Text style={styles.titleText}>Admin Panel</Text>
            <Text style={styles.subtitleText}>Notifications</Text>
            <View style={{height: 8, backgroundColor: "#630A10", borderRadius: 10, marginVertical: "10%"}}/>
            {renderButton("Send Lunch Notifications", getLunchAdminNotificationsController, "lunchNotification")}
            {renderButton("Send Dinner Notifications", getDinnerAdminNotificationsController, "dinnerNotification")}
            <View style={{height: 8, backgroundColor: "#630A10", borderRadius: 10, marginVertical: "10%"}}/>

            <Text style={styles.subtitleText}>Report</Text>
            <View style={{height: 8, backgroundColor: "#630A10", borderRadius: 10, marginVertical: "10%"}}/>
            {renderButton("Lunch Report", getLunchReportController, "lunchReport")}
            {renderButton("Dinner Report", getDinnerReportController, "dinnerReport")}
            <View style={{height: 8, backgroundColor: "#630A10", borderRadius: 10, marginVertical: "10%"}}/>

            {responseData ? (
                <View>
                    {/* Render the response data here */}
                    <Text>{JSON.stringify(responseData)}</Text>
                </View>
            ) : null}

            <View style={styles.container}>
                <BottomButton onPress={handleLogout} buttonText="Logout"/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#630A10',
        textAlign: 'center',
    },
    container: {
        justifyContent: 'flex-end',
        flex: 1,
    },
    button: {
        backgroundColor: '#630A10',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        textAlign: 'center',
        marginVertical: 10,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        marginRight: 10,
    },
    subtitleText: {
        fontSize: 20,
        marginTop: 20,
        fontWeight: 'bold',
        color: '#630A10',
        textAlign: 'left',
    }
});
