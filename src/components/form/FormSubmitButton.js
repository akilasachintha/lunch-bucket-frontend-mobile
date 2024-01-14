import React from 'react';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const FormSubmitButton = ({handleSubmit, buttonText, isValid, isLoading}) => {
    const inputStyles = [
        styles.signInText,
        !isValid ? styles.signInTextError : null,
    ];

    return (
        <View style={styles.signInButtonContainer}>
            <TouchableOpacity onPress={handleSubmit} disabled={!isValid}>
                {
                    !isLoading && (
                        <Text style={inputStyles}>
                            {buttonText}
                        </Text>
                    )
                }
                {
                    isLoading && (
                        <Text style={inputStyles}>
                            <ActivityIndicator size={25} color="#630A10"/>
                        </Text>
                    )
                }
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
        flexDirection: 'row',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: '3%',
        fontWeight: 'bold',
        fontSize: 14,
        backgroundColor: '#FFE662',
        borderRadius: 30,
        color: '#630A10',
    },
    signInTextError: {
        textAlign: 'center',
        paddingVertical: '3%',
        fontWeight: 'bold',
        fontSize: 14,
        backgroundColor: '#fae579',
        borderRadius: 30,
        color: '#623539',
    },
});
