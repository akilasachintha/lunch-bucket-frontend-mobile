import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {fetchRemainingTimes} from '../../services/timeService';
import {log} from '../../helpers/logs/log';

export default function Timer({ title, disableTime }) {
    const [remainingTimeLunchColor, setRemainingTimeLunchColor] = useState('');
    const [remainingTimeLunch, setRemainingTimeLunch] = useState('00:00:00');
    const [remainingTimeDinnerColor, setRemainingTimeDinnerColor] = useState('');
    const [remainingTimeDinner, setRemainingTimeDinner] = useState('00:00:00');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchRemainingTimes(
            setRemainingTimeLunch,
            setRemainingTimeDinner,
            setRemainingTimeLunchColor,
            setRemainingTimeDinnerColor
        )
            .then(() => {
                setIsLoading(false);
            })
            .catch((error) =>
                log('error', 'Timer.jsx', 'useEffect', error.message, 'Timer.jsx')
            );
    }, []);

    const timerContainerStyle = [
        styles.timerContainer,
        { backgroundColor: title === 'Lunch' ? remainingTimeLunchColor : remainingTimeDinnerColor },
    ];

    const renderTimerText = () => {
        const time = title === 'Lunch' ? (disableTime ? '4 PM' : '10 AM') : disableTime ? '10 AM' : '4 PM';
        return (
            <Text style={styles.timerLeftText}>
                You can{disableTime ? ' not' : ''} place {title} orders until {time}
            </Text>
        );
    };

    if (isLoading) {
        return (
            <View style={timerContainerStyle}>
                <View style={styles.timerBarLeftContainer}>{renderTimerText()}</View>
                <View style={styles.timerBarRightContainer}>
                    <ActivityIndicator size="small" color="#0000ff"/>
                </View>
            </View>
        );
    }

    return (
        <View style={timerContainerStyle}>
            <View style={styles.timerBarLeftContainer}>{renderTimerText()}</View>
            <View style={styles.timerBarRightContainer}>
                <Text style={styles.timerRightText}>
                    Time Remaining - {title === 'Lunch' ? remainingTimeLunch : remainingTimeDinner}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    timerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },
    timerBarLeftContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    timerBarRightContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    timerLeftText: {
        fontSize: 12,
        paddingRight: '10%',
    },
    timerRightText: {
        fontSize: 12,
    },
    loadingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },
});
