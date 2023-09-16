import React, {useContext, useEffect, useRef} from 'react';
import {Animated, StyleSheet, Text} from 'react-native';
import Constants from "expo-constants/src/Constants";

const ToastContext = React.createContext(undefined, undefined);

export const ToastProvider = ({children}) => {
    const [toastMessage, setToastMessage] = React.useState("");

    const showToast = (type, message) => {
        setToastMessage({type, message});
    };

    const hideToast = () => {
        setToastMessage(null);
    };

    useEffect(() => {
        if (toastMessage) {
            const timer = setTimeout(() => {
                hideToast();
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [toastMessage]);

    return (
        <ToastContext.Provider value={{showToast, hideToast}}>
            {children}
            {toastMessage ?
                <Toast {...toastMessage} />
                : null}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

const Toast = ({type, message}) => {
    const backgroundColor = type === 'warning'
        ? 'rgba(255, 230, 98, 1)'
        : type === 'error'
            ? '#fd4949'
            : type === 'success'
                ? '#81c784'
                : '#f06292';

    const translateY = useRef(new Animated.Value(-100)).current;

    useEffect(() => {
        Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
        }).start();

        const timer = setTimeout(() => {
            Animated.timing(translateY, {
                toValue: -100,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }, 2000); // Adjust the delay before hiding the toast as per your requirement (in milliseconds)

        return () => clearTimeout(timer);
    }, [translateY]);

    return (
        <Animated.View style={[styles.container, {backgroundColor, transform: [{translateY}]}]}>
            <Text style={styles.text}>{message}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        width: '100%',
        paddingHorizontal: 20,
        zIndex: 9999,
    },
    text: {
        color: 'white',
        fontSize: 14,
        textAlign: 'center',
        paddingTop: Constants.statusBarHeight,
        paddingBottom: "4%",
    },
});

export default Toast;
