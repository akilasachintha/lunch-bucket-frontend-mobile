import TopHeader from "../../components/topHeader/TopHeader";
import {SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {Formik} from 'formik';
import * as Yup from 'yup';
import React, {useEffect, useRef, useState} from 'react';
import StaticTopBar from "../../components/topBar/StaticTopBar";
import {
    createNewConversationService,
    getChatsService,
    sendMessageToConversationService
} from "../../services/chatService";
import {log} from "../../helpers/logs/log";

export default function ContactOwner() {
    const [chatList, setChatList] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const scrollViewRef = useRef();
    const sendIcon = <MaterialCommunityIcons name="send" size={40} color="#630A10"/>;

    const validationSchema = Yup.object().shape({
        message: Yup.string().required('Message is required'),
    });

    const initialValues = {message: ''};

    // Function to fetch the latest chat data
    const fetchLatestChatData = async () => {
        try {
            const updatedChatData = await getChatsService();
            const formattedChatList = updatedChatData.map((chat) => ({
                id: chat.id,
                view_admin_state: chat.view_admin_state,
                expanded: false,
                messages: chat.messages,
            }));
            setChatList(formattedChatList);
            log("success", "screen", "ContactOwner | fetchLatestChatData", updatedChatData, "ContactOwner.js");
        } catch (error) {
            log("error", "screen", "ContactOwner | fetchLatestChatData", error.message, "ContactOwner.js");
        }
    };

    useEffect(() => {
        // Fetch the initial chat data when the component mounts
        fetchLatestChatData().catch(
            (error) => log("error", "screen", "ContactOwner | useEffect", error.message, "ContactOwner.js"),
        );
    }, []);

    const handleOnSubmit = async (values, {resetForm}) => {
        if (isSubmitting) return;

        setIsSubmitting(true);
        const newMessage = {message: values.message, sender: "user"};
        const chatIndex = chatList.findIndex((chat) => chat.expanded === true);

        if (chatIndex !== -1) {
            const expandedChat = chatList[chatIndex];
            const updatedMessages = [...expandedChat.messages, newMessage];
            const updatedChatList = [...chatList];
            updatedChatList[chatIndex] = {...expandedChat, messages: updatedMessages};
            setChatList(updatedChatList);

            const {id} = expandedChat;
            await sendMessageToConversationService(id, values.message);
        } else {
            await createNewConversationService(values.message);
            fetchLatestChatData().catch(
                (error) => log("error", "screen", "ContactOwner | handleOnSubmit", error.message, "ContactOwner.js"),
            );
        }

        scrollViewRef.current.scrollToEnd({animated: true});
        resetForm();
        setIsSubmitting(false);
    };

    const handleToggleExpand = (chatIndex) => {
        setChatList((prevChatList) => {
            const updatedChatList = [...prevChatList];
            updatedChatList[chatIndex].expanded = !updatedChatList[chatIndex].expanded;
            return updatedChatList;
        });
    };

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <StaticTopBar/>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleOnSubmit}
            >
                {(formikProps) => (
                    <View style={styles.container}>
                        <TopHeader headerText="Chat with Owner" backButtonPath="Chat"/>
                        <View style={styles.bodyContainer}>
                            <ScrollView
                                style={styles.scrollViewContainer}
                                ref={scrollViewRef}
                                onContentSizeChange={() => scrollViewRef.current.scrollToEnd()}
                            >
                                {chatList && chatList.map((chat, index) => (
                                    <View key={index} style={styles.messageContainer}>
                                        <TouchableOpacity onPress={() => handleToggleExpand(index)}>
                                            <View style={styles.conversationTitleContainer}>
                                                <Text
                                                    style={styles.messageContainerHeaderText}>Conversation {index + 1}</Text>
                                                {chat && chat.view_admin_state && (
                                                    <View style={styles.roundedIcon}></View>
                                                )}
                                            </View>
                                            {!chat.expanded && (
                                                <Text
                                                    style={styles.messageContainerBottomText}>{chat.messages[0].message}</Text>
                                            )}
                                        </TouchableOpacity>
                                        {chat.expanded && (
                                            <View style={styles.conversationContainer}>
                                                {chat && chat.messages && chat.messages.length > 0 && chat.messages.map((msg, msgIndex) => (
                                                    <View key={msgIndex} style={styles.conversationContainerMessage}>
                                                        <Text style={[
                                                            styles.messageContainerText,
                                                            msg.sender === "user" ? styles.userMessageSender : styles.adminMessageSender,
                                                        ]}>{msg.sender}</Text>
                                                        <Text style={[
                                                            styles.messageContainerText,
                                                            msg.sender === "user" ? styles.userMessage : styles.adminMessage,
                                                        ]}>
                                                            {msg.message}
                                                        </Text>
                                                    </View>
                                                ))}
                                            </View>
                                        )}
                                    </View>
                                ))}
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
                                onPress={!isSubmitting ? formikProps.handleSubmit : null}
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
        flex: 1,
        justifyContent: 'flex-end',
    },
    scrollViewContainer: {},
    conversationTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    chatBox: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    chatBoxTextInput: {
        flex: 1,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#a1a1a1',
        paddingLeft: 20,
        fontSize: 14,
    },
    sendIcon: {
        justifyContent: 'center',
        marginLeft: 10,
    },
    messageContainer: {
        backgroundColor: '#f5efde',
        marginVertical: 6,
        marginHorizontal: 20,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    messageContainerHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#630A10',
    },
    messageContainerBottomText: {
        fontSize: 14,
        color: '#630A10',
    },
    messageContainerText: {
        fontSize: 16,
        color: 'rgba(94, 94, 94, 1)',
    },
    conversationContainerMessage: {
        //  marginVertical: 5,
        // backgroundColor: '#fff',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
    },
    userMessage: {
        paddingVertical: 6,
        alignSelf: 'flex-end',
        backgroundColor: '#630A10',
        color: '#fff',
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    userMessageSender: {
        alignSelf: 'flex-end',
        fontSize: 12,
        color: '#630A10',
        marginBottom: 5,
    },
    adminMessage: {
        alignSelf: 'flex-start',
        paddingVertical: 6,
        backgroundColor: '#e0e0e0',
        color: '#000',
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    adminMessageSender: {
        alignSelf: 'flex-start',
        fontSize: 12,
        color: '#000',
        marginBottom: 5,
    },
    refreshButton: {
        alignSelf: 'center',
        paddingVertical: 8,
        paddingHorizontal: 20,
        backgroundColor: '#630A10',
        borderRadius: 10,
        marginTop: 10,
    },
    refreshButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    roundedIcon: {
        width: 10,
        height: 10,
        borderRadius: 15,
        backgroundColor: '#419d02',
    }
});
