import React, {useState} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const LinkButton = ({text, onPress, style}) => {
    const [isPressed, setIsPressed] = useState(false);
    const handlePressIn = () => {
        setIsPressed(true);
    };

    const handlePressOut = () => {
        setIsPressed(false);
    };

    return (
        <TouchableOpacity
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Text style={[style, isPressed && styles.underline]}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    underline: {
        textDecorationLine: 'underline',
    },
});

export default LinkButton;
