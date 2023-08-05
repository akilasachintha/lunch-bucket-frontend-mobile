import {NavigationContainer} from "@react-navigation/native";
import StackNavigator from "./src/navigation/StackNavigator";
import {ToastProvider} from "./src/helpers/toast/Toast";
import React from "react";

export default function App() {
    return (
        <ToastProvider>
            <NavigationContainer>
                <StackNavigator/>
            </NavigationContainer>
        </ToastProvider>
    );
}
