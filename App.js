import {NavigationContainer} from "@react-navigation/native";
import StackNavigator from "./src/navigation/StackNavigator";
import {ToastProvider} from "./src/helpers/toast/Toast";
import React from "react";
import PushNotifications from "./src/features/PushNotifications";

export default function App() {
    return (
        <ToastProvider>
            <PushNotifications/>
            <NavigationContainer>
                <StackNavigator/>
            </NavigationContainer>
        </ToastProvider>
    );
}
