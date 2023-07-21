import {createNativeStackNavigator} from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/welcome/WelcomeScreen";
import Login from "../screens/auth/Login";
import SignUp from "../screens/auth/SignUp";
import MenuScreen from "../screens/order/MenuScreen";
import BasketScreen from "../screens/order/BasketScreen";
import CheckoutScreen from "../screens/order/CheckoutScreen";
import ChatScreen from "../screens/chat/ChatScreen";
import LeaveSuggestion from "../screens/chat/LeaveSuggestion";
import ContactOwner from "../screens/chat/ContactOwner";
import ProfileScreen from "../screens/ProfileScreen";
import InitialScreen from "../screens/welcome/InitialScreen";
import PromotionsScreen from "../screens/PromotionsScreen";
import PromotionDetails from "../components/promotions/PromotionDetails";
import ListOrdersScreen from "../screens/order/ListOrdersScreen";
import EditMenuScreen from "../screens/order/EditMenuScreen";

const Stack = createNativeStackNavigator();
export default function StackNavigator() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="initial" component={InitialScreen}/>
            <Stack.Screen name="Welcome" component={WelcomeScreen}/>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="SignUp" component={SignUp}/>
            <Stack.Screen name="Menu" component={MenuScreen}/>
            <Stack.Screen name="Basket" component={BasketScreen}/>
            <Stack.Screen name="EditMenu" component={EditMenuScreen}/>
            <Stack.Screen name="Checkout" component={CheckoutScreen}/>
            <Stack.Screen name="OrdersList" component={ListOrdersScreen}/>
            <Stack.Screen name="Chat" component={ChatScreen}/>
            <Stack.Screen name="LeaveSuggestion" component={LeaveSuggestion}/>
            <Stack.Screen name="ContactOwner" component={ContactOwner}/>
            <Stack.Screen name="Profile" component={ProfileScreen}/>
            <Stack.Screen name="Promotion" component={PromotionsScreen}/>
            <Stack.Screen name="PromotionDetails" component={PromotionDetails}/>
        </Stack.Navigator>
    );
}
