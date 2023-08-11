import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import TextInputField from '../components/inputField/TextInputField';
import BottomButton from '../components/buttons/BottomButton';
import {getUserDetailsService} from '../services/userProfileService';
import {log} from '../helpers/logs/log';
import {logoutService} from '../services/authService';
import {dynamicFont} from '../helpers/responsive/fontScale';
import DynamicTopBar from '../components/topBar/DynamicTopBar';
import {SelectedTab} from '../helpers/enums/enums';
import TopHeader from "../components/topHeader/TopHeader";

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
});

export default function ProfileScreen() {
    const navigation = useNavigation();
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const initialValues = {
        email: '',
    };

    const handleSubmit = async (values, actions, {resetForm}) => {
        navigation.navigate('Checkout');
        resetForm();
    };

    const handleLogout = async () => {
        await logoutService();
        navigation.navigate('Initial');
    };

    const fetchUserData = async () => {
        try {
            const result = await getUserDetailsService();
            setUserData(result);
            setIsLoading(false); // Set loading to false when data is fetched
            log('info', 'screen', 'ProfileScreen | result', result, 'ProfileScreen.js');
        } catch (error) {
            setIsLoading(false); // Set loading to false on error as well
            log('error', 'screen', 'ProfileScreen', error.message, 'ProfileScreen.js');
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const fields = [
        {name: 'email', label: 'Email', placeholder: userData?.user?.email},
        {name: 'id', label: 'Id', placeholder: userData?.user?.id},
        {name: 'contactNo', label: 'Contact', placeholder: userData?.user?.contactNo},
    ];

    if (isLoading) {
        return (
            <SafeAreaView style={styles.safeAreaContainer}>
                <DynamicTopBar selectedTab={SelectedTab.PROFILE}/>
                <TopHeader headerText="Profile" backButtonPath="Menu"/>
                <View style={styles.bodyContainer}>
                    <View style={styles.fieldHeaderContainer}>
                        <Text style={styles.fieldHeaderContainerText}>Personal Details</Text>
                    </View>
                    <ActivityIndicator size="large" color="#ce6d74" style={styles.activityIndicator}/>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <DynamicTopBar selectedTab={SelectedTab.PROFILE}/>
            <TopHeader headerText="Profile" backButtonPath="Menu"/>
            <View style={styles.bodyContainer}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({values, handleChange, errors, setFieldTouched, touched, handleSubmit}) => (
                        <View style={styles.formikContainer}>
                            <ScrollView style={styles.scrollViewContainer}>
                                <View style={styles.fieldHeaderContainer}>
                                    <Text style={styles.fieldHeaderContainerText}>Personal Details</Text>
                                </View>
                                {fields &&
                                    fields.map((field) => (
                                        <TextInputField
                                            key={field.name}
                                            label={field.label}
                                            placeholder={field.placeholder}
                                            placeholderTextColor="#ce6d74"
                                            value={values[field.name]}
                                            onChangeText={handleChange(field.name)}
                                            onBlur={() => setFieldTouched(field.name)}
                                            touched={touched[field.name]}
                                            error={errors[field.name]}
                                            editable={false}
                                        />
                                    ))}
                            </ScrollView>
                            {/* <BottomButton onPress={handleSubmit} buttonText="Done" /> */}
                            <BottomButton onPress={handleLogout} buttonText="Logout"/>
                        </View>
                    )}
                </Formik>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    bodyContainer: {
        flex: 10,
    },
    formikContainer: {
        flex: 1,
    },
    scrollViewContainer: {
        marginBottom: 20,
    },
    fieldHeaderContainer: {
        marginHorizontal: 30,
        marginVertical: 20,
    },
    fieldHeaderContainerText: {
        fontSize: dynamicFont(14),
        color: '#630A10',
        fontWeight: 'bold',
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
