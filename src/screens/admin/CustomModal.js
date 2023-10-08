import React from "react";
import {Button, Modal, Text, View} from "react-native";

const CustomModal = ({isVisible, onClose, responseData}) => {
    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="slide"
        >
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <View style={{backgroundColor: "white", padding: 20, borderRadius: 10}}>
                    <Text style={{fontSize: 20}}>Response Data</Text>
                    <Text>{JSON.stringify(responseData)}</Text>
                    <Button title="Close" onPress={onClose}/>
                </View>
            </View>
        </Modal>
    );
};

export default CustomModal;
