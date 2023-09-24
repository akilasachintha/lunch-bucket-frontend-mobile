import {NavigationContainer} from "@react-navigation/native";
import StackNavigator from "./src/navigation/StackNavigator";
import {ToastProvider} from "./src/helpers/toast/Toast";
import React from "react";
import PushNotifications from "./src/features/PushNotifications";
import {store} from "./src/redux/store";
import {Provider} from 'react-redux'
import {StyleSheet, Text, View} from "react-native";
import {ENV, ENV_STRING} from "./src/apis/lunchBucketAPI";
import {Environments} from "./src/helpers/enums/enums";

export default function App() {
    return (
        <Provider store={store}>
            <ToastProvider>
                <PushNotifications/>
                <NavigationContainer>
                    <StackNavigator/>
                </NavigationContainer>
                {
                    ENV !== Environments.PRODUCTION && (
                        <View style={styles.environmentTextContainer}>
                            <Text style={styles.environmentText}>{ENV_STRING}</Text>
                        </View>
                    )
                }
            </ToastProvider>
        </Provider>
    );
}

const styles = StyleSheet.create({
    environmentTextContainer: {
        position: 'absolute',
        top: 30,
        right: 10,
        backgroundColor: 'rgba(189,43,43,0.71)',
        padding: 5,
        borderRadius: 5,
    },
    environmentText: {
        color: 'white',
        fontSize: 7,
    },
});

