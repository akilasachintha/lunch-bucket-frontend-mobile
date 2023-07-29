import TopHeader from "../components/topHeader/TopHeader";
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {Formik} from 'formik';
import * as Yup from 'yup';
import TextInputField from "../components/inputField/TextInputField";
import StaticTopBar from "../components/topBar/StaticTopBar";
import BottomButton from "../components/buttons/BottomButton";
import {useEffect, useState} from "react";
import {getUserDetailsService} from "../services/userProfileService";
import {log} from "../helpers/logs/log";
import {logoutService} from "../services/authService";

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
});

export default function ProfileScreen() {
    const navigation = useNavigation();
    const [userData, setUserData] = useState({});

    const initialValues = {
        email: '',
    };

    const handleSubmit = async (values, actions, {resetForm}) => {
        navigation.navigate('Checkout');
        resetForm();
    };

    const handleLogout = async () => {
        await logoutService();
        navigation.navigate('Welcome');
    }

    const fetchUserData = async () => {
        const result = await getUserDetailsService();
        setUserData(result);
        log("info", "screen", "ProfileScreen | result", result, "ProfileScreen.js");
    }


    useEffect(() => {
        fetchUserData().catch(
            (error) => {
                log("error", "screen", "ProfileScreen", error.message, "ProfileScreen.js");
            }
        );
    }, []);

    const fields = [
        {name: 'email', label: 'Email', placeholder: userData && userData.user && userData.user.email,},
    ];

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <StaticTopBar/>
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
                                {fields && fields.map((field) => (
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
                                    />
                                ))}
                            </ScrollView>
                            {/*<BottomButton onPress={handleSubmit} buttonText="Done"/>*/}
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
        fontSize: 18,
        color: '#630A10',
        fontWeight: 'bold',
    },
});