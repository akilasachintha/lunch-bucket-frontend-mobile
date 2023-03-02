import {SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import TopBar from "../../components/topBar/TopBar";
import TopHeader from "../../components/topHeader/TopHeader";
import React from "react";
import BorderButton from "../../components/borderButton/BorderButton";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";
import {SelectedTab} from "../../common/enums/enums";

export default function ChatScreen() {
    const navigation = useNavigation();
    const sendIcon = <MaterialCommunityIcons name="send" size={40} color='#630A10'/>

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <TopBar selectedTab={SelectedTab.CHAT}/>
            <View style={styles.container}>
                <TopHeader headerText="Chat" backButtonPath="Chat"/>
                <View style={styles.bodyContainer}>
                    <BorderButton text="Leave a Suggestion" onPress={() => navigation.navigate('LeaveSuggestion')}/>
                    <BorderButton text="Chat with the Owner" onPress={() => navigation.navigate('ContactOwner')}/>
                </View>
                <View style={styles.chatBox}>
                    <TextInput
                        editable
                        multiline
                        numberOfLines={4}
                        placeholder={"Type your message here"}
                        style={styles.chatBoxTextInput}
                    />
                    <TouchableOpacity style={styles.sendIcon}>
                        {sendIcon}
                    </TouchableOpacity>
                </View>
            </View>
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
        paddingTop: 20,
        flex: 9,
        justifyContent: 'center',
    },
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
        flex: 1,
        marginVertical: 20,
        marginLeft: 20,
        flexDirection: 'row',
    },
    chatBoxTextInput: {
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#a1a1a1',
        padding: 10,
        paddingLeft: 20,
        fontSize: 14,
        flex: 6,
    },
    sendIcon: {
        justifyContent: 'center',
        flex: 1,
        marginHorizontal: 10,
    },
});