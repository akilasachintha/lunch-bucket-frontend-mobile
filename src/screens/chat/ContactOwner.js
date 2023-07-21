import TopHeader from "../../components/topHeader/TopHeader";
import {SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {Formik} from 'formik';
import * as Yup from 'yup';
import React, {useRef, useState} from 'react';
import StaticTopBar from "../../components/topBar/StaticTopBar";

export default function ContactOwner() {
    const [messages, setMessages] = useState([]);
    const scrollViewRef = useRef();
    const sendIcon = <MaterialCommunityIcons name="send" size={40} color="#630A10"/>;

    const validationSchema = Yup.object().shape({
        message: Yup.string().required('Message is required'),
    });

    const initialValues = {message: ''};
    const handleOnSubmit = (values, {resetForm}) => {
        setMessages([...messages, values.message]);
        scrollViewRef.current.scrollToEnd({animated: true});
        console.log(values);
        resetForm();
    };

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <StaticTopBar/>
            <Formik
                style={styles.container}
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleOnSubmit}
            >
                {(formikProps) => (
                    <View style={styles.container}>
                        <TopHeader headerText="Chat with Owner" backButtonPath="Chat"/>
                        <View style={styles.bodyContainer}>
                            <ScrollView style={styles.scrollViewContainer}
                                        ref={scrollViewRef}
                                        onContentSizeChange={() => scrollViewRef.current.scrollToEnd()}
                            >
                                {
                                    messages.map((message, index) => (
                                        <View key={index} style={styles.messageContainer}>
                                            <Text style={styles.messageContainerText}>{message}</Text>
                                        </View>
                                    ))
                                }
                            </ScrollView>
                        </View>
                        <View style={styles.chatBox}>
                            <TextInput
                                editable
                                multiline
                                numberOfLines={4}
                                placeholder={'Type your message here'}
                                style={styles.chatBoxTextInput}
                                onChangeText={formikProps.handleChange('message')}
                                onBlur={formikProps.handleBlur('message')}
                                value={formikProps.values.message}
                            />
                            <TouchableOpacity
                                style={styles.sendIcon}
                                onPress={formikProps.handleSubmit}
                            >
                                {sendIcon}
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Formik>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 10,
    },
    bodyContainer: {
        flex: 10,
        justifyContent: 'flex-end',
    },
    scrollViewContainer: {},
    borderButtonContainer: {
        flexDirection: "row",
        paddingVertical: 10,
        marginVertical: 10,
        marginHorizontal: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#630A10',
        borderWidth: 2,
        borderRadius: 40,
    },
    borderButtonContainerText: {
        fontSize: 18,
        marginLeft: 10,
        color: '#630A10',
    },
    chatBox: {
        marginVertical: 10,
        marginLeft: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    chatBoxTextInput: {
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#a1a1a1',
        paddingLeft: 20,
        fontSize: 14,
        flex: 5,
    },
    sendIcon: {
        justifyContent: 'center',
        flex: 1,
        marginHorizontal: 10,
    },
    messageContainer: {
        backgroundColor: '#FCF0C8',
        marginVertical: 5,
        marginHorizontal: 20,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        borderTopRightRadius: 30,
        alignSelf: 'flex-end',
        maxWidth: '90%',
    },
    messageContainerText: {
        fontSize: 18,
        flexWrap: 'wrap',
        color: 'rgba(94, 94, 94, 1)',

    },
});