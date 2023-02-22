import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

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
        flex: 1.2,
        backgroundColor: '#630A10',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },
    bottomTextContainer: {
        flex: 1,
        paddingVertical: 0,
        paddingHorizontal: 20,
        paddingBottom: 0,
        marginTop: 0,
        marginRight: 0,
        marginLeft: 0,
        borderRadius: 0,
    },
    bottomText: {
        paddingHorizontal: 30,
        paddingVertical: 50,
    },
    headerText: {
        color: '#630A10',
        fontSize: 36,
        fontWeight: 'bold',
    },
    contentText: {
        marginTop: 30,
        color: '#630A10',
        fontSize: 18,
    },
    headerImageImage: {
        top: 20,
        height: 400,
        width: 400,
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
        fontSize: 18,
    }
});