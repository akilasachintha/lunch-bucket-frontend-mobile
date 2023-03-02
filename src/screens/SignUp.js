import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import STRINGS from '../common/strings/strings';
import PATHS from "../common/paths/paths";
import {useState} from "react";
import {Formik} from "formik";
import * as Yup from "yup";
import FormSubmitButton from "../components/form/FormSubmitButton";
import FormFields from "../components/form/FormFields";
import OtherSignInUpButton from "../components/otherSignInUpButton/OtherSIgnInUpButton";

const validationSchema = Yup.object().shape({
    username: Yup.string()
        .required('Username is required'),
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
    {placeholder: STRINGS.username, name: 'username', required: true},
    {placeholder: STRINGS.email, name: 'email', required: true},
    {placeholder: STRINGS.password, name: 'password', required: true, secureTextEntry: true, isEyeEnabled: true},
    {placeholder: STRINGS.confirmPassword, name: 'confirmPassword', required: true, secureTextEntry: true},
];

export default function SignUp({navigation}) {
    const [isPressed, setIsPressed] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const initialValues = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const handleSubmit = async (values, actions) => {
        setIsSubmitting(true);
        console.log(values);

        try {
            navigation.navigate('Welcome');
            console.log('Try');
        } catch (error) {
            console.log(error);
        } finally {
            console.log('Finally');
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
                            onPress={() => navigation.navigate('Menu')}
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
        marginTop: 40,
    },
    dontHaveAccountText: {
        color: '#630A10',
        textAlign: 'center',
        paddingHorizontal: 10,
        paddingBottom: 0,
        paddingVertical: 25,
        marginBottom: 5,
        fontSize: 13
    },
    underline: {
        textDecorationLine: 'underline',
    },
});
