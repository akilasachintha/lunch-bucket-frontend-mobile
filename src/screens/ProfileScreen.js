import TopHeader from "../components/topHeader/TopHeader";
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {Formik} from 'formik';
import * as Yup from 'yup';
import TextInputField from "../components/inputField/TextInputField";
import StaticTopBar from "../components/topBar/StaticTopBar";
import BottomButton from "../components/buttons/BottomButton";

const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    contact: Yup.string()
        .matches(/^[0-9]{10}$/, 'Invalid contact number')
        .required('Contact is required'),
    number: Yup.string().required('Number is required'),
    street: Yup.string().required('Street is required'),
    city: Yup.string().required('City is required'),
});

const fields = [
    {name: 'username', label: 'Username', placeholder: 'user123',},
    {name: 'email', label: 'Email', placeholder: 'example@example.com',},
    {name: 'password', label: 'Password', placeholder: '********',},
    {name: 'contact', label: 'Contact', placeholder: '1234567890',},
];

const addressFields = [
    {name: 'number', label: 'Number', placeholder: '1/2',},
    {name: 'street', label: 'Street', placeholder: 'Flower Road',},
    {name: 'city', label: 'City', placeholder: 'Colombo 7',},
];

export default function ProfileScreen() {
    const navigation = useNavigation();

    const initialValues = {
        username: '',
        email: '',
        password: '',
        contact: '',
        number: '',
        street: '',
        city: '',
    };

    const handleSubmit = async (values, actions, {resetForm}) => {
        navigation.navigate('Checkout');
        resetForm();
    };

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
                                {fields.map((field) => (
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
                                <View style={styles.fieldHeaderContainer}>
                                    <Text style={styles.fieldHeaderContainerText}>Delivery Address</Text>
                                </View>
                                {addressFields.map((field) => (
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
                            <BottomButton onPress={handleSubmit} buttonText="Done"/>
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