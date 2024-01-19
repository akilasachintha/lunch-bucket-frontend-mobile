import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import DynamicTopBar from '../../components/topBar/DynamicTopBar';
import {SelectedTab} from '../../helpers/enums/enums';
import TopHeader from '../../components/topHeader/TopHeader';

export default function ContactDetailsScreen() {
    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <DynamicTopBar selectedTab={SelectedTab.PROFILE}/>
            <TopHeader headerText="Contact Details" backButtonPath="Settings"/>
            <View style={styles.bodyContainer}>
                <ScrollView style={styles.scrollViewStyle}>
                    <View style={styles.contentContainer}>
                        <Text style={styles.header}>📧 Email</Text>
                        <Text style={styles.info}>lunchbucketofficial@gmail.com</Text>

                        <Text style={styles.header}>📞 Phone Number</Text>
                        <Text style={styles.info}>0777169791</Text>

                        <Text style={styles.header}>⏰ Service Hours</Text>
                        <Text style={styles.info}>24/7 Customer Support</Text>

                        <Text style={styles.header}>📌 General Guidelines</Text>
                        <Text style={styles.info}>- Please mention your order ID when making inquiries.</Text>
                        <Text style={styles.info}>- For immediate assistance, calling our phone number is
                            recommended.</Text>
                        <Text style={styles.info}>- Email responses may take up to 24 hours.</Text>
                        <Text style={styles.info}>- For detailed queries, emailing us is preferred.</Text>
                        <Text style={styles.info}>- Keep your user code handy for quicker service.</Text>
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
