import React, {useCallback, useEffect, useRef} from 'react';
import {Animated, Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import PATHS from '../../helpers/paths/paths';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InitialScreen = () => {
    const slideAnim = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();

    const navigateToWelcomeScreen = useCallback(() => {
        navigation.navigate('Welcome');
    }, [navigation]);

    const navigateToLoginScreen = useCallback(() => {
        navigation.navigate('Login');
    }, [navigation]);

    useEffect(() => {
        const checkIfVisited = async () => {
            try {
                const visited = await AsyncStorage.getItem('@visited');

                Animated.timing(slideAnim, {
                    toValue: 1,
                    duration: 6000,
                    useNativeDriver: true,
                }).start();

                if (visited) {
                    setTimeout(navigateToLoginScreen, 7000);
                } else {
                    await AsyncStorage.setItem('@visited', 'true');
                    setTimeout(navigateToWelcomeScreen, 7000);
                }
            } catch (error) {
                console.error(error);
            }
        }
        checkIfVisited().catch(console.error);
    }, []);

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Lunch Bucket</Text>
            </View>
            <View style={styles.imagesContainer}>
                <View style={styles.phoneImageContainer}>
                    <Image source={PATHS.phone} style={styles.phoneImageStyles}/>
                </View>
                <View style={styles.cupImageContainer}>
                    <Image source={PATHS.cup} style={styles.cupImageStyles}/>
                </View>
                <View style={styles.animationContainer}>
                    <Animated.Image
                        style={{
                            zIndex: 2,
                            marginTop: 150,
                            transform: [
                                {
                                    translateX: slideAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [-50, 350],
                                    }),
                                },
                            ],
                        }}
                        source={PATHS.bike}
                    />
                </View>
            </View>
            <View style={styles.bottomTextContainer}>
                <Text style={styles.bottomText}>
                    Lorem ipsum dolor sit amet, consecrate disciplining elite. Done
                </Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: '#FCF0C8',
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginVertical: 10,
        marginTop: 50,
    },
    titleText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#7E1F24',
    },
    imagesContainer: {
        position: 'relative',
        flex: 3,
        justifyContent: 'center',
        marginTop: 50,
    },
    animationContainer: {
        position: 'absolute',
    },
    cupImageContainer: {
        position: 'absolute',
    },
    cupImageStyles: {
        zIndex: 1,
        top: 40,
        left: 50,
    },
    phoneImageStyles: {
        zIndex: 0,
        left: 200,
        top: 12,
    },
    phoneImageContainer: {
        position: 'absolute',
    },
    bottomTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 60,
        marginBottom: 60,
        flex: 1,
    },
    bottomText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#630A10',
    },
});

export default InitialScreen;
