import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import STRINGS from '../../helpers/strings/strings';
import PATHS from "../../helpers/paths/paths";
import {useState} from "react";
import {Formik} from "formik";
import * as Yup from "yup";
import FormSubmitButton from "../../components/form/FormSubmitButton";
import FormFields from "../../components/form/FormFields";
import OtherSignInUpButton from "../../components/otherSignInUpButton/OtherSIgnInUpButton";
import {registerService} from "../../services/authService";
import {useToast} from "../../helpers/toast/Toast";
import {log} from "../../helpers/logs/log";
import {StatusBar} from "expo-status-bar";

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
});

const fields = [
    {placeholder: STRINGS.email, name: 'email', required: true},
    {placeholder: STRINGS.password, name: 'password', required: true, secureTextEntry: true, isEyeEnabled: true},
    {placeholder: STRINGS.confirmPassword, name: 'confirmPassword', required: true, secureTextEntry: true},
];

export default function SignUp({navigation}) {
    const [isPressed, setIsPressed] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const initialValues = {
        email: '',
        password: '',
        confirmPassword: '',
    };
    const [toastMessage, setToastMessage] = useState(null);
    const {showToast} = useToast();

    const handleSubmit = async (values, actions) => {
        setIsSubmitting(true);
        console.log(values);

        try {
            const result = await registerService(values.email, values.password);
            console.log(result);
            if (result === "success") {
                showToast('success', 'Successfully Registered');
                navigation.navigate('Login');
            } else {
                showToast('error', 'Register Failed');
                log("error", "Login", "handleSubmit", "Register Failed", "SignUp.js");
            }
        } catch (error) {
            setToastMessage("Login Failed");
            log("error", "Login", "handleSubmit", error.message, "SignUp.js");
        } finally {
            actions.setSubmitting(false);
            setIsSubmitting(false);
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
            <StatusBar style="light"/>
            <View style={styles.mainContainer}>
                <View style={styles.headerContainer}>
                    <Image
                        style={styles.headerImage}
                        source={PATHS.signUp}
                    />
                </View>
                <View style={styles.bottomContainer}>
                    <View>
                        <Text style={styles.welcomeBackText}>{STRINGS.welcomeBack}</Text>
                    </View>
                    <View>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
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
                                        buttonText={"Sign Up"}
                                        isValid={isValid}
                                        handleSubmit={handleSubmit}
                                        isSubmitting={isSubmitting}/>
                                </View>
                            )}
                        </Formik>
                    </View>
                    <View>
                        <Text style={styles.dontHaveAccountText}>{STRINGS.or}</Text>
                    </View>
                    <View>
                        <OtherSignInUpButton iconName="google" signInText="Sign In with Google"/>
                        <OtherSignInUpButton iconName="facebook" signInText="Sign In with Facebook"/>
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
        width: 250,
    },
    bottomContainer: {
        flex: 3.4,
        paddingHorizontal: 30,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        backgroundColor: '#fff',
    },
    welcomeBackText: {
        color: '#7E1F24',
        fontSize: 34,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 25,
        marginTop: 20,
    },
    dontHaveAccountText: {
        color: '#630A10',
        textAlign: 'center',
        paddingHorizontal: 10,
        paddingBottom: 0,
        paddingVertical: 15,
        marginBottom: 5,
        fontSize: 13
    },
    underline: {
        textDecorationLine: 'underline',
    },
});
