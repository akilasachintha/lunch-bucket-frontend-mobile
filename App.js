import {NavigationContainer} from "@react-navigation/native";
import StackNavigator from "./src/navigation/StackNavigator";
import {ToastProvider} from "./src/helpers/toast/Toast";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {StyleSheet} from "react-native";

export default function App() {
    return (
        <GestureHandlerRootView style={styles.container}>
            <ToastProvider>
                <NavigationContainer>
                    <StackNavigator/>
                </NavigationContainer>
            </ToastProvider>
        </GestureHandlerRootView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
