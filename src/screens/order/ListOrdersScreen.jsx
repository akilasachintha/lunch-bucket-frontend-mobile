import {ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import TopHeader from "../../components/topHeader/TopHeader";
import React, {useEffect, useState} from "react";
import {deleteOrderService, getOrdersService} from "../../services/ordersService";
import {log} from "../../helpers/logs/log";
import OrderItem from "../../components/orderItem/OrderItem";
import {dynamicFont} from "../../helpers/responsive/fontScale";
import DynamicTopBar from "../../components/topBar/DynamicTopBar";
import {SelectedTab} from "../../helpers/enums/enums";

export default function ListOrdersScreen() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        setLoading(true);
        const response = await getOrdersService();
        setOrders(response);
        setLoading(false);
    }

    useEffect(() => {
        fetchOrders().catch((error) => {
            log("error", "ListOrdersScreen", "useEffect", error.message, "ListOrdersScreen.jsx");
        });
    }, []);

    const handleDeleteOrder = async (orderId) => {
        try {
            await deleteOrderService(orderId);
            await fetchOrders();
        } catch (error) {
            log('error', 'ListOrdersScreen', 'handleDeleteOrder', error.message, 'ListOrdersScreen.jsx');
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <DynamicTopBar selectedTab={SelectedTab.PREVIOUS}/>
                <TopHeader headerText="Your Orders" backButtonPath="Menu"/>
                <View style={styles.bodyContainerLoading}>
                    <ActivityIndicator size="large" color="#630A10" style={styles.activityIndicator}/>
                </View>
            </SafeAreaView>
        );
    }

    if (orders && orders.length === 0) {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <DynamicTopBar selectedTab={SelectedTab.PREVIOUS}/>
                <TopHeader headerText="Your Orders" backButtonPath="Menu"/>
                <View style={styles.bodyContainer}>
                    <ScrollView contentContainerStyle={styles.noOrdersContainer}>
                        <Text style={styles.noOrdersText}>No orders found.</Text>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <DynamicTopBar selectedTab={SelectedTab.PREVIOUS}/>
            <TopHeader headerText="Your Orders" backButtonPath="Menu"/>
            <View style={styles.bodyContainer}>
                <ScrollView>
                    {orders && orders.length > 0 && orders.map((order, index) => (
                        <OrderItem key={order.id} mealName={`Order ${index + 1}`} items={order.items}
                                   id={order.id}
                                   count={order.packet_amount} category={order.category} type={order.type}
                                   orderType={order.order_type}
                                   onDeleteOrder={() => handleDeleteOrder(order.id)}
                        />
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
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
    },
    bodyContainerLoading: {
        paddingTop: 5,
        flex: 10,
    },
    addAnotherMealContainer: {
        flexDirection: "row",
        paddingVertical: 10,
        marginVertical: 40,
        marginHorizontal: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#630A10',
        borderWidth: 2,
        borderRadius: 40,
    },
    addAnotherMealText: {
        fontSize: 18,
        marginLeft: 10,
        color: '#630A10',
        fontWeight: 'bold',
    },
    noOrdersContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noOrdersText: {
        fontSize: dynamicFont(12),
        color: '#000',
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
