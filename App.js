import {NavigationContainer} from "@react-navigation/native";
import StackNavigator from "./src/navigation/StackNavigator";
import {ToastProvider} from "./src/helpers/toast/Toast";
import React from "react";
import PushNotifications from "./src/features/PushNotifications";
import {store} from "./src/redux/store";
import {Provider} from 'react-redux'

export default function App() {
    return (
        <Provider store={store}>
            <ToastProvider>
                <PushNotifications/>
                <NavigationContainer>
                    <StackNavigator/>
                </NavigationContainer>
            </ToastProvider>
        </Provider>
    );
}
