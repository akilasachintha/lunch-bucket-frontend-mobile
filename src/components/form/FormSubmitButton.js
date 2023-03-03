import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {dynamicFont} from "../../common/responsive/fontScale";

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
        paddingTop: '2%',
    },
    signInText: {
        textAlign: 'center',
        paddingVertical: '3%',
        fontWeight: 'bold',
        fontSize: dynamicFont(12),
        backgroundColor: '#FFE662',
        borderRadius: 30,
        color: '#630A10',
    },
    signInTextError: {
        paddingVertical: '3%',
        fontWeight: 'bold',
        fontSize: dynamicFont(12),
        backgroundColor: '#fae579',
        borderRadius: 30,
        color: '#623539',
    },
});
