import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import DynamicTopBar from '../../components/topBar/DynamicTopBar';
import {SelectedTab} from '../../helpers/enums/enums';
import TopHeader from '../../components/topHeader/TopHeader';

export default function OrderingDetailsScreen() {
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <DynamicTopBar selectedTab={SelectedTab.PROFILE}/>
            <TopHeader headerText="Order Details" backButtonPath="Settings"/>
            <ScrollView style={styles.scrollViewStyle}
                        showsVerticalScrollIndicator={false}
            >
                <View style={styles.contentContainer}>
                    <Text style={styles.header}>📋 How to Order</Text>
                    <Text style={styles.step}>🔍 1. Browse through our daily menu.</Text>
                    <Text style={styles.step}>🍽️ 2. Select food for a meal or choose a special meal.</Text>
                    <Text style={styles.step}>💳 3. Proceed to checkout.</Text>
                    <Text style={styles.step}>🍲 4. Order any number of meals in one transaction.</Text>
                    <Text style={styles.info}>🕔 Lunch orders: 5 pm to 11 am (subject to availability).</Text>
                    <Text style={styles.info}>🌙 Dinner orders: 11 am to 5 pm (subject to availability).</Text>

                    <Text style={styles.headerBottom}>🔎 Order History</Text>
                    <Text style={styles.info}>Check your 'Order History' for:</Text>
                    <Text style={styles.subInfo}>- ⏰ Delivery time and location</Text>
                    <Text style={styles.subInfo}>- 💰 Price details</Text>
                    <Text style={styles.subInfo}>- 🆔 Packet code</Text>
                    <Text style={styles.subInfo}>- 📍 Specific delivery place</Text>

                    <Text style={styles.importantInfo}>📦 Each packet has a unique order code; verify this code when collecting your order.</Text>
                    <Text style={styles.importantInfo}>👤 Keep your unique user code handy when collecting your order.</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollViewStyle: {
        marginHorizontal: 20,
    },
    contentContainer: {
        marginVertical: 20,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    headerBottom: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 15,
        color: '#333',
    },
    step: {
        fontSize: 16,
        marginBottom: 10,
        lineHeight: 24,
        color: '#555',
    },
    info: {
        fontSize: 14,
        marginTop: 5,
        color: '#666',
    },
    subInfo: {
        fontSize: 14,
        marginLeft: 20,
        marginBottom: 5,
    },
    importantInfo: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        color: '#444',
        backgroundColor: '#eef',
        padding: 10,
        borderRadius: 5,
    },
});
