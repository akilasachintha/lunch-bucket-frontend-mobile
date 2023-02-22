import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const FormSubmitButton = ({handleSubmit, isSubmitting, buttonText, isValid, error, onBlur}) => {
    const inputStyles = [
        styles.signInText,
        !isValid ? styles.signInTextError : null,
    ];

    return (
        <View style={styles.signInButtonContainer}>
            <TouchableOpacity onPress={handleSubmit} disabled={!isValid} >
                <Text style={inputStyles}>
                    {buttonText}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default FormSubmitButton;

const styles = StyleSheet.create({
    signInButtonContainer: {
        paddingTop: 2
    },
    signInText: {
        textAlign: 'center',
        paddingHorizontal: 120,
        paddingVertical: 12,
        fontWeight: 'bold',
        fontSize: 18,
        backgroundColor: '#FFE662',
        borderRadius: 30,
        color: '#630A10',
    },
    signInTextError: {
        paddingHorizontal: 120,
        paddingVertical: 12,
        fontWeight: 'bold',
        fontSize: 18,
        backgroundColor: '#fae579',
        borderRadius: 30,
        color: '#623539',
    },
});
