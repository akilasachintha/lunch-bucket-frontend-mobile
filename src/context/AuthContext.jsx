import React, {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const AuthContext = createContext(undefined);

export const AuthProvider = ({children}) => {
    const [loginState, setLoginState] = useState(null);
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [token, setToken] = useState(null);
    const [deviceToken, setDeviceToken] = useState(null);
    const navigation = useNavigation();

    const loadUserData = async () => {
        try {
            const savedUser = await AsyncStorage.getItem('user');
            const savedToken = await AsyncStorage.getItem('token');
            const savedDeviceToken = await AsyncStorage.getItem('deviceToken');
            const savedLoginState = await AsyncStorage.getItem('loginState');

            if (savedToken) {
                setToken(JSON.parse(savedToken));
            }

            if (savedDeviceToken) {
                setDeviceToken(JSON.parse(savedDeviceToken));
            }

            if (savedUser) {
                setUser(JSON.parse(savedUser));
            }

            if (savedLoginState) {
                setLoginState(JSON.parse(savedLoginState));
            }
        } catch (error) {
            console.error('Error loading user data:', error);
        }
    };

    useEffect(() => {
        loadUserData().catch((e) => console.error(e));
    }, []);

    const login = async (data) => {
        try {
            await AsyncStorage.setItem('token', JSON.stringify(data.token));
            await AsyncStorage.setItem('deviceToken', JSON.stringify((data.deviceToken) ? data.device_token : ''));
            await AsyncStorage.setItem('role', JSON.stringify(data.type));
            await AsyncStorage.setItem('loginState', JSON.stringify(true));

            setUser({role: data.type, id: data.id});
            setRole(data.type);
            setToken(data.token);
            setDeviceToken(data.device_token);
            setLoginState(true);
        } catch (error) {
            console.error('Error saving user data:', error);
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('deviceToken');
            await AsyncStorage.removeItem('user');
            await AsyncStorage.removeItem('loginState');
            setUser(null);
            setToken(null);
            setDeviceToken(null);
            setLoginState(null);

            navigation.reset({
                index: 0,
                routes: [
                    {
                        // @ts-ignore
                        name: 'Login',
                    },
                ],
            });
        } catch (error) {
            console.error('Error clearing user data:', error);
        }
    };

    const authContextValue = {
        user,
        loginState,
        token,
        deviceToken,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
