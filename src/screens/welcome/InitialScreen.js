import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Animated, Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useFocusEffect, useIsFocused, useNavigation} from '@react-navigation/native';
import PATHS from '../../helpers/paths/paths';
import {StatusBar} from 'expo-status-bar';
import {addDataToLocalStorage, getDataFromLocalStorage} from '../../helpers/storage/asyncStorage';
import {lunchBucketAPI} from "../../apis/lunchBucketAPI";
import {getCelebrationService} from "../../services/celebrationService";
import {log} from "../../helpers/logs/log";

const InitialScreen = () => {
    const [devEnv, setDevEnv] = useState(false);
    const [isCelebration, setIsCelebration] = useState(false);
    const slideAnim = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const fetchCelebrationData = async () => {
        try {
            const result = await getCelebrationService();
            console.log("API Response - isCelebration:", result);
            setIsCelebration(result);
        } catch (error) {
            log("error", "controller", "fetchCelebrationData", error.message, "InitialScreen.js");
            setIsCelebration(false);
        }
    }

    async function fetchData() {
        const token = await getDataFromLocalStorage('token');

        if (token) {
            await lunchBucketAPI.get('dinner/invokeSuitabilities', {
                headers: {
                    'token': token,
                }
            });

            await lunchBucketAPI.get('lunch/invokeSuitabilities', {
                headers: {
                    'token': token,
                }
            });
        }
    }

    const checkIfVisited = async () => {
        try {
            let visited = await getDataFromLocalStorage('@visited');
            if (!visited) visited = 'false';

            let loginStatus = await getDataFromLocalStorage('loginStatus');

            console.log("visited", visited);

            if (isFocused) {
                Animated.timing(slideAnim, {
                    toValue: 1,
                    duration: 6000,
                    useNativeDriver: false,
                }).start();

                if (visited === 'true') {
                    setTimeout(() => {
                        slideAnim.setValue(0);

                        console.log("isCelebration", isCelebration);
                        if (isCelebration) {
                            navigation.navigate('Celebration');
                        } else if (!isCelebration) {
                            if (loginStatus === 'true') {
                                navigation.navigate('Menu');
                            } else {
                                navigation.navigate('Login');
                            }
                        }
                    }, 7000);
                } else if(visited === 'false') {
                    setTimeout(() => {
                        slideAnim.setValue(0);

                        navigation.navigate('Welcome');
                    }, 7000);
                }
            }
        } catch (error) {
            await addDataToLocalStorage('@visited', 'false');
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCelebrationData().catch(console.error);
    }, [isCelebration]);

    useFocusEffect(
        useCallback(() => {
            if (process.env.NODE_ENV === "development") {
                setDevEnv(true);
            }

            fetchCelebrationData().catch(console.error);
            fetchData().catch(console.error);
            checkIfVisited().catch(console.error);
        }, [isFocused, isCelebration])
    );

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <StatusBar style=""/>
            <View style={styles.titleContainer}>
                <Image source={PATHS.logo} style={styles.logo}/>
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
                                        outputRange: [-60, 350],
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
                    Meal Supplier You Can Trust.
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
    logo: {
        width: "100%",
        height: "100%",
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
        marginVertical: 10,
        marginTop: 100,
    },
    titleText: {
        fontSize: 24,
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
        fontSize: 14,
        textAlign: 'center',
        color: '#630A10',
    },
});

export default InitialScreen;
