import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import InitialScreen from "./InitialScreen";

const SplashScreen = ({onFinish}) => {
    useEffect(() => {
        const splashTimer = setTimeout(() => {
            onFinish();
        }, 3000);

        return () => clearTimeout(splashTimer);
    }, [onFinish]);

    return (
        <View>
            <Text>SplashScreen</Text>
        </View>
    );
};

export default SplashScreen;
