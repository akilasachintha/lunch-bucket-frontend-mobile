import React, {useRef} from 'react';
import {Animated, Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useFocusEffect, useIsFocused, useNavigation} from '@react-navigation/native';
import PATHS from '../../helpers/paths/paths';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StatusBar} from 'expo-status-bar';
import {getDataFromLocalStorage} from '../../helpers/storage/asyncStorage';
import {dynamicFont} from "../../helpers/responsive/fontScale";

const InitialScreen = () => {
    const slideAnim = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    useFocusEffect(
        React.useCallback(() => {
            const checkIfVisited = async () => {
                try {
                    const visited = await AsyncStorage.getItem('@visited');
                    let loginStatus = await getDataFromLocalStorage('loginStatus');

                    if (isFocused) {
                        Animated.timing(slideAnim, {
                            toValue: 1,
                            duration: 6000,
                            useNativeDriver: true,
                        }).start();

                        if (visited) {
                            setTimeout(() => {
                                slideAnim.setValue(0);
                                if (loginStatus === 'true') {
                                    navigation.navigate('Menu');
                                } else {
                                    navigation.navigate('Login');
                                }
                            }, 7000);
                        } else {
                            await AsyncStorage.setItem('@visited', 'true');
                            setTimeout(() => {
                                slideAnim.setValue(0);
                                navigation.navigate('Welcome');
                            }, 7000);
                        }
                    }
                } catch (error) {
                    console.error(error);
                }
            };
            checkIfVisited().catch(console.error);
        }, [isFocused])
    );

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <StatusBar style=""/>
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
                    Meal Supplier You Can Trust. It's all about your meal. Your Meal Matters Us
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
        fontSize: dynamicFont(24),
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
        fontSize: dynamicFont(12),
        textAlign: 'center',
        color: '#630A10',
    },
});

export default InitialScreen;
