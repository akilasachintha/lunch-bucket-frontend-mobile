import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import TopBar from "../topBar/TopBar";
import TopHeader from "../topHeader/TopHeader";
import PATHS from "../../common/paths/paths";

const PromotionDetails = ({route}) => {
    const {promotion} = route.params;

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <TopBar/>
            <View style={styles.container}>
                <TopHeader headerText={"Promotion " + promotion.id} backButtonPath="Promotion"/>
                <View style={styles.bodyContainer}>
                    <View style={styles.promotionTitle}>
                        <Text style={styles.promotionTitleText}>{promotion.title}</Text>
                    </View>
                    <View style={styles.promotionBodyContainer}>
                        <View style={styles.promotionImageContainer}>
                            <Image
                                source={PATHS.promotion}
                                style={styles.promotionImage}
                            />
                        </View>
                        <View>
                            <Text style={styles.promotionDescription}>{promotion.description}</Text>
                        </View>
                        <View>
                            <Text style={styles.validityText}>{promotion.description}</Text>
                        </View>
                    </View>
                    <View style={styles.viewItemContainer}>
                        <TouchableOpacity
                            style={styles.viewItemContainerTextContainer}
                        >
                            <Text style={styles.viewItemContainerText}> Place Order </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 10,
    },
    bodyContainer: {
        paddingTop: 20,
        flex: 9,
        justifyContent: 'center',
    },
    promotionTitle: {
        flex: 1,
        backgroundColor: '#FDF7E3',
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 30,
        justifyContent: 'center',
    },
    promotionTitleText: {
        fontSize: 18,
        color: '#630A10',
    },
    promotionBodyContainer: {
        flex: 15,
        marginVertical: 30,
        marginHorizontal: 50,
    },
    promotionImageContainer: {
        alignItems: 'center',
    },
    promotionImage: {},
    promotionDescription: {
        fontSize: 18,
        marginVertical: 50,
        textAlign: 'center',
    },
    validityText: {
        fontSize: 16,
        marginVertical: 80,
        color: '#7C7C7C',
        textAlign: 'center',
    },
    viewItemContainer: {
        backgroundColor: 'rgba(255, 230, 98, 1)',
        paddingVertical: 20,
        flexDirection: 'row',
    },
    viewItemContainerTextContainer: {
        alignItems: 'center',
        flex: 1,
    },
    viewItemContainerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#630A10',
    },
});

export default PromotionDetails;
