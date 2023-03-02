import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import STRINGS from '../common/strings/strings';
import PATHS from "../common/paths/paths";
import {useState} from "react";
import {Formik} from "formik";
import * as Yup from "yup";
import FormSubmitButton from "../components/form/FormSubmitButton";
import FormFields from "../components/form/FormFields";
import OtherSignInUpButton from "../components/otherSignInUpButton/OtherSIgnInUpButton";
import LinkButton from "../components/linkButton/LinkButton";

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const initialValues = {email: '', password: ''};

    const handleSubmit = async (values, actions) => {
        setIsSubmitting(true);
        console.log(values);

        try {
            navigation.navigate('Basket');
            console.log('Try');
        } catch (error) {
            console.log(error);
        } finally {
            console.log('Finally');
            actions.setSubmitting(false);
            setIsSubmitting(false);
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mainContainer}>
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
                            onPress={() => navigation.navigate('SignUp')}
                        />
                        <Text style={styles.linkButton}>{STRINGS.or}</Text>
                    </View>
                    <View>
                        <OtherSignInUpButton iconName="google" signInText="Sign In with Google"/>
                        <OtherSignInUpButton iconName="facebook" signInText="Sign In with Facebook"/>
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
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fcf0c8',
        flex: 1,
    },
    headerImage: {
        flex: 1,
        marginTop: 15,
        width: 450,
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
        fontSize: 34,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 25,
        marginTop: 40,
    },
    linkButton: {
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
