import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import STRINGS from '../../helpers/strings/strings';
import PATHS from "../../helpers/paths/paths";
import React, {useState} from "react";
import {Formik} from "formik";
import * as Yup from "yup";
import FormSubmitButton from "../../components/form/FormSubmitButton";
import FormFields from "../../components/form/FormFields";
import LinkButton from "../../components/linkButton/LinkButton";
import {loginService} from "../../services/authService";
import {useToast} from "../../helpers/toast/Toast";
import {log} from "../../helpers/logs/log";
import PushNotificationDeviceChangeModal from "../../components/modals/PushNotificationDeviceChangeModal";
import {ERROR_STATUS} from "../../errorLogs/errorStatus";

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
});

const fields = [
    {placeholder: STRINGS.email, name: 'email', required: true},
    {placeholder: STRINGS.password, name: 'password', required: true, secureTextEntry: true, isEyeEnabled: true},
];

export default function Login({navigation}) {
    const [deviceToken, setDeviceToken] = useState(false);
    const [isDeviceTokenChanged, setIsDeviceTokenChanged] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const initialValues = {email: '', password: ''};
    const {showToast} = useToast();

    const handleSubmit = async (values, actions) => {
        setIsSubmitting(true);
        setIsLoading(true);

        try {
            const result = await loginService(values.email, values.password);

            if (!result.device_token && result.state) {
                setDeviceToken(true);
            }

            if (result.device_token && result.state) {
                navigation.navigate('Menu');
                showToast('success', 'Login Success');
            }

            if (result === ERROR_STATUS.LOGIN_API_ERROR || result === ERROR_STATUS.LOGIN_NOT_REGISTERED) {
                showToast('error', 'Email or Password is incorrect');
                log("error", "Login", "handleSubmit", "Email or Password is incorrect", "Login.js");
            }

            if (result === ERROR_STATUS.LOGIN_EMAIL_CONFIRMATION_PENDING) {
                showToast('error', 'Please check your emails and verify your email to Continue.');
                log("error", "Login", "handleSubmit", "Email confirmation pending", "Login.js");
            }

        } catch (error) {
            log("error", "Login", "handleSubmit", error.message, "Login.js");
            showToast('error', error.message);
        } finally {
            actions.setSubmitting(false);
            setIsSubmitting(false);
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mainContainer}>
                {
                    deviceToken && (
                        <PushNotificationDeviceChangeModal deviceToken={deviceToken}
                                                           setDeviceToken={setDeviceToken}
                                                           isDeviceTokenChanged={isDeviceTokenChanged}
                                                           setIsDeviceTokenChanged={setIsDeviceTokenChanged}/>
                    )
                }
                <View style={styles.headerContainer}>
                    <Image
                        style={styles.headerImage}
                        source={PATHS.signIn}
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
                                        isLoading={isLoading}
                                        buttonText={"Sign In"}
                                        isValid={isValid}
                                        handleSubmit={handleSubmit}
                                        isSubmitting={isSubmitting}/>
                                </View>
                            )}
                        </Formik>
                    </View>
                    <View>
                        <LinkButton
                            text={STRINGS.forgotPassword}
                            style={styles.linkButton}
                            onPress={() => navigation.navigate('ForgetPassword')}
                        />
                        <Text style={styles.linkButton}>{STRINGS.or}</Text>
                    </View>
                    <View>
                        <LinkButton
                            text={STRINGS.dontHaveAccountText}
                            style={styles.linkButton}
                            onPress={() => navigation.navigate('SignUp')}
                        />
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
        backgroundColor: '#FCF0C8',
    },
    headerContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fcf0c8',
    },
    headerImage: {
        flex: 1,
        marginTop: '5%',
        width: '100%',
    },
    bottomContainer: {
        flex: 1.5,
        paddingHorizontal: '8%',
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
    linkButton: {
        color: '#630A10',
        textAlign: 'center',
        paddingHorizontal: '5%',
        paddingBottom: 0,
        paddingVertical: '7%',
        fontSize: 12,
    },
    underline: {
        textDecorationLine: 'underline',
    },
});
