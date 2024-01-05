import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import DynamicTopBar from '../../components/topBar/DynamicTopBar';
import {SelectedTab} from '../../helpers/enums/enums';
import TopHeader from '../../components/topHeader/TopHeader';

export default function DeliveryDetailsScreen() {
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <DynamicTopBar selectedTab={SelectedTab.PROFILE}/>
            <TopHeader headerText="Lunchbucket Details" backButtonPath="Settings"/>
            <View style={styles.bodyContainer}>
                <ScrollView style={styles.scrollViewStyle}>
                    <View style={styles.contentContainer}>
                        <Text style={styles.header}>🍴 Lunch Delivery Schedule</Text>
                        <Text style={styles.info}>5pm - 7am: Place order, receive at 11am or 12pm</Text>
                        <Text style={styles.info}>7am - 9am: Place order, receive at 12:30pm</Text>
                        <Text style={styles.info}>9am - 10am: Place order, receive at 1:30pm</Text>
                        <Text style={styles.info}>10am - 11am: Place order, receive at 2pm</Text>

                        <Text style={styles.header}>🌙 Dinner Delivery Schedule</Text>
                        <Text style={styles.info}>11am - 3pm: Place order, receive at 7pm</Text>
                        <Text style={styles.info}>3pm - 4pm: Place order, receive at 8pm</Text>
                        <Text style={styles.info}>4pm - 5pm: Place order, receive at 8:30pm</Text>
                    </View>
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
        flex: 10
    },
    scrollViewStyle: {
        marginHorizontal: 20,
    },
    contentContainer: {
        marginVertical: 20,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    info: {
        fontSize: 14,
        marginTop: 5,
        color: '#666',
        marginBottom: 10,
    },
});
