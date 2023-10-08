import React, {useState} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import STRINGS from '../../helpers/strings/strings';
import PATHS from '../../helpers/paths/paths';
import {Formik} from 'formik';
import * as Yup from 'yup';
import FormSubmitButton from '../../components/form/FormSubmitButton';
import FormFields from '../../components/form/FormFields';
import {registerService} from '../../services/useAuthService';
import {useToast} from '../../helpers/toast/Toast';
import {log} from '../../helpers/logs/log';
import {StatusBar} from 'expo-status-bar';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
            'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character'
        )
        .required('Password is required'),
    confirmPassword: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
    contactNo: Yup.string()
        .required('Contact No is required')
        .matches(/^[0-9]{10}$/, 'Contact No must be exactly 10 digits and start with 0'),
});

const fields = [
    {placeholder: STRINGS.email, name: 'email', required: true},
    {placeholder: 'Contact No', name: 'contactNo', required: true, secureTextEntry: false},
    {placeholder: STRINGS.password, name: 'password', required: true, secureTextEntry: true, isEyeEnabled: true},
    {
        placeholder: STRINGS.confirmPassword,
        name: 'confirmPassword',
        required: true,
        secureTextEntry: true,
        isEyeEnabled: true,
    },
];

export default function SignUp({navigation}) {
    const [isPressed, setIsPressed] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [, setToastMessage] = useState(null);
    const {showToast} = useToast();

    const initialValues = {
        email: '',
        contactNo: '',
        password: '',
        confirmPassword: '',
    };

    const handleSubmit = async (values, actions) => {
        if (isSubmitting) {
            return;
        }

        setIsSubmitting(true);
        setIsLoading(true);

        try {
            const result = await registerService(values.email, values.password, values.contactNo);
            if (result === 'success') {
                showToast('success', 'Successfully Registered.');
                actions.resetForm();
                navigation.navigate('Login');
            } else {
                showToast('error', 'You are Already Registered');
                log('error', 'Login', 'handleSubmit', 'User already Registered.', 'SignUp.js');
            }
        } catch (error) {
            setToastMessage('Login Failed');
            log('error', 'Login', 'handleSubmit', error.message, 'SignUp.js');
        } finally {
            actions.setSubmitting(false);
            setIsSubmitting(false);
            setIsLoading(false);
        }
    };

    const handlePressIn = () => {
        setIsPressed(true);
    };

    const handlePressOut = () => {
        setIsPressed(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style=""/>
            <View style={styles.mainContainer}>
                <View style={styles.headerContainer}>
                    <Image style={styles.headerImage} source={PATHS.signUp}/>
                </View>
                <View style={styles.bottomContainer}>
                    <View>
                        <Text style={styles.welcomeBackText}>{STRINGS.welcomeBack}</Text>
                    </View>
                    <View>
                        <Formik initialValues={initialValues} validationSchema={validationSchema}
                                onSubmit={handleSubmit}>
                            {({handleChange, handleBlur, handleSubmit, values, errors, isValid, touched}) => (
                                <View>
                                    <View>
                                        <FormFields
                                            handleChange={handleChange}
                                            handleBlur={handleBlur}
                                            values={values}
                                            errors={errors}
                                            touched={touched}
                                            fields={fields}
                                        />
                                    </View>

                                    <FormSubmitButton
                                        buttonText={'Sign Up'}
                                        isValid={isValid}
                                        handleSubmit={handleSubmit}
                                        isSubmitting={isSubmitting}
                                        isLoading={isLoading}
                                    />
                                </View>
                            )}
                        </Formik>
                    </View>
                    <View>
                        <Text style={styles.dontHaveAccountText}>{STRINGS.or}</Text>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPressIn={handlePressIn}
                            onPressOut={handlePressOut}
                            onPress={() => navigation.navigate('Login')}
                            activeOpacity={0.7}
                        >
                            <Text style={[styles.dontHaveAccountText, isPressed && styles.underline]}>
                                {STRINGS.alreadyHaveAccount}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#7E1F24',
    },
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    headerImage: {
        flex: 1,
        marginTop: 15,
        width: '70%',
    },
    bottomContainer: {
        flex: 2,
        paddingHorizontal: 30,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: '#fff',
    },
    welcomeBackText: {
        color: '#7E1F24',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: '10%',
    },
    dontHaveAccountText: {
        color: '#630A10',
        textAlign: 'center',
        paddingHorizontal: 10,
        paddingBottom: 0,
        paddingVertical: 15,
        marginBottom: 5,
        fontSize: 12,
    },
    underline: {
        textDecorationLine: 'underline',
    },
});
