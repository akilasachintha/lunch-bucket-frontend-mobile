import {Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import React from 'react';
import {Formik} from "formik";
import * as Yup from 'yup';

const Star = ({filled, onPress, errors}) => (
    <TouchableOpacity onPress={onPress} style={styles.star}>
        <FontAwesome
            name={filled ? 'star' : 'star-o'}
            size={38}
            color={filled ? 'gold' : (errors && 'red') || 'rgba(99, 10, 16, 0.8)'}
        />
    </TouchableOpacity>
);

const OrderRatingModal = ({isVisible, setIsVisible}) => {
    const validationSchema = Yup.object().shape({
        rating: Yup.number().required().min(1, 'Please select a rating'),
        review: Yup.string().required().min(1, 'Please enter a review'),
    });

    const initialValues = {rating: 0, review: ''};
    const handleDonePress = (values, {resetForm}) => {
        console.log(values);
        resetForm();
        setIsVisible(false);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleDonePress}
        >
            {({values, handleChange, handleBlur, handleSubmit, errors, touched, setFieldValue,}) => (
                <View style={styles.container}>
                    <Modal visible={isVisible} transparent>
                        <TouchableOpacity
                            style={styles.background}
                            onPress={() => setIsVisible(false)}
                        >
                            <View style={styles.modal}>
                                <View style={styles.modalTopTextContainer}>
                                    <Text style={styles.modalTopText}>How was your order?</Text>
                                </View>
                                <View style={styles.modalIconContainer}>
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <Star
                                            key={i}
                                            filled={i <= values.rating}
                                            errors={touched.rating && errors.rating}
                                            onPress={() => setFieldValue('rating', i)}
                                        />
                                    ))}
                                </View>
                                <View
                                    style={[styles.modalBottomTextContainer, touched.review && errors.review && styles.modalBottomTextRequiredContainer]}>
                                    <TextInput
                                        editable
                                        multiline
                                        numberOfLines={4}
                                        placeholder={'Type your message here'}
                                        style={styles.reviewTextInput}
                                        onChangeText={handleChange('review')}
                                        onBlur={handleBlur('review')}
                                        value={values.review}
                                    />
                                </View>
                                <TouchableOpacity
                                    style={styles.doneButtonContainer}
                                    onPress={handleSubmit}
                                >
                                    <Text style={styles.doneButtonContainerText}>Done</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.noThanksContainer}
                                    onPress={() => setIsVisible(false)}
                                >
                                    <Text style={styles.noThanksContainerText}>No Thanks.</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </Modal>
                </View>
            )}
        </Formik>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        paddingVertical: 20,
        alignItems: 'center',
    },
    modalTopTextContainer: {
        marginTop: 10,
        marginBottom: 20,
    },
    modalTopText: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#630A10',
    },
    modalIconContainer: {
        marginVertical: 20,
        flexDirection: 'row',
    },
    modalBottomTextContainer: {
        marginTop: 10,
        width: '90%',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'rgba(99, 10, 16, 0.27)',
        padding: 10,
        paddingLeft: 20,
        fontSize: 14,
    },
    modalBottomTextRequiredContainer: {
        marginTop: 10,
        width: '90%',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'red',
        padding: 10,
        paddingLeft: 20,
        fontSize: 14,
    },
    reviewTextInput: {
        placeholderTextColor: 'rgba(99, 10, 16, 0.27)',
    },
    star: {
        marginHorizontal: 5,
    },
    doneButtonContainer: {
        marginTop: 30,
        paddingVertical: 10,
        paddingHorizontal: 60,
        backgroundColor: '#FFE662',
        borderRadius: 20,
    },
    doneButtonContainerText: {
        fontSize: 18,
        color: '#630A10',
    },
    noThanksContainer: {
        marginTop: 20,
    },
    noThanksContainerText: {
        fontSize: 16,
        color: 'rgba(99, 10, 16, 0.8)',
    },
});

export default OrderRatingModal;
