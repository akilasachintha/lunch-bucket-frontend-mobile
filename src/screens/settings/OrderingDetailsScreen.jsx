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
                    <Text style={styles.headerBottom}>📋 Ordering Timing</Text>
                    <Text style={styles.subInfo}>⏰ Please lunch orders between 5 PM and 11 AM, subject to
                        availability.</Text>
                    <Text style={styles.subInfo}>🍽️ Dinner orders are accepted from 11 AM to 5 PM, based on
                        availability.</Text>

                    <Text style={styles.headerBottom}>📋 Meal Section</Text>
                    <Text style={styles.subInfo}>🔍 Explore our daily menu.</Text>
                    <Text style={styles.subInfo}>🍽️ Choose either a regular meal or opt for a special.</Text>
                    <Text style={styles.subInfo}>💳 For main meal, select four food items and include one rice
                        item.</Text>

                    <Text style={styles.headerBottom}>🔎 Adding to Basket</Text>
                    <Text style={styles.subInfo}>- ⏰ Add your chosen meal items to the basket.</Text>
                    <Text style={styles.subInfo}>- 💰 Update the basket to order multiple meals in one go.</Text>
                    <Text style={styles.subInfo}>- 🆔 Proceed order.</Text>

                    <Text style={styles.headerBottom}>💰 Point Redemption</Text>
                    <Text style={styles.subInfo}>- ⏰ Cash in points for money if you have more than 100
                        points.</Text>

                    <Text style={styles.headerBottom}>💰 Order Details</Text>
                    <Text style={styles.subInfo}>- ⏰ Check 'Your Orders'. for</Text>
                    <Text style={styles.info}>📦 Meal Type</Text>
                    <Text style={styles.info}>📦 Payable Amount</Text>
                    <Text style={styles.info}>📦 Delivery Time and Location</Text>
                    <Text style={styles.info}>📦 Packet code</Text>

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
