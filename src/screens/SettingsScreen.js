import React from 'react';
import {ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DynamicTopBar from '../components/topBar/DynamicTopBar';
import {SelectedTab} from '../helpers/enums/enums';
import TopHeader from "../components/topHeader/TopHeader";
import PATHS from "../helpers/paths/paths";

const tileData = [
    {title: 'Ordering', source: PATHS.ordering, navigateTo: 'OrderingDetails'},
    {title: 'Payment', source: PATHS.payment, navigateTo: 'PaymentDetails'},
    {title: 'Delivery', source: PATHS.delivery, navigateTo: 'DeliveryDetails'},
    {title: 'Contact Us', source: PATHS.contact, navigateTo: 'ContactDetails'},
    {title: 'Feedback', source: PATHS.feedback, navigateTo: 'FeedbackDetails', disabled: true},
    {title: 'Promotions', source: PATHS.promotion, navigateTo: 'PromotionsDetails', disabled: true},
];

export default function SettingsScreen({navigation}) {
    const handlePress = (screen, disabled) => {
        if (!disabled) {
            navigation.navigate(screen);
        }
    };

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <DynamicTopBar selectedTab={SelectedTab.PROFILE}/>
            <TopHeader headerText="Privacy and Settings" backButtonPath="Profile"/>
            <View style={styles.bodyContainer}>
                <ScrollView
                    contentContainerStyle={{flexGrow: 1}}
                    showsVerticalScrollIndicator={false}
                >
                    {tileData.map((tile, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.tile, tile.disabled ? styles.tileDisabled : null]}
                            onPress={() => handlePress(tile.navigateTo, tile.disabled)}
                            disabled={tile.disabled}
                        >
                            <ImageBackground
                                source={tile.source}
                                style={styles.backgroundImage}
                                resizeMode='cover'
                            >
                                <View style={styles.overlay}>
                                    <Text style={[styles.tileText, tile.disabled ? styles.textDisabled : null]}>
                                        {tile.title}
                                    </Text>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
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
        flex: 10,
    },
    tile: {
        flex: 1,
        margin: 10,
        borderRadius: 10,
        overflow: 'hidden',
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        justifyContent: 'center',
        alignItems: 'center',
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    tileText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#fff',
        padding: 10,
        width: '50%',
        borderRadius: 10,
    },
    tileDisabled: {
        opacity: 0.5,
    },
    textDisabled: {
        color: '#a0a0a0',
    },
});
