import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import PATHS from "../../common/paths/paths";

const PromotionCard = ({promotion}) => {
    const navigation = useNavigation();
    const handlePress = () => {
        navigation.navigate('PromotionDetails', {promotion});
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.cardItemContainer}>
                <Image
                    source={PATHS.promotion}
                    style={styles.promotionImageContainer}
                />
            </View>
            <View style={styles.promotionTextContainer}>
                <Text style={styles.promotionText}>Grab Now!</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardItemContainer: {
        flex: 1,
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 20,
        height: 150,
        alignItems: 'center',
    },
    promotionImageContainer: {
        flex: 1,
        borderRadius: 20,
        width: '100%',
    },
    promotionTextContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFE662',
        marginVertical: 10,
        marginHorizontal: 20,
        padding: 10,
        borderRadius: 20,
    },
    promotionText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#630A10',
    },
});

export default PromotionCard;
