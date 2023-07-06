import React from 'react';
import {Image, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PATHS from "../../helpers/paths/paths";

export default function TodayWinnerModal({isVisible, setIsVisible}) {

    return (
        <View style={styles.container}>
            <Modal visible={isVisible} transparent>
                <TouchableOpacity
                    style={styles.background}
                    onPress={() => setIsVisible(false)}
                >
                    <View style={styles.modal}>
                        <View style={styles.modalTopTextContainer}>
                            <Text style={styles.modalTopText}>Today’s winner!</Text>
                        </View>
                        <View style={styles.imageContainer}>
                            <Image
                                source={PATHS.winners}
                                style={styles.imageStyles}
                            />
                        </View>
                        <View style={styles.bottomTextContainer}>
                            <Text style={styles.bottomText}>
                                <Text style={styles.userText}>user123</Text> won {'\n'}
                                <Text style={styles.itemText}>2 medium pizzas</Text> {'\n'}
                                <Text>by ordering the highest number of meals today.</Text>
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flex: 1,
        zIndex: 1,
    },
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    },
    modalTopTextContainer: {
        marginTop: 10,
        marginBottom: 5,
    },
    modalTopText: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#630A10',
    },
    imageContainer: {
        alignItems: 'center',
    },
    imageStyles: {},
    bottomTextContainer: {
        marginVertical: 10,
        marginHorizontal: 40,
    },
    bottomText: {
        textAlign: 'center',
        fontSize: 17,
        color: '#636363'
    },
    userText: {
        fontWeight: 'bold',
        color: '#630A10',
    },
    itemText: {
        fontWeight: 'bold',
        color: '#630A10',
    },
});

