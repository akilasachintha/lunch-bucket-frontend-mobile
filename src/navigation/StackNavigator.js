import {createNativeStackNavigator} from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import CompleteProfile from "../screens/CompleteProfile";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="Welcome" component={WelcomeScreen}/>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="SignUp" component={SignUp}/>
            <Stack.Screen name="CompleteProfile" component={CompleteProfile}/>
        </Stack.Navigator>
    );
}
