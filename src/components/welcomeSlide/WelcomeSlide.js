import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {dynamicFont} from "../../helpers/responsive/fontScale";

const WelcomeSlide = ({ imagePath, headerText, contentText, buttonText, onPress }) => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerImage}>
                <Image style={styles.headerImageImage} source={imagePath} />
            </View>
            <View style={styles.bottomTextContainer}>
                <View style={styles.bottomText}>
                    <Text style={styles.headerText}>{headerText}</Text>
                    <Text style={styles.contentText}>{contentText}</Text>
                </View>
                {buttonText && (
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={onPress}>
                            <View style={styles.getStartedButtonTextContainer}>
                                <Text style={styles.buttonText}>{buttonText}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                )}
            </View>
        </View>
    );
};

export default WelcomeSlide;

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#fff',
        flex: 1,
    },
    headerImage: {
        flex: 1,
        backgroundColor: '#630A10',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },
    bottomTextContainer: {
        flex: 1,
        paddingHorizontal: "5%",
    },
    bottomText: {
        paddingHorizontal: "8%",
        paddingVertical: "10%",
    },
    headerText: {
        color: '#630A10',
        fontSize: dynamicFont(20),
        fontWeight: 'bold',
    },
    contentText: {
        marginTop: "5%",
        color: '#630A10',
        fontSize: dynamicFont(12),
    },
    headerImageImage: {
        top: 20,
        height: "90%",
        width: "95%",
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 20,
        marginTop: 20,
    },
    getStartedButtonTextContainer: {
        paddingHorizontal: 60,
        paddingVertical: 10,
        borderRadius: 30,
        borderStyle: 'solid',
        borderWidth: 3,
        borderColor: '#630A10',
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#630A10',
        textAlign: "center",
        fontSize: dynamicFont(10),
    }
});