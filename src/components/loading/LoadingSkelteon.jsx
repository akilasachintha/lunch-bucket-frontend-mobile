import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';

const AnimatedLoadingSpinner = () => {
    const circleAnimatedValue = useRef(new Animated.Value(0)).current;

    const circleAnimated = () => {
        circleAnimatedValue.setValue(0);
        Animated.timing(circleAnimatedValue, {
            toValue: 1,
            duration: 800,
            useNativeDriver: false,
        }).start(() => {
            setTimeout(() => {
                circleAnimated();
            }, 1000);
        });
    };

    useEffect(() => {
        circleAnimated();
    }, []);

    const translateX2 = circleAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-50, 500],
    });

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.cardView}>
                    <View style={styles.animationBulk}>
                        <Animated.View style={styles.animationBackground}>
                            <Animated.View style={[styles.animationTop, {transform: [{translateX: translateX2}]}]}/>
                        </Animated.View>

                        <Animated.View style={styles.animationBackground2}>
                            <Animated.View style={[styles.animationTop, {transform: [{translateX: translateX2}]}]}/>
                        </Animated.View>
                        <Animated.View style={styles.animationBackground2}>
                            <Animated.View style={[styles.animationTop, {transform: [{translateX: translateX2}]}]}/>
                        </Animated.View>
                        <Animated.View style={styles.animationBackground2}>
                            <Animated.View style={[styles.animationTop, {transform: [{translateX: translateX2}]}]}/>
                        </Animated.View>
                    </View>
                    <View style={styles.animationBulk}>
                        <Animated.View style={styles.animationBackground}>
                            <Animated.View style={[styles.animationTop, {transform: [{translateX: translateX2}]}]}/>
                        </Animated.View>

                        <Animated.View style={styles.animationBackground2}>
                            <Animated.View style={[styles.animationTop, {transform: [{translateX: translateX2}]}]}/>
                        </Animated.View>
                        <Animated.View style={styles.animationBackground2}>
                            <Animated.View style={[styles.animationTop, {transform: [{translateX: translateX2}]}]}/>
                        </Animated.View>
                    </View>
                    <View style={styles.animationBulk}>
                        <Animated.View style={styles.animationBackground}>
                            <Animated.View style={[styles.animationTop, {transform: [{translateX: translateX2}]}]}/>
                        </Animated.View>

                        <Animated.View style={styles.animationBackground2}>
                            <Animated.View style={[styles.animationTop, {transform: [{translateX: translateX2}]}]}/>
                        </Animated.View>
                        <Animated.View style={styles.animationBackground2}>
                            <Animated.View style={[styles.animationTop, {transform: [{translateX: translateX2}]}]}/>
                        </Animated.View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingTop: 14,
        paddingBottom: 24,
        paddingHorizontal: 24,
    },
    card: {
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.1,
        flexDirection: 'row',
    },
    animationBulk: {
        marginTop: 10,
    },
    cardView: {
        flex: 1,
        justifyContent: 'space-evenly',
        overflow: 'hidden',
    },
    animationBackground: {
        backgroundColor: '#ECEFF1',
        height: 60,
        borderRadius: 10,
        marginBottom: 10,
    },
    animationBackground2: {
        backgroundColor: '#ECEFF1',
        opacity: 0.5,
        height: 30,
        borderRadius: 10,
        marginBottom: 10,
    },
    animationTop: {
        width: '10%',
        height: '100%',
        backgroundColor: 'white',
        opacity: 0.5,
    },
});

export default AnimatedLoadingSpinner;
